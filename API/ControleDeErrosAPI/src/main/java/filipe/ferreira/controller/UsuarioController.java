package filipe.ferreira.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import filipe.ferreira.dto.UsuarioDTO;
import filipe.ferreira.model.Usuario;
import filipe.ferreira.repository.PerfilRepository;
import filipe.ferreira.service.UsuarioService;

@RestController
@CrossOrigin(origins = "*")
public class UsuarioController {
	
	@Autowired
	UsuarioService usuarioService;
	
    @Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
	PerfilRepository perfilRepository;
	
	@GetMapping(value = "/usuario")
	public UsuarioDTO getUsuarioLogado(){
		
		UsuarioDTO usuarioDTO = new UsuarioDTO(usuarioService.getUsuarioLogado());
		usuarioDTO.setSenha(null);
		
		return usuarioDTO;
	}
	
	@GetMapping(value = "/usuarios")
	public List<UsuarioDTO> getUsuarios(){
		return usuarioService.getUsuarios();
	}
	
	@PostMapping(value = "/usuario", produces =MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<?> save(@RequestBody UsuarioDTO usuarioDTO, BindingResult result, HttpSession session){	
		
		Usuario usuario = new Usuario();
		Map<String,String> response = new HashMap<String, String>();
		
		if(usuarioService.usuarioPorEmail(usuarioDTO.getEmail()).isPresent()) {
			if(usuarioDTO.getId() > 0) {
				usuario = usuarioService.usuarioPorEmail(usuarioDTO.getEmail()).get();
			}else {
				System.out.println("entrou no erro");
				response.put("error", "Email já existe em outro cadastro!");
				return ResponseEntity.badRequest().body(response);
			}
			
		}else {
			if(usuarioDTO.getId() > 0) {
				System.out.println("entrou no erro");
				response.put("error", "Email não pode ser alterado!");
				return ResponseEntity.badRequest().body(response);
			}
			usuario.setEmail(usuarioDTO.getEmail());
		}
		
		usuario.setNome(usuarioDTO.getNome());

		
		if(usuarioDTO.getPerfil().getId() == 0) {
			usuario.setPerfil( perfilRepository.findByPerfil( usuarioDTO.getPerfil().getPerfil().replaceAll("ROLE_", "") ) );

		}else {
			usuario.getPerfil().setId(usuarioDTO.getPerfil().getId());
			usuario.getPerfil().setPerfil(usuarioDTO.getPerfil().getPerfil().replaceAll("ROLE_", ""));
		}
		
		if(usuarioDTO.getSenha().equals("") || usuarioDTO.getSenha() == null) {
			
		}else { 
			usuario.setSenha( passwordEncoder.encode(usuarioDTO.getSenha() ) );
		}

		
		
		return ResponseEntity.ok().body(new UsuarioDTO(usuarioService.salvar(usuario)));
	}
	

}
