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
@Table(name = "pendente_resolucao")
public class PendenteResolucao {

	private Long id;
	private Usuario usuarioSolicitante;
	private Usuario usuarioSolicitado;
	private LocalDate solicitacaoData;
	private LocalDate SolucaoData;
	private PendenteResolucaoStatus pendenteResolucaoStatus;
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "pendente_resolucao_id")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@ManyToOne
	@JoinColumn(name = "solicitante_usuario_id", referencedColumnName = "usuario_id")
	public Usuario getUsuarioSolicitante() {
		return usuarioSolicitante;
	}
	public void setUsuarioSolicitante(Usuario usuarioSolicitante) {
		this.usuarioSolicitante = usuarioSolicitante;
	}
	
	@ManyToOne
	@JoinColumn(name = "solicitado_usuario_id", referencedColumnName = "usuario_id")
	public Usuario getUsuarioSolicitado() {
		return usuarioSolicitado;
	}
	public void setUsuarioSolicitado(Usuario usuarioSolicitado) {
		this.usuarioSolicitado = usuarioSolicitado;
	}
	
	@Column(name = "solicitacao_data")
	public LocalDate getSolicitacaoData() {
		return solicitacaoData;
	}
	public void setSolicitacaoData(LocalDate solicitacaoData) {
		this.solicitacaoData = solicitacaoData;
	}
	
	@Column(name = "SolucaoData")
	public LocalDate getSolucaoData() {
		return SolucaoData;
	}
	public void setSolucaoData(LocalDate solucaoData) {
		SolucaoData = solucaoData;
	}
	
	@ManyToOne
	@JoinColumn(name = "pendente_resolucao_status_id")
	public PendenteResolucaoStatus getPendenteResolucaoStatus() {
		return pendenteResolucaoStatus;
	}
	public void setPendenteResolucaoStatus(PendenteResolucaoStatus pendenteResolucaoStatus) {
		this.pendenteResolucaoStatus = pendenteResolucaoStatus;
	}
	

	
	
	

}
