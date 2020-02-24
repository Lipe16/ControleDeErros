package filipe.ferreira.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import filipe.ferreira.model.StatusSugestao;
import filipe.ferreira.model.Usuario;

public interface StatusSugestaoRepository extends JpaRepository<StatusSugestao, Long>{

}
