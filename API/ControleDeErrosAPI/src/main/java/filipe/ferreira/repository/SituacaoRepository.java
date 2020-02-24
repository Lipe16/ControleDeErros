package filipe.ferreira.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import filipe.ferreira.model.Situacao;
import filipe.ferreira.model.Usuario;

public interface SituacaoRepository extends JpaRepository<Situacao, Long>{

	@Query("SELECT situacao FROM Situacao situacao WHERE situacao.situacao = CONCAT(:situacao)")
	Situacao findBySituacao(char situacao);

}
