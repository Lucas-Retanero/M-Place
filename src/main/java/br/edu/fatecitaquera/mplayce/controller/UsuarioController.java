package br.edu.fatecitaquera.mplayce.controller;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.edu.fatecitaquera.mplayce.model.Usuário;
import br.edu.fatecitaquera.mplayce.repository.UsuarioRepository;

@RestController
public class UsuarioController {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
    @Autowired
    private UsuarioRepository repository;

    @PostMapping("/usuario")
    public ResponseEntity<String> criar(@RequestBody Usuário usuario) {
        String senhaCodificada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCodificada);

        repository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("✅ Usuário criado com sucesso!");
    }


    @GetMapping("/usuario")
    public ResponseEntity<?> listarTodos() {
        List<Usuário> lista = repository.findAll();
        if (lista.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Nenhum usuário encontrado.");
        }
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable int id) {
        Optional<Usuário> usuario = repository.findById(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Usuário com ID " + id + " não encontrado.");
        }
    }

    @PutMapping("/usuario/{id}")
    public ResponseEntity<String> atualizar(@PathVariable int id, @RequestBody Usuário usuario) {
        if (!repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Usuário com ID " + id + " não encontrado.");
        }

        usuario.setId(id);
        usuario.setSenha(usuario.getSenha());
        repository.save(usuario);

        return ResponseEntity.ok("✅ Usuário atualizado com sucesso!");
    }

    @DeleteMapping("/usuario/{id}")
    public ResponseEntity<String> deletar(@PathVariable int id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Usuário com ID " + id + " não encontrado.");
        }
        repository.deleteById(id);
        return ResponseEntity.ok("✅ Usuário deletado com sucesso!");
    }

    @PostMapping("/usuario/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String senha = data.get("senha");

        if (email == null || senha == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Email e senha são necessários para o login."));
        }

        Optional<Usuário> optionalUsuario = repository.findByEmail(email);
        if (optionalUsuario.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Email inválido."));
        }

        Usuário usuario = optionalUsuario.get();

        System.out.println("Senha fornecida: " + senha);
        System.out.println("Senha armazenada: " + usuario.getSenha());

        if (!passwordEncoder.matches(senha, usuario.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Senha incorreta."));
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login bem-sucedido.");
        response.put("usuario", Map.of(
                "idUsuario", usuario.getId(),
                "nome", usuario.getNome(),
                "email", usuario.getEmail(),
                "tipo", usuario.getPermissao(),
                "paginas", getPaginasPorTipo(usuario.getPermissao())
        ));

        return ResponseEntity.ok(response);
    }


    private List<String> getPaginasPorTipo(int tipo) {
        return switch (tipo) {
            case 1 -> List.of("admin/home", "admin/config"); //paginas de adm
            case 2 -> List.of("user/home"); //paginas de usuário
            default -> List.of("user/home");  //padrão (qualquer outro numero)
        };
    }
}
