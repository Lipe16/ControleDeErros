package filipe.ferreira.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import filipe.ferreira.model.Sugestao;
import filipe.ferreira.model.Usuario;

public interface SugestaoRepository extends JpaRepository<Sugestao, Long>{

}
