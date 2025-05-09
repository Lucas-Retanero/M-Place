package br.edu.fatecitaquera.mplayce.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Categoria {
	// Atributos;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private String urlimagem;
    
    // Construtores;
    public Categoria() {
        // TODO Auto-generated constructor stub
    }
    
    public Categoria(int id, String nome, String urlimagem) {
        super();
        this.id = id;
        this.nome = nome;
        this.urlimagem = urlimagem;
    }
    
    // Getters e setters;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
    
    
    public String getUrlimagem() {
        return urlimagem;
    }
    
    public void setUrlimagem(String urlimagem) {
        this.urlimagem = urlimagem;
    }
}
