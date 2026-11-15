
package br.edu.uern.prontaentrega.service;

import br.edu.uern.prontaentrega.model.*;
import br.edu.uern.prontaentrega.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class VendaService {

        private final VendaRepository vendaRepository;
        private final ClienteRepository clienteRepository;
        private final ProdutoRepository produtoRepository;

        public VendaService(
                        VendaRepository vendaRepository,
                        ClienteRepository clienteRepository,
                        ProdutoRepository produtoRepository) {

                this.vendaRepository = vendaRepository;
                this.clienteRepository = clienteRepository;
                this.produtoRepository = produtoRepository;
        }

        @Transactional
        public Venda registrarVenda(
                        Long clienteId,
                        List<Map<String, Long>> produtos) {

                Cliente cliente = clienteRepository.findById(clienteId)
                                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));

                if (produtos == null || produtos.isEmpty()) {
                        throw new IllegalArgumentException(
                                        "A venda precisa ter pelo menos um produto");
                }

                Venda venda = new Venda();
                venda.setCliente(cliente);

                BigDecimal total = BigDecimal.ZERO;

                for (Map<String, Long> item : produtos) {

                        Long produtoId = ((Number) item.get("produtoId")).longValue();
                        Long quantidadeSolicitada = ((Number) item.get("quantidade")).longValue();

                        if (produtoId == null || quantidadeSolicitada == null
                                        || quantidadeSolicitada <= 0
                                        || quantidadeSolicitada > Integer.MAX_VALUE) {
                                throw new IllegalArgumentException(
                                                "Produto ou quantidade inválida");
                        }

                        Produto produto = produtoRepository.findById(produtoId)
                                        .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));

                        int quantidade = quantidadeSolicitada.intValue();

                        if (produto.getQuantidade() < quantidade) {
                                throw new IllegalArgumentException(
                                                "Estoque insuficiente para: " + produto.getNome());
                        }

                        BigDecimal subtotal = produto.getPreco()
                                        .multiply(BigDecimal.valueOf(quantidade));

                        ItemVenda itemVenda = new ItemVenda();
                        itemVenda.setProduto(produto);
                        itemVenda.setQuantidade(quantidade);
                        itemVenda.setPrecoUnitario(produto.getPreco());
                        itemVenda.setSubtotal(subtotal);

                        venda.adicionarItem(itemVenda);

                        produto.setQuantidade(
                                        produto.getQuantidade() - quantidade);

                        produtoRepository.save(produto);

                        total = total.add(subtotal);
                }

                venda.setValorTotal(total);

                return vendaRepository.save(venda);
        }

        @Transactional(readOnly = true)
        public List<Map<String, Object>> listarVendas() {

                return vendaRepository.findAll()
                                .stream()
                                .map(venda -> {

                                        Map<String, Object> dados = new java.util.LinkedHashMap<>();

                                        dados.put("id", venda.getId());
                                        dados.put("clienteId", venda.getCliente().getId());
                                        dados.put("clienteNome", venda.getCliente().getNome());
                                        dados.put("dataVenda", venda.getDataVenda());
                                        dados.put("valorTotal", venda.getValorTotal());

                                        return dados;
                                })
                                .toList();
        }
}
