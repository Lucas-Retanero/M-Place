package br.edu.fatecitaquera.mplayce;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Desabilita a proteção contra CSRF
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()  // Permite o acesso a qualquer requisição sem autenticação
            )
            .formLogin(form -> form.disable())  // Desabilita o login baseado em formulário
            .httpBasic(basic -> basic.disable());  // Desabilita a autenticação HTTP básica

        return http.build();
    }
}
