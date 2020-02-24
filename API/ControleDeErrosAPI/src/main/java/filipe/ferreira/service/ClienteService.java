package filipe.ferreira.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import filipe.ferreira.model.Cliente;
import filipe.ferreira.repository.ClienteRepository;


@Service
public class ClienteService {
	@Autowired
	ClienteRepository clienteRepository;
	
	@Autowired
	LogService logServise;
	
	
	public List<Cliente> getClientesPorId(Long id){
		
		return clienteRepository.listarClientesPorId(id);
		
	}
}
