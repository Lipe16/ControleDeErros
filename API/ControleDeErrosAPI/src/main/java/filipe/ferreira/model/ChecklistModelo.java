package filipe.ferreira.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "checklist_modelo")
public class ChecklistModelo {

	private Long id;
	private String dataModeloJson;
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "checklist_modelo_id")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column(name = "data_modelo_json")
	public String getDataModeloJson() {
		return dataModeloJson;
	}
	public void setDataModeloJson(String dataModeloJson) {
		this.dataModeloJson = dataModeloJson;
	}
	
	
	
}
