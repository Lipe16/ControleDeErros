package filipe.ferreira.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import filipe.ferreira.model.PendenteResolucaoStatus;
import filipe.ferreira.repository.PendenteResolucaoStatusRepository;

@Service
public class PendenteResolucaoStatusService {

	@Autowired
	private PendenteResolucaoStatusRepository pendenteResolucaoStatusRepository;
	
	public PendenteResolucaoStatus getStatusPorDescricao(String descricao) {
		return pendenteResolucaoStatusRepository.findByStatus(descricao);
	}
}
