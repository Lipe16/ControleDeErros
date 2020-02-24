package filipe.ferreira.repository;

import java.time.LocalDate;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import filipe.ferreira.model.Log;


public interface LogRepository extends JpaRepository<Log, Long>{
	
	@Query("SELECT log FROM Log log WHERE log.data between CONCAT(:dataUm) and CONCAT(:dataDois)")
	List<Log> listarPorData(@Param("dataUm") String dataUm, @Param("dataDois") String dataDois );

}
