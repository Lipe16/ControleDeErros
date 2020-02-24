package filipe.ferreira.service;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import filipe.ferreira.dto.ErroDTO;
import filipe.ferreira.dto.ImagemErroDTO;
import filipe.ferreira.model.Cliente;
import filipe.ferreira.model.Erro;
import filipe.ferreira.model.KardexErro;
import filipe.ferreira.model.PendenteResolucao;
import filipe.ferreira.model.PrazoProgramador;
import filipe.ferreira.model.Programa;
import filipe.ferreira.model.Situacao;
import filipe.ferreira.model.Status;
import filipe.ferreira.model.SubSetor;
import filipe.ferreira.model.Tag;
import filipe.ferreira.model.Usuario;
import filipe.ferreira.repository.ErroRepository;
import filipe.ferreira.repository.PendenteResolucaoRepository;
import filipe.ferreira.repository.ProgramaRepository;
import filipe.ferreira.repository.SituacaoRepository;
import filipe.ferreira.repository.StatusRepository;

@Service
public class ErroService {
	
	@Autowired
	private ErroRepository erroRepository;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private ProgramaRepository programaRepository;
	
	@Autowired
	private StatusRepository statusRepository;
	
	@Autowired
	private LogService logServise;
	
	@Autowired
	private SituacaoRepository situacaoRepository;
	
	@Autowired
	private KardexErroService kardexErroService;
	
	@Autowired
	private PendenteResolucaoRepository pendenteResolucaoRepository;
	
	@Autowired
	private PendenteResolucaoStatusService pendenteResolucaoStatusService;

	
	public Erro  salvarErro(ErroDTO erroDTO) {	
		boolean erroNovo = false;
		Erro erro = new Erro();
		KardexErro kardex = new KardexErro();
		PendenteResolucao pendenteResolucao = new PendenteResolucao();
		
		if(erroDTO.getId() > 0) {
			erro = erroRepository.findById(erroDTO.getId()).get();
		}else {
			erroNovo = true;
			erro.setUsuarioTecnico( usuarioService.getUsuarioLogado()  );
			erro.setDataproblema(LocalDate.now());
		}
		
		erro.setSituacao(erroDTO.getSituacao());
		erro.setPrograma(programaRepository.findById(erroDTO.getProgramaId()).get());
		
		if( usuarioService.getUsuarioLogado().getPerfil().getPerfil().equals("T") &&  erro.getStatus().getStatus().equals("AGUARDANDO_TESTE") &&  erroDTO.getStatus().getStatus().equals("ANALISANDO_TESTE")) {			
			erro.setUsuarioTestador( usuarioService.getUsuarioLogado()  );
		}
		
		erro.setStatus(statusRepository.findByStatus(erroDTO.getStatus().getStatus()).get());
		
		if(erro.getStatus().getStatus().equals("ANALISANDO_TESTE")) {
			erro.setSituacao(situacaoRepository.findBySituacao('A'));
		}
		
		
		if(erro.getStatus().getStatus().equals("LIBERADO")) {
			erro.setSituacao(situacaoRepository.findBySituacao('R'));
			erro.setDataSolucao(LocalDate.now());
			pendenteResolucao.setSolucaoData(LocalDate.now());
		}
		
		if(erro.getStatus().getStatus().equals("CANCELADO")) {
			erro.setSituacao(situacaoRepository.findBySituacao('R'));
			erro.setDataSolucao(LocalDate.now());
			pendenteResolucao.setSolucaoData(LocalDate.now());
		}
		

		erro.setCliente(erroDTO.getCliente());
		erro.setSubsetor(erroDTO.getSubsetor());
		erro.setPrioridade(erroDTO.getPrioridade());
		erro.setDescricao(erroDTO.getDescricao());
		erro.setCheckListDataJson(erroDTO.getCheckListDataJson());
		erro.setVersaoCorrecao(erro.getVersaoCorrecao());
		erro.setTag(erroDTO.getTag());
		erro.setUsuarioProgramador(erro.getPrograma().getProgramadorUsuario());

		erro =  erroRepository.save(erro);
		
		
		kardex.setData(LocalDate.now());
		kardex.setErro(erro);
		kardex.setStatus(erro.getStatus());
		kardex.setUsuario(usuarioService.getUsuarioLogado());
		
		pendenteResolucao.setSolicitacaoData(LocalDate.now());
		pendenteResolucao.setUsuarioSolicitante(usuarioService.getUsuarioLogado());
		
		if(erroNovo) {
			logServise.salvarlog("erro", erro.getId(), "Criou um novo registro de erro."+ErroObjectParaStringutil(erro));
			kardex.setDescricao("Criou um novo registro de erro."+ErroObjectParaStringutil(erro));
		}else {
			
			logServise.salvarlog("erro", erro.getId(), "Atualisou registro de erro."+ErroObjectParaStringutil(erro));
			kardex.setDescricao("Atualisou registro de erro."+ErroObjectParaStringutil(erro));
		}
		
		pendenteResolucao.setUsuarioSolicitado(verificarUsuarioSolicitante(erro));
		pendenteResolucao.setPendenteResolucaoStatus( pendenteResolucaoStatusService.getStatusPorDescricao(erro.getStatus().getStatus()) );
		pendenteResolucao = pendenteResolucaoRepository.save(pendenteResolucao);
		
		kardex.setStatus(erro.getStatus());
		
		kardex.setPendenteResolucao(pendenteResolucao);

		kardexErroService.salvar(kardex);
		
		return erro;
	}
	
	
	
	public List<Erro> getErros() {
		Usuario usuario = new Usuario();
		usuario = usuarioService.getUsuarioLogado();
		
		List<Erro> erros;
		
		erros = erroRepository.findAllTecnico(usuario.getId());
		
		if(usuario.getPerfil().getPerfil().equals("A") ) {
			
			erros = erroRepository.findAllTecnico(usuario.getId());
			
		}else if(usuario.getPerfil().getPerfil().equals("T")){
			
			erros = erroRepository.findAllTestador(usuario.getId());
			
		}else if(usuario.getPerfil().getPerfil().equals("Q")) {
			
			erros = erroRepository.findAllQualidade();
			
		}else if(usuario.getPerfil().getPerfil().equals("P")) {
			
			erros = erroRepository.findAllProgramador(usuario.getId());
			
		}else if(usuario.getPerfil().getPerfil().equals("G")) {
			
			erros = erroRepository.findAllNResolvidos();
			
			
		}else {
			erros = erroRepository.findAllNResolvidos();
		}
		

		
		return ordenarPrioridade(erros);
	}
	
	
	
	private List<Erro> ordenarPrioridade(List<Erro> erros){
		
		List<Erro> auxErros = new ArrayList<>();
		
		for(int i = 0; i < erros.size(); i++) {
			if(erros.get(i).getPrioridade() == 'U') {
				auxErros.add(erros.get(i));
			}
		}
		
		for(int i = 0; i < erros.size(); i++) {
			if(erros.get(i).getPrioridade() == 'A') {
				auxErros.add(erros.get(i));
			}
		}
		
		for(int i = 0; i < erros.size(); i++) {
			if(erros.get(i).getPrioridade() == 'M') {
				auxErros.add(erros.get(i));
			}
		}
		
		for(int i = 0; i < erros.size(); i++) {
			if(erros.get(i).getPrioridade() == 'B') {
				auxErros.add(erros.get(i));
			}
		}
		
		return auxErros;
	}
	
	
	
	
	//imagens ---->
	public Boolean salvarImagem( ImagemErroDTO imagem) throws IOException {
		imagem.setCaminho(imagem.getCodErro()+"/"+(new Date()).getTime());
		base64ParaImagem(imagem.getCaminho(), imagem);
		return true;
	}
	
	
	public void base64ParaImagem(String nomeImagem, ImagemErroDTO imagem)throws IOException {
		
		String caminho = System.getProperty("user.home") + "/erros/";
		
        byte[]  imageByte = Base64.getDecoder().decode(imagem.getImg().substring(23));


		ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
		BufferedImage image = ImageIO.read(bis);
		bis.close();
		
        int new_w = 100, new_h = 100;
        BufferedImage new_img = new BufferedImage(new_w, new_h, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = new_img.createGraphics();

        File dir=new File(caminho+imagem.getCodErro());
        dir.mkdirs();
        
        g.drawImage(image, 0, 0, new_w, new_h, null);
        ImageIO.write(new_img, "JPG", new File(caminho+nomeImagem+"_pequena.jpg"));
		

		File outputfile = new File(caminho+nomeImagem+".jpg");
		ImageIO.write(image, "jpg", outputfile);
		
		logServise.salvarlog("erro", imagem.getCodErro(), "salvou print do erro.");


	}
	
	public List<String> getListarImagens(Long id) {
		String caminho = System.getProperty("user.home") + "/erros/";
		
		File f = null;
	    File[] paths;
	    List<String> lista = new ArrayList();
	      
	      try {  
	         f = new File(caminho+id);
	         paths = f.listFiles();
	         for(File path:paths) {
	            System.out.println(path);
	            lista.add(path.getName());
	         }
	         return lista;
	         
	      } catch(Exception e) {
	         System.out.println("PASTA ESTÁ APARENTEMENTE VAZIA");
	      }
	      return lista;  
	}
	
	
	String ErroObjectParaStringutil(Erro erro){
		
		String text = ",";
		text = text+ "Situação: "+erro.getSituacao().getSituacao()+";";
		text = text+ "SubSetor: "+erro.getSubsetor().getDescricao()+";";
		text = text+ "Programa: "+erro.getPrograma().getNome()+";";
		text = text+ "Status: "+erro.getStatus().getStatus()+";";
		
		System.out.println( erro.getCliente() != null ? String.valueOf(erro.getCliente().getCod()) : "sem cliente" );
		
		if(erro.getCliente() != null) {
			text = text+ "Cliente cod: "+ erro.getCliente().getCod() +";";
		}
		
		text = text+ "Prioridade: "+erro.getPrioridade()+";";
		text = text+ "Descricao: "+erro.getDescricao()+";";
		text = text+ "CheckListDataJson: "+erro.getCheckListDataJson()+";";
		text = text+ "Versão erro: "+erro.getVersaoErro()+";";
		text = text+ "Versão correção: "+erro.getVersaoCorrecao()+";";
		text = text+ "Data solução: "+erro.getDataSolucao()+";";
		text = text+ "Tag: "+erro.getTag().getTag()+";";
		
		return text;
	}
	
	Usuario verificarUsuarioSolicitante(Erro erro) {
		
		if(erro.getStatus().getStatus().equals("AGUARDANDO_TESTE")) {
			return null;
		}else if(erro.getStatus().getStatus().equals("ANALISANDO_TESTE")){
			return null;
		}else if(erro.getStatus().getStatus().equals("AGUARDANDO_PROGRAMADOR")){
			return erro.getPrograma().getProgramadorUsuario();
		}else if(erro.getStatus().getStatus().equals("ANALISANDO_PROGRAMADOR")){
			return null;
		}else if(erro.getStatus().getStatus().equals("AGUARDANDO_CONFERENCIA_TESTE")){
			return erro.getUsuarioTestador();
		}else if(erro.getStatus().getStatus().equals("ANALISANDO_CONFERENCIA_TESTE")){
			return null;
		}else if(erro.getStatus().getStatus().equals("LIBERADO_CLIENTE_TESTE")){
			return erro.getUsuarioTecnico();
		}else if(erro.getStatus().getStatus().equals("LIBERADO")){
			return null;
		}
		return null;
	}



	public Erro salvarErroQualidade(ErroDTO erroDTO) {
		
		Erro erro = new Erro();
		
		if(erroDTO.getId() > 0) {
			erro = erroRepository.findById(erroDTO.getId()).get();
		}
		erro.setQualidade(erroDTO.getQualidade());
		
		erro = erroRepository.save(erro);
		
		logServise.salvarlog("erro", erro.getId(), "Concedeu nível de qualidade ao registro."+ErroObjectParaStringutil(erro));
		
		return erro;
	}



	public List<Erro> listarLogsPorData(String dataUm, String dataDois) {
		return erroRepository.listarErrosPorData(dataUm, dataDois);
	}
	
}
