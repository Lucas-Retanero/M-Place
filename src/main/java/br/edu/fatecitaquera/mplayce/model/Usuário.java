package br.edu.fatecitaquera.mplayce.model;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuário {
	// Atributos;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private String email;
    private String senha;
    private static PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private int permissao;
    
    // Construtores;
    public Usuário() {
        // TODO Auto-generated constructor stub
    }
    
    public Usuário(int id, String nome, String email, String senha, int permissao) {
        super();
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.permissao = permissao;
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

    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    
    public String getSenha() {
        return senha;
    }

    public Usuário setSenha(String senha) {
        this.senha = senha;
        return this;
    }
    
    
    public int getPermissao() {
        return permissao;
    }
    
    public void setPermissao(int permissao) {
        this.permissao = permissao;
    }
}
