package filipe.ferreira.dto;

import java.time.LocalDate;

import filipe.ferreira.model.Setor;
import filipe.ferreira.model.Usuario;

public class PrazoProgramadorDTO {

	private Long id;
	private Setor setor;
	private Usuario admUsuario;
	private LocalDate datacriacao;
	private LocalDate dataPrevisaoInicio;
	private LocalDate dataPrevisaoFim;
	private LocalDate dataLimite;
	private String observacao;
	
	private Long erroId;

	
	
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

	public Usuario getAdmUsuario() {
		return admUsuario;
	}

	public void setAdmUsuario(Usuario admUsuario) {
		this.admUsuario = admUsuario;
	}

	public LocalDate getDatacriacao() {
		return datacriacao;
	}

	public void setDatacriacao(LocalDate datacriacao) {
		this.datacriacao = datacriacao;
	}

	public LocalDate getDataPrevisaoInicio() {
		return dataPrevisaoInicio;
	}

	public void setDataPrevisaoInicio(LocalDate dataPrevisaoInicio) {
		this.dataPrevisaoInicio = dataPrevisaoInicio;
	}

	public LocalDate getDataPrevisaoFim() {
		return dataPrevisaoFim;
	}

	public void setDataPrevisaoFim(LocalDate dataPrevisaoFim) {
		this.dataPrevisaoFim = dataPrevisaoFim;
	}

	public LocalDate getDataLimite() {
		return dataLimite;
	}

	public void setDataLimite(LocalDate dataLimite) {
		this.dataLimite = dataLimite;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public Long getErroId() {
		return erroId;
	}

	public void setErroId(Long erroId) {
		this.erroId = erroId;
	}
	
	
}
