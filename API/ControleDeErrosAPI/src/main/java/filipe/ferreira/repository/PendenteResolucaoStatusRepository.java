package filipe.ferreira.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import filipe.ferreira.model.PendenteResolucao;
import filipe.ferreira.model.PendenteResolucaoStatus;


public interface PendenteResolucaoStatusRepository extends JpaRepository<PendenteResolucao, Long>{

	@Query("SELECT status FROM PendenteResolucaoStatus status WHERE status.status = CONCAT(:descricao)")
	PendenteResolucaoStatus findByStatus(String descricao);

}
