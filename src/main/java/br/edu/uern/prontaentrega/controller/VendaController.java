
package br.edu.uern.prontaentrega.controller;

import br.edu.uern.prontaentrega.model.Venda;
import br.edu.uern.prontaentrega.service.VendaService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vendas")
public class VendaController {

    private final VendaService service;

    public VendaController(VendaService service) {
        this.service = service;
    }

    // Registrar uma nova venda
    @PostMapping
    public ResponseEntity<Map<String, Object>> registrar(
            @RequestBody Map<String, Object> dados) {

        Long clienteId = Long.valueOf(
                dados.get("clienteId").toString());

        @SuppressWarnings("unchecked")
        List<Map<String, Long>> produtos = (List<Map<String, Long>>) dados.get("produtos");

        Venda venda = service.registrarVenda(clienteId, produtos);

        return ResponseEntity.status(201).body(Map.of(
                "id", venda.getId(),
                "valorTotal", venda.getValorTotal(),
                "mensagem", "Venda registrada com sucesso!"));
    }

    // Consultar vendas realizadas
    @GetMapping
    public List<Map<String, Object>> listar() {
        return service.listarVendas();
    }

}
