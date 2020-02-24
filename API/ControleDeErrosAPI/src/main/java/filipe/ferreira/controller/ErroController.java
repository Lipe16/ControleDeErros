package filipe.ferreira.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import filipe.ferreira.dto.ErroDTO;
import filipe.ferreira.dto.ImagemErroDTO;
import filipe.ferreira.dto.UsuarioDTO;
import filipe.ferreira.model.Erro;
import filipe.ferreira.model.Log;
import filipe.ferreira.model.Usuario;
import filipe.ferreira.service.ErroService;

@RestController
@CrossOrigin(origins = "*")
public class ErroController {
	
	@Autowired
	ErroService erroService;
	
	@GetMapping(value = "/erros")
	public List<Erro> getErros(){
		List<Erro> erros = erroService.getErros();
	
		System.out.println(erros.get(0));
		System.out.println(erros.size());
		return erros;
	}
	
	@PostMapping(value = "/erro")
	public Erro save(@RequestBody ErroDTO erroDTO){	
		
		return erroService.salvarErro(erroDTO);
	}
	
    @RequestMapping(value = "/erro/imagem", method = RequestMethod.POST)
    public  Boolean salvarEmpresa( @RequestBody ImagemErroDTO imagem) throws IOException {
    	        
        return erroService.salvarImagem( imagem);
    }
    
	@GetMapping(value = "/erros/imagem/{id}")
	public List<String> getListarImagens(@PathVariable("id") Long id){
		return erroService.getListarImagens(id);
	}
	
	@PostMapping(value = "/erro/qualidade/")
	public Erro saveQualidade(@RequestBody ErroDTO erroDTO){	
		
		return erroService.salvarErroQualidade(erroDTO);
	}
	

	@GetMapping(value = "/erros/data")
	public List<Erro> getCliente(@RequestParam(value = "dataUm", defaultValue = "") String dataUm, @RequestParam(value = "dataDois", defaultValue = "0" ) String dataDois ) {
		if(!dataUm.equals("") && !dataDois.equals("")) {
			return erroService.listarLogsPorData(dataUm, dataDois);
		}else {
			return null;
		}
	}
	

}
