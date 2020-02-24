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
@Table(name = "erro")
public class Erro {

	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "erro_id")
	private Long id;
	

	@Column(name = "qualidade")
	private Long qualidade;
	
	@ManyToOne
	@JoinColumn(name = "situacao_id", referencedColumnName = "situacao_id")
	private Situacao situacao;
	
	@ManyToOne
	@JoinColumn(name = "programa_id", referencedColumnName = "programa_id")
	private Programa programa;
	
	@ManyToOne
	@JoinColumn(name = "usuario_tecnico_id", referencedColumnName = "usuario_id")
	private Usuario usuarioTecnico;
	
	@ManyToOne
	@JoinColumn(name = "usuario_testador_id", referencedColumnName = "usuario_id")
	private Usuario usuarioTestador;
	
	@ManyToOne
	@JoinColumn(name = "usuario_programador_id", referencedColumnName = "usuario_id")
	private Usuario usuarioProgramador;
	
	@ManyToOne
	@JoinColumn(name = "usuario_qualidate_id", referencedColumnName = "usuario_id")
	private Usuario usuarioQualidade;
	
	@ManyToOne
	@JoinColumn(name = "prazo_programador_id", referencedColumnName = "prazo_programa_id")
	private PrazoProgramador prazoProgramador;
	
	@ManyToOne
	@JoinColumn(name = "status_id", referencedColumnName = "status_id")
	private Status status;
	
	@ManyToOne
	@JoinColumn(name = "cliente_id", referencedColumnName = "cliente_id")
	private Cliente cliente;
	
	@ManyToOne
	@JoinColumn(name = "sub_setor_id", referencedColumnName = "sub_setor_id")
	private SubSetor subsetor;
	
	@Column(name = "prioridade")
	private char prioridade;
	
	@Column(name = "descricao")
	private String descricao;
	
	@Column(name = "data_problema")
	private LocalDate dataproblema;
	
	@Column(name = "checklist_data_json")
	private String checkListDataJson;
	
	@Column(name = "versao_erro")
	private String versaoErro;
	
	@Column(name = "versao_correcao")
	private String versaoCorrecao;
	
	@Column(name = "data_solucao")
	private LocalDate dataSolucao;
	
	@ManyToOne
	@JoinColumn(name = "tag_id", referencedColumnName = "tag_id")
	private Tag tag;
	

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Situacao getSituacao() {
		return situacao;
	}

	
	
	public Long getQualidade() {
		return qualidade;
	}

	public void setQualidade(Long qualidade) {
		this.qualidade = qualidade;
	}
	
	

	public void setSituacao(Situacao situacao) {
		this.situacao = situacao;
	}

	public Programa getPrograma() {
		return programa;
	}

	public void setPrograma(Programa programa) {
		this.programa = programa;
	}

	public Usuario getUsuarioTecnico() {
		return usuarioTecnico;
	}

	public void setUsuarioTecnico(Usuario usuarioTecnico) {
		this.usuarioTecnico = usuarioTecnico;
	}

	public Usuario getUsuarioTestador() {
		return usuarioTestador;
	}

	public void setUsuarioTestador(Usuario usuarioTestador) {
		this.usuarioTestador = usuarioTestador;
	}

	public Usuario getUsuarioProgramador() {
		return usuarioProgramador;
	}

	public void setUsuarioProgramador(Usuario usuarioProgramador) {
		this.usuarioProgramador = usuarioProgramador;
	}

	public Usuario getUsuarioQualidade() {
		return usuarioQualidade;
	}

	public void setUsuarioQualidade(Usuario usuarioQualidade) {
		this.usuarioQualidade = usuarioQualidade;
	}

	public PrazoProgramador getPrazoProgramador() {
		return prazoProgramador;
	}

	public void setPrazoProgramador(PrazoProgramador prazoProgramador) {
		this.prazoProgramador = prazoProgramador;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public SubSetor getSubsetor() {
		return subsetor;
	}

	public void setSubsetor(SubSetor subsetor) {
		this.subsetor = subsetor;
	}

	public char getPrioridade() {
		return prioridade;
	}

	public void setPrioridade(char prioridade) {
		this.prioridade = prioridade;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDate getDataproblema() {
		return dataproblema;
	}

	public void setDataproblema(LocalDate dataproblema) {
		this.dataproblema = dataproblema;
	}

	public String getCheckListDataJson() {
		return checkListDataJson;
	}

	public void setCheckListDataJson(String checkListDataJson) {
		this.checkListDataJson = checkListDataJson;
	}

	public String getVersaoErro() {
		return versaoErro;
	}

	public void setVersaoErro(String versaoErro) {
		this.versaoErro = versaoErro;
	}

	public String getVersaoCorrecao() {
		return versaoCorrecao;
	}

	public void setVersaoCorrecao(String versaoCorrecao) {
		this.versaoCorrecao = versaoCorrecao;
	}

	public LocalDate getDataSolucao() {
		return dataSolucao;
	}

	public void setDataSolucao(LocalDate dataSolucao) {
		this.dataSolucao = dataSolucao;
	}

	public Tag getTag() {
		return tag;
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}

	
	

}
