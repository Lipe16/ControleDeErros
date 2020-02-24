package filipe.ferreira.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import filipe.ferreira.dto.ErroDTO;
import filipe.ferreira.dto.PrazoProgramadorDTO;
import filipe.ferreira.model.Erro;
import filipe.ferreira.model.PrazoProgramador;
import filipe.ferreira.model.Programa;
import filipe.ferreira.service.PrazoProgramadorService;

@RestController
@CrossOrigin(origins = "*")
public class PrazoProgramadorController {
	
	@Autowired
	PrazoProgramadorService prazoProgramadorService;
	
	
	
	@GetMapping(value = "/prazoprogramador/erro/id")
	public PrazoProgramador getPrazoProgramadorPorIdErro(@RequestParam(value = "id", defaultValue = "0") Long id) {
		
		return prazoProgramadorService.getPrazoPorIdDoErro(id);
	}
	
	@PostMapping(value = "/prazoprogramador")
	public PrazoProgramador save(@RequestBody PrazoProgramadorDTO prazoProgramadorDTO){	
		
		return prazoProgramadorService.SalvarPrazo(prazoProgramadorDTO);
	}
}
