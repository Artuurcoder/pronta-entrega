package br.edu.uern.prontaentrega.service;

import br.edu.uern.prontaentrega.model.Produto;
import br.edu.uern.prontaentrega.repository.ProdutoRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProdutoService {
    private final ProdutoRepository repository;
    public ProdutoService(ProdutoRepository repository) { this.repository = repository; }
    public List<Produto> listar(String busca) {
        return (busca == null || busca.isBlank()) ? repository.findAll() : repository.findByNomeContainingIgnoreCaseOrderByNomeAsc(busca);
    }
    public Produto buscar(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));
    }
    public Produto cadastrar(Produto produto) {
        produto.setId(null); // impede atualizar registro por meio da criação
        return repository.save(produto);
    }
    public Produto atualizar(Long id, Produto dados) {
        Produto produto = buscar(id);
        produto.setNome(dados.getNome());
        produto.setTipo(dados.getTipo());
        produto.setTamanho(dados.getTamanho());
        produto.setPreco(dados.getPreco());
        produto.setQuantidade(dados.getQuantidade());
        return repository.save(produto);
    }
    public void excluir(Long id) { repository.delete(buscar(id)); }
}
