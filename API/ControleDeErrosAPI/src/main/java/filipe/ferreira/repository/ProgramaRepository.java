package filipe.ferreira.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import filipe.ferreira.model.Programa;
import filipe.ferreira.model.SubSetor;
import filipe.ferreira.model.Usuario;

public interface ProgramaRepository extends JpaRepository<Programa, Long>{

	@Query("SELECT programa FROM Programa programa JOIN programa.subSetores subSetores WHERE subSetores = CONCAT(:id)")
	List<Programa> findAllBySubSetorId(Long id);
	
	@Query("SELECT programa FROM Programa programa WHERE programa.programadorUsuario.id = CONCAT(:id)")
	List<Programa> findAllByProgramadorId(Long id);

	
}
