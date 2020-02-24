package filipe.ferreira.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "log")
public class Log {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "log_id")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "usuario_id", referencedColumnName = "usuario_id")
	private Usuario usuario;
	
	@Column(name = "id_tabela")
	private Long idTabela;
	
	@Column(name = "data")
	private LocalDate data;
	
	@Column(name = "log")
	private String log;
	
	@Column(name = "tabela")
	private String tabela;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Long getIdTabela() {
		return idTabela;
	}

	public void setIdTabela(Long idTabela) {
		this.idTabela = idTabela;
	}



	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public String getLog() {
		return log;
	}

	public void setLog(String log) {
		this.log = log;
	}

	public String getTabela() {
		return tabela;
	}

	public void setTabela(String tabela) {
		this.tabela = tabela;
	}
	
	
	

}
