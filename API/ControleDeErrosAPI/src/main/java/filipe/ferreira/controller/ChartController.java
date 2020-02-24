package filipe.ferreira.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import filipe.ferreira.dto.ChartErroDTO;
import filipe.ferreira.service.ChartService;

@RestController
@CrossOrigin(origins = "*")
public class ChartController {
	@Autowired
	ChartService chartService;
	
	@GetMapping(value = "/chartErros/data")
	public ChartErroDTO getChart(@RequestParam(value = "dataUm", defaultValue = "") String dataUm, @RequestParam(value = "dataDois", defaultValue = "0" ) String dataDois){
		if(!dataUm.equals("") && !dataDois.equals("")) {
			return chartService.getChart(dataUm, dataDois);
		}else {
			return null;
		}
		
	}
	
}
