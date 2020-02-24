package filipe.ferreira.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import filipe.ferreira.dto.ProgramaDDTO;
import filipe.ferreira.model.ChecklistModelo;
import filipe.ferreira.model.PrazoProgramador;
import filipe.ferreira.model.Programa;
import filipe.ferreira.model.SubSetor;
import filipe.ferreira.repository.ChecklistModeloRepository;
import filipe.ferreira.repository.ProgramaRepository;
import filipe.ferreira.repository.SubSetorRepository;

@Service
public class ProgramaService {
	@Autowired
	private ProgramaRepository programaRepository;
	
	@Autowired
	private ChecklistModeloRepository checklistModeloRepository;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private SubSetorRepository subSetorRepository;
	
	@Autowired
	private LogService logServise;
	
	public List<Programa> getProgramasPorSetorId(Long id){
		return programaRepository.findAllBySubSetorId(id);
	}
	
	public List<Programa> getProgramasPorProgramador(){
		return programaRepository.findAllByProgramadorId(usuarioService.getUsuarioLogado().getId());
	}
	
	public Programa salvar(ProgramaDDTO programaDDTO) {
		Programa programa;
		boolean novoRegistro = false;
		
		
		if(programaDDTO.getId() != null) {
			if(programaDDTO.getId() > 0) {
				programa = programaRepository.findById(programaDDTO.getId()).get();
				
			}else {
				programa = new Programa();
				programa.setProgramadorUsuario(usuarioService.getUsuarioLogado());
				novoRegistro = true;
			}
		}else {
			programa = new Programa();
			programa.setProgramadorUsuario(usuarioService.getUsuarioLogado());
			novoRegistro = true;
		}
		
		programa.setNome(programaDDTO.getNome());
		programa.setSubSetores(subSetorRepository.saveAll(programaDDTO.getSubSetores()));
		
		
		if(programaDDTO.getChecklistModelo().getId() == 0) {
			
			ChecklistModelo checklistModelo = new ChecklistModelo();
			checklistModelo.setDataModeloJson(programaDDTO.getChecklistModelo().getDataModeloJson());
			checklistModelo = checklistModeloRepository.save(checklistModelo);
			programa.setChecklistModelo(checklistModelo);
			
		}else {
			ChecklistModelo checklistModelo = checklistModeloRepository.findById(programaDDTO.getChecklistModelo().getId()).get();
			checklistModelo.setDataModeloJson(programaDDTO.getChecklistModelo().getDataModeloJson());
			checklistModelo = checklistModeloRepository.save(checklistModelo);
			programa.setChecklistModelo(programaDDTO.getChecklistModelo());

		}
		
		
		if(novoRegistro) {
			logServise.salvarlog("programa", programa.getId(), "Criou registro de programa "+programaParaString(programa));
		}else {
			logServise.salvarlog("programa", programa.getId(), "atualizou registro de programa "+programaParaString(programa));
		}
		
		
		
		return programaRepository.save(programa);
	}
	
	private String programaParaString(Programa programa) {
		String text = ",";
		text = text+ "Programa: "+programa.getNome()+";";
		text = text+ "Usuario: "+programa.getProgramadorUsuario()+";";
		text = text+ "ChecklistModelo: "+programa.getChecklistModelo()+";";
		
		return text;
	}
}
