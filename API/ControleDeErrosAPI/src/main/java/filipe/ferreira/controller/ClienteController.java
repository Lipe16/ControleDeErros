package filipe.ferreira.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import filipe.ferreira.model.Cliente;
import filipe.ferreira.service.ClienteService;
import filipe.ferreira.service.LogService;

@RestController
@CrossOrigin(origins = "*")
public class ClienteController {
	
	@Autowired
	ClienteService clienteService;
	
	@GetMapping(value = "/clientes/id")
	public List<Cliente> getCliente(@RequestParam(value = "id", defaultValue = "0") Long id) {
		
		return clienteService.getClientesPorId(id);
	}

}
