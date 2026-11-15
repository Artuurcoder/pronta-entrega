
package br.edu.uern.prontaentrega.controller;

import br.edu.uern.prontaentrega.model.Cliente;
import br.edu.uern.prontaentrega.service.ClienteService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    // Listar todos os clientes
    @GetMapping
    public List<Cliente> listar() {
        return service.listar();
    }

    // Buscar cliente pelo ID
    @GetMapping("/{id}")
    public Cliente buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    // Cadastrar cliente
    @PostMapping
    public ResponseEntity<Cliente> cadastrar(
            @Valid @RequestBody Cliente cliente) {

        Cliente novoCliente = service.cadastrar(cliente);
        return ResponseEntity.status(201).body(novoCliente);
    }

    // Atualizar cliente
    @PutMapping("/{id}")
    public Cliente atualizar(
            @PathVariable Long id,
            @Valid @RequestBody Cliente cliente) {

        return service.atualizar(id, cliente);
    }

    // Excluir cliente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
