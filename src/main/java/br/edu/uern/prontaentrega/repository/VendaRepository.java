
package br.edu.uern.prontaentrega.repository;

import br.edu.uern.prontaentrega.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

}
