package filipe.ferreira.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import filipe.ferreira.model.PrazoProgramador;


public interface PrazoProgramadorRepository extends JpaRepository<PrazoProgramador, Long>{
	
	
	@Query("SELECT erro.prazoProgramador FROM Erro erro WHERE erro.id = CONCAT(:id)")
	Optional<PrazoProgramador> findByIdErro(Long id);

}
