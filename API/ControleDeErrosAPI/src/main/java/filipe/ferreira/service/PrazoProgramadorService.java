package filipe.ferreira.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import filipe.ferreira.dto.PrazoProgramadorDTO;
import filipe.ferreira.model.Erro;
import filipe.ferreira.model.PrazoProgramador;
import filipe.ferreira.repository.ErroRepository;
import filipe.ferreira.repository.PrazoProgramadorRepository;

@Service
public class PrazoProgramadorService {
	
	@Autowired
	PrazoProgramadorRepository prazoProgramadorRepository;
	
	@Autowired
	UsuarioService usuarioService;
	
	@Autowired
	ErroRepository erroRepository;
	
	@Autowired
	private LogService logServise;
	
	public PrazoProgramador getPrazoPorIdDoErro(Long id) {
		
		if(prazoProgramadorRepository.findByIdErro(id).isPresent()) {
			
			PrazoProgramador prazo = prazoProgramadorRepository.findByIdErro(id).get();
			
			return  prazo;
		}else {
			return new PrazoProgramador();
		}
	}
	
	public PrazoProgramador SalvarPrazo(PrazoProgramadorDTO prazoProgramadorDTO) {
		PrazoProgramador prazoProgramador;
		Erro erro = erroRepository.findById(prazoProgramadorDTO.getErroId()).get();
		boolean novoRegistro = false;
		
		if(prazoProgramadorDTO.getId() == 0) {
			prazoProgramador = new PrazoProgramador();
			novoRegistro = true;
			prazoProgramador.setDatacriacao(LocalDate.now());
		}else {
			prazoProgramador = prazoProgramadorRepository.findById(prazoProgramadorDTO.getId()).get();
		}
		

		//prazoProgramador.setDatacriacao(prazoProgramadorDTO.getDatacriacao());
		prazoProgramador.setDataPrevisaoFim(prazoProgramadorDTO.getDataPrevisaoFim());
		prazoProgramador.setDataPrevisaoInicio(prazoProgramadorDTO.getDataPrevisaoInicio());
		prazoProgramador.setObservacao(prazoProgramadorDTO.getObservacao());
		
		
		if(usuarioService.getUsuarioLogado().getPerfil().getPerfil().equals("G")) {

			prazoProgramador.setAdmUsuario(usuarioService.getUsuarioLogado());
			prazoProgramador.setDataLimite(prazoProgramadorDTO.getDataLimite());
		}
		
		
		prazoProgramador.setSetor(erro.getSubsetor().getSetor());
		prazoProgramador = prazoProgramadorRepository.save(prazoProgramador);
		
		erro.setPrazoProgramador(prazoProgramador);
		erroRepository.save(erro);

		if(novoRegistro) {
			logServise.salvarlog("prazo_programador", prazoProgramador.getId(), "Criou novo registro de prazo"+prazoParaString(prazoProgramador));
		}else {
			logServise.salvarlog("prazo_programador", prazoProgramador.getId(), "Atualizou registro de prazo"+prazoParaString(prazoProgramador));	
		}
		
		return prazoProgramador;
	}	
	
	private String prazoParaString(PrazoProgramador prazo) {
		String text = ",";
		text = text+ "AdmUsuario: "+prazo.getAdmUsuario().getEmail()+";";
		text = text+ "Data de criação: "+prazo.getDatacriacao()+";";
		text = text+ "Data previsão de inicio: "+prazo.getDataPrevisaoInicio()+";";
		text = text+ "Data previsão fim: "+prazo.getDataPrevisaoFim()+";";
		text = text+ "Data limite: "+prazo.getDataLimite()+";";
		text = text+ "Observação: "+prazo.getObservacao()+";";
		
		return text;
	}
	

}
