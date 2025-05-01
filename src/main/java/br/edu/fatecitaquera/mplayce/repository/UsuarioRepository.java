package br.edu.fatecitaquera.mplayce.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.fatecitaquera.mplayce.model.Usuário;

public interface UsuarioRepository extends JpaRepository<Usuário, Integer> {
    Optional<Usuário> findByEmail(String email);
}
