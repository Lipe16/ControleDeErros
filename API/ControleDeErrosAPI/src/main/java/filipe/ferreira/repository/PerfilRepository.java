package filipe.ferreira.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import filipe.ferreira.model.Perfil;


public interface PerfilRepository extends JpaRepository<Perfil, Long>{

	
	Perfil findByPerfil(String perfil);

}
