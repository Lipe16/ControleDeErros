package filipe.ferreira.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import filipe.ferreira.model.Erro;
import filipe.ferreira.model.Setor;
import filipe.ferreira.repository.SetorRepository;

@Service
public class SetorService {
	
	@Autowired
	SetorRepository setorRepository;

	public List<Setor> getSetores() {
		return setorRepository.findAll();
	}
	
	

	
}
