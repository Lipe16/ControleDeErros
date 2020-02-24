package filipe.ferreira.dto;

import java.util.List;

import filipe.ferreira.model.ChecklistModelo;
import filipe.ferreira.model.SubSetor;
import filipe.ferreira.model.Usuario;

public class ProgramaDDTO {

	private Long id;
    private List<SubSetor> subSetores;
	private Usuario programadorUsuario;
	private String nome;
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
