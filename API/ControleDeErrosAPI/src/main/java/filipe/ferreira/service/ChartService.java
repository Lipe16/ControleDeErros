package filipe.ferreira.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import filipe.ferreira.dto.ChartErroDTO;
import filipe.ferreira.model.Erro;
import filipe.ferreira.model.Usuario;
import filipe.ferreira.repository.ErroRepository;

@Service
public class ChartService {
	
	@Autowired
	private ErroRepository erroRepository;
	
	public ChartErroDTO getChart(String dataUm, String dataDois) {
		
		List<Erro> erros = erroRepository.listarErrosParaChart(dataUm, dataDois);
		ChartErroDTO chart = new ChartErroDTO();
		
		erros.forEach(erro -> {	
	
			if(erro.getSituacao().getSituacao().equals("A"))
			chart.setAnalisando(chart.getAnalisando()+1);
			
			if(erro.getSituacao().getSituacao().equals("P"))
			chart.setPendentes(chart.getPendentes()+1);
			
			if(erro.getSituacao().getSituacao().equals("R"))
			chart.setResolvidos(chart.getResolvidos()+1);
			
		});
		
		return chart;
	}

}
