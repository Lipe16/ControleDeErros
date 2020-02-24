package filipe.ferreira.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "kardex_erro")
public class KardexErro {
	
	private Long id;
	private Usuario usuario;
	private LocalDate data;
	private Status status;
	private String descricao;
	private PendenteResolucao pendenteResolucao;
	private Erro erro;
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "kardex_erro_id")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@ManyToOne
	@JoinColumn(name = "usuario_id")
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
	@Column(name = "data")
	public LocalDate getData() {
		return data;
	}
	public void setData(LocalDate data) {
		this.data = data;
	}
	
	@ManyToOne
	@JoinColumn(name = "status_id")
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	
	@Column(name = "descricao")
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
	@ManyToOne
	@JoinColumn(name = "pendente_resolucao_id")
	public PendenteResolucao getPendenteResolucao() {
		return pendenteResolucao;
	}
	public void setPendenteResolucao(PendenteResolucao pendenteResolucao) {
		this.pendenteResolucao = pendenteResolucao;
	}
	
	@ManyToOne
	@JoinColumn(name = "erro_id")
	public Erro getErro() {
		return erro;
	}
	public void setErro(Erro erro) {
		this.erro = erro;
	}
	
	
	
	

}
