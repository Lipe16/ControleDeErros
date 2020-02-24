package filipe.ferreira.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import filipe.ferreira.model.KardexErro;


public interface KardexErroRepository extends JpaRepository<KardexErro, Long>{

	@Query("SELECT kardex FROM KardexErro kardex WHERE kardex.erro.id = CONCAT(:id) ")
	List<KardexErro> listarKardexPorIdDoErro(@Param("id") Long id);
	
}
