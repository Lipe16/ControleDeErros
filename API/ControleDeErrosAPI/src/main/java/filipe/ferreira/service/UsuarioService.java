package filipe.ferreira.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import filipe.ferreira.dto.UsuarioDTO;
import filipe.ferreira.model.Usuario;
import filipe.ferreira.repository.UsuarioRepository;

@Service
public class UsuarioService {
	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Autowired
	UsuarioService usuarioService;
	
	@Autowired
	private LogService logServise;
	
	public Usuario getUsuarioLogado() {
		return usuarioRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).get();
	}
	
	public Optional<Usuario> usuarioPorEmail(String email) {
		return usuarioRepository.findByEmail(email);
	}
	


	public Usuario salvar(Usuario usuario) {
		boolean novoRegistro = true;
		
		if((usuario.getSenha() == null || usuario.getSenha().equals("")) && usuario.getId() != null) {
			usuario.setSenha(getUsuarioPorId(  usuario.getId()).getSenha());			
		}
		
		if(usuarioService.usuarioPorEmail(usuario.getEmail()).isPresent()) {
			novoRegistro = false;	
		}
		
		usuario = usuarioRepository.save(usuario);
		
		
		if(novoRegistro) {
			logServise.salvarlog("usuario", usuario.getId(), "criou cadastro de usuario.");
		}else {
			logServise.salvarlog("usuario", usuario.getId(), "atualizou cadastro de usuario.");
		}
		return usuario;
	}
	
	public List<UsuarioDTO> getUsuarios(){
		List<Usuario> usuarios = usuarioRepository.findAll();
		List<UsuarioDTO> usuariosDTO = new ArrayList<UsuarioDTO>();
		
		for(Usuario usuario: usuarios) {
			usuario.setSenha(null);
			usuariosDTO.add(new UsuarioDTO(usuario));
		}
		
		return usuariosDTO;	
	}
	
	
	
	

	public Usuario getUsuarioPorId(Long id) {

		return usuarioRepository.findById(id).get();
	}
}
