package filipe.ferreira.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import filipe.ferreira.dto.ProgramaDDTO;
import filipe.ferreira.dto.UsuarioDTO;
import filipe.ferreira.model.Programa;
import filipe.ferreira.model.SubSetor;
import filipe.ferreira.model.Usuario;
import filipe.ferreira.service.ProgramaService;
import filipe.ferreira.service.SubSetorService;

@RestController
@CrossOrigin(origins = "*")
public class ProgramaController {

	@Autowired
	ProgramaService programaService;
	
	@GetMapping(value = "/programas/setor/id")
	public List<Programa> getProgramasPorSetor(@RequestParam(value = "id", defaultValue = "0") Long setorId) {
		return programaService.getProgramasPorSetorId(setorId);
	}
	
	@GetMapping(value = "/programas/programador")
	public List<Programa> getSetores() {
		return programaService.getProgramasPorProgramador();
	}
	
	@PostMapping(value = "/programa")
	public Programa save(@RequestBody ProgramaDDTO programaDDTO){	

		
		return programaService.salvar(programaDDTO);
	}
	
}
