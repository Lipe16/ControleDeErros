package filipe.ferreira.dto;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import filipe.ferreira.model.Cliente;
import filipe.ferreira.model.Erro;
import filipe.ferreira.model.PrazoProgramador;
import filipe.ferreira.model.Programa;
import filipe.ferreira.model.Situacao;
import filipe.ferreira.model.Status;
import filipe.ferreira.model.SubSetor;
import filipe.ferreira.model.Tag;
import filipe.ferreira.model.Usuario;

public class ErroDTO {

	private Long id;
	private Long qualidade;
	private Situacao situacao;
	
	private Long programaId;

	private StatusDTO status;
	private Cliente cliente;
	private SubSetor subsetor;
	private char prioridade;
	private String descricao;
	private LocalDate dataproblema;
	private String checkListDataJson;

	private LocalDate dataSolucao;
	
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
	public void setSituacao(Situacao situacao) {
		this.situacao = situacao;
	}
	
	

	


	
	
	public Long getProgramaId() {
		return programaId;
	}
	public void setProgramaId(Long programaId) {
		this.programaId = programaId;
	}
	
	
	
	

	
	public Long getQualidade() {
		return qualidade;
	}
	public void setQualidade(Long qualidade) {
		this.qualidade = qualidade;
	}
	public StatusDTO getStatus() {
		return status;
	}
	public void setStatus(StatusDTO status) {
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
