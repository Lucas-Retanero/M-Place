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

import br.edu.fatecitaquera.mplayce.model.Brinquedo;
import br.edu.fatecitaquera.mplayce.repository.BrinquedoRepository;

@RestController
public class BrinquedoController {

    @Autowired
    private BrinquedoRepository repository;

    @Autowired
    private BrinquedoSseController sseController;

    @PostMapping("/brinquedo")
    public ResponseEntity<String> criar(@RequestBody Brinquedo brinquedo) {
        repository.save(brinquedo);
        sseController.notificarClientes(brinquedo);
        return ResponseEntity.status(HttpStatus.CREATED).body("✅ Brinquedo criado com sucesso!");
    }

    @GetMapping("/brinquedo")
    public ResponseEntity<?> listarTodos() {
        List<Brinquedo> brinquedos = repository.findAll();
        if (brinquedos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Nenhum brinquedo encontrado.");
        }
        return ResponseEntity.ok(brinquedos);
    }

    @GetMapping("/brinquedo/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        Optional<Brinquedo> brinquedo = repository.findById(id);
        if (brinquedo.isPresent()) {
            return ResponseEntity.ok(brinquedo.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Brinquedo com ID " + id + " não encontrado.");
        }
    }

    @GetMapping("/brinquedo/categoria/{categoria}")
    public ResponseEntity<?> buscarPorCategoria(@PathVariable String categoria) {
        List<Brinquedo> lista = repository.findByCategoria(categoria);
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Nenhum brinquedo encontrado na categoria '" + categoria + "'.");
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/brinquedo/pesquisa/{nome}")
    public ResponseEntity<?> buscarPorNome(@PathVariable String nome) {
        List<Brinquedo> lista = repository.findByNomeContainingIgnoreCase(nome);
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Nenhum brinquedo encontrado com o nome '" + nome + "'.");
        }
        return ResponseEntity.ok(lista);
    }

    @PutMapping("/brinquedo/{id}")
    public ResponseEntity<String> atualizar(@PathVariable int id, @RequestBody Brinquedo brinquedo) {
        if (!repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Brinquedo com ID " + id + " não encontrado.");
        }
        brinquedo.setId(id);
        repository.save(brinquedo);
        sseController.notificarClientes(brinquedo);
        return ResponseEntity.ok("✅ Brinquedo atualizado com sucesso!");
    }

    @DeleteMapping("/brinquedo/{id}")
    public ResponseEntity<String> deletar(@PathVariable int id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Brinquedo com ID " + id + " não encontrado.");
        }
        repository.deleteById(id);
        sseController.notificarClientes("deletado");
        return ResponseEntity.ok("✅ Brinquedo deletado com sucesso!");
    }
}
