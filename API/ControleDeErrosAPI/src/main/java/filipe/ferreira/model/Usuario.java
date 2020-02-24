package filipe.ferreira.model;

import java.util.ArrayList;

import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import filipe.ferreira.repository.UsuarioRepository;

import javax.persistence.Enumerated;

@Entity
@Table(name = "usuario")
public class Usuario {	
	private Long id;
	private String nome;
	private Perfil perfil;
	private String senha;
	private String email;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	public Usuario() {}
	
	public Usuario(Usuario usuario) {
		this.id = usuario.getId();
		this.nome = usuario.getNome();
		this.email = usuario.getEmail();
		this.perfil = usuario.getPerfil();
		this.senha = usuario.getSenha();
	}
	
	@Transient
	public Collection<? extends GrantedAuthority> getPerfis() {
		Collection<GrantedAuthority> auths = new ArrayList<>();
		

					
		auths.add( new SimpleGrantedAuthority(getPerfil().getPerfil() ));
		
		System.out.println(getPerfil().getPerfil());

		return auths;
	}
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "usuario_id")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column(name = "nome")
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	

	@ManyToOne
	@JoinColumn(name = "perfil_id")
	public Perfil getPerfil() {
		return perfil;
	}
	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}
	
	@Column(name = "senha")
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}

	@Column(name = "email")
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
	
}
