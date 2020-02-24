package filipe.ferreira.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import filipe.ferreira.model.SubSetor;
import filipe.ferreira.model.Usuario;


public interface SubSetorRepository extends JpaRepository<SubSetor, Long>{

	@Query("SELECT subSetor FROM SubSetor subSetor WHERE subSetor.setor.id = CONCAT(:id)")
	List<SubSetor> findBySetorId(Long id);
	
	@Query("SELECT subSetor FROM SubSetor subSetor")
	List<SubSetor> findAll();
}
