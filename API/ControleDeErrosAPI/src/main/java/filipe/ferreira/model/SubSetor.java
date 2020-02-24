package filipe.ferreira.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "sub_setor")
public class SubSetor {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "sub_setor_id")
	private Long id;
	

	
	@ManyToOne
	@JoinColumn(name = "setor_id")
	private Setor setor;
	
	@Column(name = "descricao")
	private String descricao;
	
    @ManyToMany(mappedBy = "subSetores", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private List<Programa> Programas;
	

	

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	public Setor getSetor() {
		return setor;
	}
	public void setSetor(Setor setor) {
		this.setor = setor;
	}
	

	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	

	
	

}
