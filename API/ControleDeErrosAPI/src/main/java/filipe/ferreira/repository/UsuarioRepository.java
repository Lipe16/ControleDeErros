package filipe.ferreira.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import filipe.ferreira.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	@Query("SELECT usuario FROM Usuario usuario WHERE usuario.email = CONCAT(:email)")
	Optional<Usuario> findByEmail(String email);



}
