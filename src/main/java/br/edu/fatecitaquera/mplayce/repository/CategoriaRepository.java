package br.edu.fatecitaquera.mplayce.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.fatecitaquera.mplayce.model.Categoria;
import java.util.List;
import java.util.List;
import java.util.List;


public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
    List<Categoria> findByNomeContainingIgnoreCase(String nome);
}
