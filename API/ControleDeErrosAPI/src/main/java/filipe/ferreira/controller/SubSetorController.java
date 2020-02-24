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
import filipe.ferreira.dto.SubSetorDTO;
import filipe.ferreira.model.Programa;
import filipe.ferreira.model.Setor;
import filipe.ferreira.model.SubSetor;
import filipe.ferreira.repository.SetorRepository;
import filipe.ferreira.service.SubSetorService;

@RestController
@CrossOrigin(origins = "*")
public class SubSetorController {
	@Autowired
	SubSetorService subSetorService;
	
	@GetMapping(value = "/subSetores/setor/id")
	public List<SubSetor> getSetores(@RequestParam(value = "id", defaultValue = "0") int setorId) {
		return subSetorService.getSubSetoresPorSetor(setorId);
	}
	
	@GetMapping(value = "/subSetores")
	public List<SubSetor> getListSetores() {
		return subSetorService.getSubSetores();
	}
	
	@PostMapping(value = "/subsetor")
	public SubSetor salvarSubSetor(@RequestBody SubSetorDTO subSetorDTO) {
		return subSetorService.salvar(subSetorDTO);
	}
	

}
