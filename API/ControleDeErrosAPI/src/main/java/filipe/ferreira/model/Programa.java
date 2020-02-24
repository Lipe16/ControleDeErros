package filipe.ferreira.model;


import java.util.List;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "programa")
public class Programa {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "programa_id")
	private Long id;

	
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "sub_setor_programa",
            joinColumns = {@JoinColumn(name = "sub_setor_id")},
            inverseJoinColumns = {@JoinColumn(name = "programa_id")}
    )
    private List<SubSetor> subSetores;
    
	@ManyToOne
	@JoinColumn(name = "programador_usuario_id")
	private Usuario programadorUsuario;
	
	@Column(name = "nome")
	private String nome;
	
	@ManyToOne
	@JoinColumn(name = "checklist_modelo_id")
	private ChecklistModelo checklistModelo;


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	
	public List<SubSetor> getSubSetores() {
		return subSetores;
	}
	public void setSubSetores(List<SubSetor> subSetores) {
		this.subSetores = subSetores;
	}
	
	

	public Usuario getProgramadorUsuario() {
		return programadorUsuario;
	}
	public void setProgramadorUsuario(Usuario programadorUsuario) {
		this.programadorUsuario = programadorUsuario;
	}

	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public ChecklistModelo getChecklistModelo() {
		return checklistModelo;
	}
	public void setChecklistModelo(ChecklistModelo checklistModelo) {
		this.checklistModelo = checklistModelo;
	}
	
	
	
}
