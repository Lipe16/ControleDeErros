package filipe.ferreira.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import filipe.ferreira.model.Status;
import filipe.ferreira.model.Usuario;

public interface StatusRepository extends JpaRepository<Status, Long>{

	@Query("SELECT status FROM Status status WHERE status.status = CONCAT(:status)")
	Optional<Status> findByStatus(String status);

}
