
package br.edu.uern.prontaentrega.controller;

import br.edu.uern.prontaentrega.model.Produto;
import br.edu.uern.prontaentrega.model.Venda;
import br.edu.uern.prontaentrega.repository.ProdutoRepository;
import br.edu.uern.prontaentrega.repository.VendaRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/relatorios")
public class RelatorioController {

    private final VendaRepository vendaRepository;
    private final ProdutoRepository produtoRepository;

    public RelatorioController(
            VendaRepository vendaRepository,
            ProdutoRepository produtoRepository) {

        this.vendaRepository = vendaRepository;
        this.produtoRepository = produtoRepository;
    }

    @GetMapping("/resumo")
    public Map<String, Object> resumo() {

        List<Venda> vendas = vendaRepository.findAll();
        List<Produto> produtos = produtoRepository.findAll();

        BigDecimal faturamento = vendas.stream()
                .map(Venda::getValorTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int estoqueTotal = produtos.stream()
                .mapToInt(Produto::getQuantidade)
                .sum();

        Map<String, Object> resumo = new LinkedHashMap<>();

        resumo.put("totalVendas", vendas.size());
        resumo.put("faturamentoTotal", faturamento);
        resumo.put("produtosCadastrados", produtos.size());
        resumo.put("estoqueDisponivel", estoqueTotal);

        return resumo;
    }
}
