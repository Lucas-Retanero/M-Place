package br.edu.fatecitaquera.mplayce.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.fatecitaquera.mplayce.model.Brinquedo;
import java.util.List;
import java.util.List;
import java.util.List;


public interface BrinquedoRepository extends JpaRepository<Brinquedo, Integer> {
    List<Brinquedo> findByCategoria(String categoria);
    List<Brinquedo> findByNomeContainingIgnoreCase(String nome);
}
