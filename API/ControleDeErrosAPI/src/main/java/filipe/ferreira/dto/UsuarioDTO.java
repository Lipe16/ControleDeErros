package filipe.ferreira.dto;

import org.springframework.beans.factory.annotation.Autowired;

import filipe.ferreira.model.Usuario;
import filipe.ferreira.repository.PerfilRepository;
import filipe.ferreira.repository.UsuarioRepository;

public class UsuarioDTO {
	
	private Long id;
	private String nome;
	private PerfilDTO perfil = new PerfilDTO();
	private String email;
	private String senha;
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Autowired
	PerfilRepository perfilRepository;
	
	public Usuario UsuarioDTOParaUsuario(Usuario usuario) {
		

		

		usuario.setNome(nome);
	
		
		return usuario;
	}
	
	public UsuarioDTO(Usuario usuario) {

		
		
		this.id = usuario.getId();
		this.email = usuario.getEmail();
		
	
		this.perfil.setId(usuario.getPerfil().getId());
		this.perfil.setPerfil(usuario.getPerfil().getPerfil());
		
		this.nome = usuario.getNome();
	}
	
	public UsuarioDTO() {

	}
	
	
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}

	
	
	
	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public PerfilDTO getPerfil() {
		return perfil;
	}

	public void setPerfil(PerfilDTO perfil) {
		this.perfil = perfil;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	

}
