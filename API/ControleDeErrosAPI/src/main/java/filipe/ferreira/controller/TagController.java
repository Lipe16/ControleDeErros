package filipe.ferreira.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import filipe.ferreira.model.Tag;
import filipe.ferreira.service.TagService;

@RestController
@CrossOrigin(origins = "*")
public class TagController {

	@Autowired
	TagService tagService;
	
	@GetMapping(value = "/tags")
	public List<Tag> getSetores() {
		return tagService.listarTags();
	}
}
