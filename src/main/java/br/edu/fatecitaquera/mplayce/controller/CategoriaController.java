package br.edu.fatecitaquera.mplayce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.edu.fatecitaquera.mplayce.model.Categoria;
import br.edu.fatecitaquera.mplayce.repository.CategoriaRepository;

@RestController
public class CategoriaController {

    @Autowired
    private CategoriaRepository repository;

    @Autowired
    private CategoriaSseController sseController;

    @PostMapping("/categoria")
    public ResponseEntity<String> criar(@RequestBody Categoria categoria) {
        repository.save(categoria);
        sseController.notificarClientes(categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body("✅ Categoria criada com sucesso!");
    }

    @GetMapping("/categoria")
    public ResponseEntity<?> listarTodos() {
        List<Categoria> categorias = repository.findAll();
        if (categorias.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Nenhuma categoria encontrada.");
        }
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        Optional<Categoria> categoria = repository.findById(id);
        if (categoria.isPresent()) {
            return ResponseEntity.ok(categoria.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Categoria com ID " + id + " não encontrada.");
        }
    }

    @GetMapping("/categoria/pesquisa/{nome}")
    public ResponseEntity<?> buscarPorNome(@PathVariable String nome) {
        List<Categoria> lista = repository.findByNomeContainingIgnoreCase(nome);
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Nenhuma categoria encontrada com o nome '" + nome + "'.");
        }
        return ResponseEntity.ok(lista);
    }

    @PutMapping("/categoria/{id}")
    public ResponseEntity<String> atualizar(@PathVariable int id, @RequestBody Categoria categoria) {
        if (!repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Categoria com ID " + id + " não encontrada.");
        }
        categoria.setId(id);
        repository.save(categoria);
        sseController.notificarClientes(categoria);
        return ResponseEntity.ok("✅ Categoria atualizada com sucesso!");
    }

    @DeleteMapping("/categoria/{id}")
    public ResponseEntity<String> deletar(@PathVariable int id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Categoria com ID " + id + " não encontrada.");
        }
        repository.deleteById(id);
        sseController.notificarClientes("deletado");
        return ResponseEntity.ok("✅ Categoria deletada com sucesso!");
    }
}
