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
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "prazo_programador")
public class PrazoProgramador {
	
	private Long id;
	private Setor setor;
	private Usuario admUsuario;
	private LocalDate datacriacao;
	private LocalDate dataPrevisaoInicio;
	private LocalDate dataPrevisaoFim;
	private LocalDate dataLimite;
	private String observacao;
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "prazo_programa_id")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@ManyToOne
	@JoinColumn(name = "setor_id")
	public Setor getSetor() {
		return setor;
	}
	public void setSetor(Setor setor) {
		this.setor = setor;
	}
	

	
	@Column(name="data_criacao")
	public LocalDate getDatacriacao() {
		return datacriacao;
	}
	public void setDatacriacao(LocalDate datacriacao) {
		this.datacriacao = datacriacao;
	}
	
	
	@Column(name="data_previsao_inicio")
	public LocalDate getDataPrevisaoInicio() {
		return dataPrevisaoInicio;
	}
	public void setDataPrevisaoInicio(LocalDate dataPrevisaoInicio) {
		this.dataPrevisaoInicio = dataPrevisaoInicio;
	}
	
	@Column(name="data_previsao_fim")
	public LocalDate getDataPrevisaoFim() {
		return dataPrevisaoFim;
	}
	public void setDataPrevisaoFim(LocalDate dataPrevisaoFim) {
		this.dataPrevisaoFim = dataPrevisaoFim;
	}
	
	@Column(name="data_limite")
	public LocalDate getDataLimite() {
		return dataLimite;
	}
	public void setDataLimite(LocalDate dataLimite) {
		this.dataLimite = dataLimite;
	}
	
	@Column(name="observacao")
	public String getObservacao() {
		return observacao;
	}
	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}
	
	@ManyToOne
	@JoinColumn(name="adm_usuario_id")
	public Usuario getAdmUsuario() {
		return admUsuario;
	}
	public void setAdmUsuario(Usuario admUsuario) {
		this.admUsuario = admUsuario;
	}
	
	
	
	

}
