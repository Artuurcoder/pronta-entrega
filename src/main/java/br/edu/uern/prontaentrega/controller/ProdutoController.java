package br.edu.uern.prontaentrega.controller;

import br.edu.uern.prontaentrega.model.Produto;
import br.edu.uern.prontaentrega.service.ProdutoService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {
    private final ProdutoService service;
    public ProdutoController(ProdutoService service) { this.service = service; }

    @GetMapping
    public List<Produto> listar(@RequestParam(required = false) String busca) { return service.listar(busca); }
    @GetMapping("/{id}")
    public Produto buscar(@PathVariable Long id) { return service.buscar(id); }
    @PostMapping
    public ResponseEntity<Produto> cadastrar(@Valid @RequestBody Produto produto) {
        Produto salvo = service.cadastrar(produto);
        return ResponseEntity.created(URI.create("/api/produtos/" + salvo.getId())).body(salvo);
    }
    @PutMapping("/{id}")
    public Produto atualizar(@PathVariable Long id, @Valid @RequestBody Produto produto) { return service.atualizar(id, produto); }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
