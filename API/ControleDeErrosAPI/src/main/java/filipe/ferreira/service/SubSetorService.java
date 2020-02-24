package filipe.ferreira.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import filipe.ferreira.dto.SubSetorDTO;
import filipe.ferreira.model.Programa;
import filipe.ferreira.model.Setor;
import filipe.ferreira.model.SubSetor;
import filipe.ferreira.repository.SubSetorRepository;

@Service
public class SubSetorService {
	@Autowired
	SubSetorRepository subSetorRepository;
	
	@Autowired
	private LogService logServise;
	
	public List<SubSetor> getSubSetoresPorSetor(long id) {
		
		return subSetorRepository.findBySetorId(id);
	}
	
	public List<SubSetor> getSubSetores() {
		
		return subSetorRepository.findAll();
	}
	
	public SubSetor salvar(SubSetorDTO subSetorDTO) {
		SubSetor subSetor;
		boolean novoRegistro = false;
		
		if(subSetorDTO.getId() == 0) {
			subSetor = new SubSetor();
			novoRegistro = true;
		}else {
			subSetor = subSetorRepository.findById(subSetorDTO.getId()).get();
		}
		
		subSetor.setDescricao(subSetorDTO.getDescricao());
		subSetor.setSetor(subSetorDTO.getSetor());
		
		if(novoRegistro) {
			logServise.salvarlog("subsetor", subSetor.getId(), "Criou novo registro "+ programaParaString(subSetor));
		}else {
			logServise.salvarlog("subsetor", subSetor.getId(), "Atualizou registro "+ programaParaString(subSetor));
		}
		
		return subSetorRepository.save(subSetor);
		
	}
	
	private String programaParaString(SubSetor subSetor) {
		String text = ",";
		text = text+ "Setor: "+subSetor.getSetor().getDescricao()+";";
		text = text+ "Descrição: "+subSetor.getDescricao()+";";
		
		return text;
	}

}
