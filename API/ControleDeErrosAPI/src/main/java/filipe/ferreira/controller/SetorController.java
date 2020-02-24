package filipe.ferreira.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import filipe.ferreira.model.Erro;
import filipe.ferreira.model.Setor;
import filipe.ferreira.service.SetorService;

@RestController
@CrossOrigin(origins = "*")
public class SetorController {
	@Autowired
	SetorService setorService;
	
	@GetMapping(value = "/setores")
	public List<Setor> getUsuarios(){
		List<Setor> setores = setorService.getSetores();
	

		return setores;
	}
}
