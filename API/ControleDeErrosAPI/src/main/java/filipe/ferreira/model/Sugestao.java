package filipe.ferreira.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "sugestao")
public class Sugestao {


	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "sub_setor_id")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "programa_id")	
	private Programa programa;
	
	@ManyToOne
	@JoinColumn(name = "status_sugestao_id")	
	private Status status;
	
	@ManyToOne
	@JoinColumn(name = "solicitacao_id")	
	private Solicitacao solicitacao;
}
