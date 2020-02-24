package filipe.ferreira.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import filipe.ferreira.model.Log;
import filipe.ferreira.service.LogService;

@RestController
@CrossOrigin(origins = "*")
public class LogController {

	@Autowired
	LogService logService;
	
	@GetMapping(value = "/log/data/datas")
	public List<Log> getCliente(@RequestParam(value = "dataUm", defaultValue = "") String dataUm, @RequestParam(value = "dataDois", defaultValue = "0" ) String dataDois ) {
		if(!dataUm.equals("") && !dataDois.equals("")) {
			return logService.listarLogsPorData(dataUm, dataDois);
		}else {
			return null;
		}
	}
}
