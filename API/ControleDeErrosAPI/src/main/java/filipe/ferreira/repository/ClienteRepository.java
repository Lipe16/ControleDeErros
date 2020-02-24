package filipe.ferreira.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import filipe.ferreira.model.Cliente;
import filipe.ferreira.model.Usuario;

public interface ClienteRepository extends JpaRepository<Cliente, Long>{

	@Query("SELECT cliente FROM Cliente cliente WHERE cliente.id like CONCAT(:id, '%') OR cliente.cod like CONCAT(:id, '%')")
	List<Cliente> listarClientesPorId(Long id);

}
