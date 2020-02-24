package filipe.ferreira.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import filipe.ferreira.model.KardexErro;
import filipe.ferreira.service.KardexErroService;

@RestController
@CrossOrigin(origins = "*")
public class KardexErroController {
	@Autowired
	KardexErroService kardexErroService;
	
	
	@GetMapping(value = "/kardex/erro/id")
	public List<KardexErro> getCliente(@RequestParam(value = "id", defaultValue = "0") Long id) {
		
		return kardexErroService.listarKardexPorIdDoErro(id);
	}
}
