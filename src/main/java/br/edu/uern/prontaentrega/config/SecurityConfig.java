
package br.edu.uern.prontaentrega.config;

import java.util.function.Supplier;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;

@Configuration
public class SecurityConfig {

        // Criptografia das senhas
        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        // Cadastro dos usuários
        @Bean
        public UserDetailsService userDetailsService(
                        PasswordEncoder encoder) {

                String senhaAdmin = System.getenv("ADMIN_PASSWORD");
                String senhaFuncionario = System.getenv("FUNCIONARIO_PASSWORD");

                if (senhaAdmin == null || senhaAdmin.isBlank()
                                || senhaFuncionario == null
                                || senhaFuncionario.isBlank()) {

                        throw new IllegalStateException(
                                        "Configure ADMIN_PASSWORD e FUNCIONARIO_PASSWORD");
                }

                UserDetails administrador = User.builder()
                                .username("admin")
                                .password(encoder.encode(senhaAdmin))
                                .roles("ADMIN")
                                .build();

                UserDetails funcionario = User.builder()
                                .username("funcionario")
                                .password(encoder.encode(senhaFuncionario))
                                .roles("FUNCIONARIO")
                                .build();

                return new InMemoryUserDetailsManager(
                                administrador, funcionario);
        }

        // Configuração de segurança
        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http) throws Exception {

                http

                                // Proteção CSRF
                                .csrf(csrf -> csrf
                                                .csrfTokenRepository(
                                                                CookieCsrfTokenRepository.withHttpOnlyFalse())
                                                .csrfTokenRequestHandler(
                                                                new CsrfTokenRequestAttributeHandler() {

                                                                        @Override
                                                                        public void handle(
                                                                                        HttpServletRequest request,
                                                                                        HttpServletResponse response,
                                                                                        Supplier<CsrfToken> csrfToken) {

                                                                                super.handle(request, response,
                                                                                                csrfToken);
                                                                                csrfToken.get();
                                                                        }
                                                                }))

                                // Controle de acesso
                                .authorizeHttpRequests(auth -> auth

                                                .requestMatchers("/relatorios.html", "/relatorios.js",
                                                                "/api/relatorios/**")
                                                .hasRole("ADMIN")

                                                // Login e página de erro
                                                .requestMatchers(
                                                                "/login",
                                                                "/login.html",
                                                                "/error")
                                                .permitAll()

                                                // Cadastro de clientes: somente administrador
                                                .requestMatchers(
                                                                "/clientes.html",
                                                                "/clientes.js")
                                                .hasRole("ADMIN")

                                                // Consulta de clientes: administrador e funcionário
                                                .requestMatchers(
                                                                HttpMethod.GET, "/api/clientes/**")
                                                .hasAnyRole("ADMIN", "FUNCIONARIO")

                                                // Alteração de clientes: somente administrador
                                                .requestMatchers("/api/clientes/**")
                                                .hasRole("ADMIN")

                                                // Consulta de produtos
                                                .requestMatchers(
                                                                HttpMethod.GET, "/api/produtos/**")
                                                .hasAnyRole("ADMIN", "FUNCIONARIO")

                                                // Cadastro, edição e exclusão de produtos
                                                .requestMatchers("/api/produtos/**")
                                                .hasRole("ADMIN")

                                                // Consulta de vendas
                                                .requestMatchers(
                                                                HttpMethod.GET, "/api/vendas/**")
                                                .hasAnyRole("ADMIN", "FUNCIONARIO")

                                                // Registro de vendas
                                                .requestMatchers(
                                                                HttpMethod.POST, "/api/vendas/**")
                                                .hasAnyRole("ADMIN", "FUNCIONARIO")

                                                // Outras alterações em vendas
                                                .requestMatchers("/api/vendas/**")
                                                .hasRole("ADMIN")

                                                // Demais páginas exigem autenticação
                                                .anyRequest().authenticated())

                                // Autenticação
                                .formLogin(form -> form
                                                .loginPage("/login.html")
                                                .loginProcessingUrl("/login")
                                                .defaultSuccessUrl("/", true)
                                                .failureUrl("/login.html?error")
                                                .permitAll())

                                // Encerramento da sessão
                                .logout(logout -> logout
                                                .logoutSuccessUrl("/login.html?logout")
                                                .permitAll());

                return http.build();
        }
}
