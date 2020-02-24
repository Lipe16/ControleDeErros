package filipe.ferreira.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import filipe.ferreira.model.Tag;
import filipe.ferreira.repository.TagRepository;

@Service
public class TagService {
	
	@Autowired
	TagRepository tagRepository;
	
	public List<Tag> listarTags(){
		return tagRepository.findAll();
	}

}
