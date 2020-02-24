package filipe.ferreira.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import filipe.ferreira.model.Usuario;
import filipe.ferreira.repository.UsuarioRepository;

@Service
public class MyDetailsService implements UserDetailsService {
	
    @Autowired
    private UsuarioRepository usuarioRepository;
    
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(username).get();
        
       
        
        if(usuario == null){
            throw new UsernameNotFoundException("Usuaŕio ou senha inválidos");
        }
        usuario.getPerfil().setPerfil("ROLE_"+ usuario.getPerfil().getPerfil());
        System.out.println("MYUserDetail");
        System.out.println(usuario.getPerfil().getPerfil());
        
        return new MyUserDetail(usuario);
        
    }
}


