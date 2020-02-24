package filipe.ferreira.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import filipe.ferreira.model.Log;
import filipe.ferreira.model.Usuario;
import filipe.ferreira.repository.LogRepository;

@Service
public class LogService {
	@Autowired
	LogRepository logRepository;
	
	@Autowired
	UsuarioService usuarioService;
	
	public Log salvarlog( String tabela, Long tabelaId, String logText ){
		
		Usuario usuario = usuarioService.getUsuarioLogado();
		
		Log log = new Log();
		
		log.setData(LocalDate.now());
		log.setUsuario(usuario);
		log.setIdTabela(tabelaId);
		log.setLog(logText);
		log.setTabela(tabela);
		
		logRepository.save(log);
		
		return log;
		
	}
	
	
	public List<Log> listarLogsPorData(String dataUm, String dataDois ){
		return logRepository.listarPorData(dataUm, dataDois);
	}

}
