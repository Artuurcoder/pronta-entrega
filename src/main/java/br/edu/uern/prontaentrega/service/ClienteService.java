
package br.edu.uern.prontaentrega.service;

import br.edu.uern.prontaentrega.model.Cliente;
import br.edu.uern.prontaentrega.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    // Listar todos os clientes
    public List<Cliente> listar() {
        return repository.findAll();
    }

    // Buscar um cliente pelo ID
    public Cliente buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));
    }

    // Cadastrar um cliente
    public Cliente cadastrar(Cliente cliente) {
        cliente.setId(null);
        return repository.save(cliente);
    }

    // Atualizar um cliente
    public Cliente atualizar(Long id, Cliente dados) {
        Cliente cliente = buscarPorId(id);

        cliente.setNome(dados.getNome());
        cliente.setCpfCnpj(dados.getCpfCnpj());
        cliente.setTelefone(dados.getTelefone());
        cliente.setEndereco(dados.getEndereco());

        return repository.save(cliente);
    }

    // Excluir um cliente
    public void excluir(Long id) {
        Cliente cliente = buscarPorId(id);
        repository.delete(cliente);
    }
}
