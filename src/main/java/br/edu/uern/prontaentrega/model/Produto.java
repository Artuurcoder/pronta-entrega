package br.edu.uern.prontaentrega.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "produtos")
public class Produto {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Informe o nome")
    @Column(nullable = false)
    private String nome;
    @NotBlank(message = "Informe o tipo")
    @Column(nullable = false)
    private String tipo;
    @NotBlank(message = "Informe o tamanho")
    @Column(nullable = false)
    private String tamanho;
    @NotNull @DecimalMin(value = "0.01", message = "O preço deve ser positivo")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal preco;
    @NotNull @Min(value = 0, message = "A quantidade não pode ser negativa")
    @Column(nullable = false)
    private Integer quantidade;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getTamanho() { return tamanho; }
    public void setTamanho(String tamanho) { this.tamanho = tamanho; }
    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }
    public Integer getQuantidade() { return quantidade; }
    public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }
}
