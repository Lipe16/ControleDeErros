package filipe.ferreira.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "pendente_resolucao_status")
public class PendenteResolucaoStatus {

	private Long id;
	private String status;
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "pendente_resolucao_status_id")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column(name = "status")
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
