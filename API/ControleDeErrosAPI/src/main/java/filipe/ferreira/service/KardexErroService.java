package filipe.ferreira.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import filipe.ferreira.model.KardexErro;
import filipe.ferreira.repository.KardexErroRepository;

@Service
public class KardexErroService {
	@Autowired
	private KardexErroRepository kardexErroRepository;
	
	public void salvar(KardexErro kardex) {
		
		kardexErroRepository.save(kardex);
	}
	
	public List<KardexErro> listarKardexPorIdDoErro(Long id) {
		return kardexErroRepository.listarKardexPorIdDoErro(id);
	}

}
