
package br.edu.uern.prontaentrega.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

    @GetMapping
    public Map<String, Object> usuarioAtual(
            Authentication authentication) {

        Map<String, Object> dados = new LinkedHashMap<>();

        dados.put("username", authentication.getName());

        List<String> roles = authentication
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        dados.put("roles", roles);

        return dados;
    }
}
