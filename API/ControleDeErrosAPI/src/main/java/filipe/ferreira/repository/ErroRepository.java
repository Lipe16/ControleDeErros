package filipe.ferreira.repository;

import java.util.List;

import javax.persistence.OrderBy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import filipe.ferreira.model.Erro;

import org.springframework.data.domain.Sort;


public interface ErroRepository extends JpaRepository<Erro, Long>{
	
	@Query("SELECT erro FROM Erro erro ")
	List<Erro> findAll();

	@Query("SELECT erro FROM Erro erro WHERE erro.situacao.situacao <> 'R' ")
	List<Erro> findAllNResolvidos();
	
	@Query("SELECT erro FROM Erro erro WHERE erro.situacao.situacao = 'R' AND erro.qualidade is null ")
	List<Erro> findAllQualidade();
	
	@Query("SELECT erro FROM Erro erro WHERE erro.situacao.situacao <> 'R'  AND ( erro.usuarioTecnico.id = CONCAT(:id) AND (erro.status.status = 'AGUARDANDO_TESTE' OR erro.status.status = 'LIBERADO_CLIENTE_TESTE')     )  ")
	List<Erro> findAllTecnico(@Param("id") Long id);
	
	@Query("SELECT erro FROM Erro erro WHERE (erro.situacao.situacao <> 'R') AND ( erro.usuarioTestador.id = CONCAT(:id) AND (erro.status.status = 'ANALISANDO_TESTE' OR erro.status.status = 'AGUARDANDO_CONFERENCIA_TESTE'  OR erro.status.status = 'ANALISANDO_CONFERENCIA_TESTE')   ) OR (erro.situacao.situacao <> 'R' AND  erro.status.status = 'AGUARDANDO_TESTE')  ")
	List<Erro> findAllTestador(@Param("id") Long id);
	
	
	@Query("SELECT erro FROM Erro erro WHERE (erro.situacao.situacao <> 'R' AND erro.usuarioProgramador.id = CONCAT(:id) ) AND  erro.status.status = 'AGUARDANDO_PROGRAMADOR' OR erro.status.status = 'ANALISANDO_PROGRAMADOR' ")
	List<Erro> findAllProgramador(@Param("id") Long id);
	
	
	
	@Query("SELECT erro FROM Erro erro WHERE erro.dataproblema between CONCAT(:dataUm) and CONCAT(:dataDois) AND erro.situacao.situacao = 'R' ")
	List<Erro> listarErrosPorData(@Param("dataUm") String dataUm, @Param("dataDois") String dataDois );
	
	@Query("SELECT erro FROM Erro erro WHERE erro.dataproblema between CONCAT(:dataUm) and CONCAT(:dataDois)")
	List<Erro> listarErrosParaChart(@Param("dataUm") String dataUm, @Param("dataDois") String dataDois );

}
