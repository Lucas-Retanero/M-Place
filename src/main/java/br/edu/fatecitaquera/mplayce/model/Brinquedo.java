package br.edu.fatecitaquera.mplayce.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Brinquedo {
	// Atributos;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private float preco;
    private String categoria;
    private String descricao;
    private String detalhes;
    private String marca;
    @Column(length = 10000)
    private String urlimagem;
    
    // Construtores;
    public Brinquedo() {
        // TODO Auto-generated constructor stub
    }
    
    public Brinquedo(int id, String nome, float preco, String categoria, String descricao, String detalhes, String marca, String urlimagem) {
        super();
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.descricao = descricao;
        this.detalhes = detalhes;
        this.marca = marca;
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

    
    public float getPreco() {
        return preco;
    }

    public void setPreco(float preco) {
        this.preco = preco;
    }
    
    
    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    
    
    public String getDescricao() {
        return descricao;
    }
    
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    
    
    public String getDetalhes() {
        return detalhes;
    }
    
    public void setDetalhes(String detalhes) {
        this.detalhes = detalhes;
    }
    
    
    public String getMarca() {
        return marca;
    }
    
    public void setMarca(String marca) {
        this.marca = marca;
    }
    
    
    public String getUrlimagem() {
        return urlimagem;
    }
    
    public void setUrlimagem(String urlimagem) {
        this.urlimagem = urlimagem;
    }
}
