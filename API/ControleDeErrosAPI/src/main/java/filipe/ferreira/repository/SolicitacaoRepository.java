package filipe.ferreira.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import filipe.ferreira.model.Solicitacao;
import filipe.ferreira.model.Usuario;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long>{

}
