SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `controle` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `controle` ;

-- -----------------------------------------------------
-- Table `controle`.`setor`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`setor` (
  `setor_id` INT NOT NULL AUTO_INCREMENT ,
  `descricao` VARCHAR(100) NULL ,
  PRIMARY KEY (`setor_id`) )
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`perfil`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`perfil` (
  `perfil_id` INT NOT NULL AUTO_INCREMENT ,
  `perfil` CHAR NULL COMMENT 'A = ANALISTA, T = TESTADOR, Q = QUALIDADE, P = PROGRAMADOR, G = GERENTE',
  PRIMARY KEY (`perfil_id`) )
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`usuario`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`usuario` (
  `usuario_id` INT NOT NULL AUTO_INCREMENT ,
  `perfil_id` INT NULL ,
  `nome` VARCHAR(150) NULL ,
  `email` VARCHAR(200) NULL ,
  `senha` VARCHAR(200) NULL ,
  PRIMARY KEY (`usuario_id`) ,
  INDEX `fk_usuario_perfil_idx` (`perfil_id` ASC) ,
  CONSTRAINT `fk_usuario_perfil`
    FOREIGN KEY (`perfil_id` )
    REFERENCES `controle`.`perfil` (`perfil_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM;



-- -----------------------------------------------------
-- Table `controle`.`prazo_programador`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`prazo_programador` (
  `prazo_programa_id` INT NOT NULL AUTO_INCREMENT ,
  `setor_id` INT NULL ,
  `adm_usuario_id` INT NULL ,
  `data_criacao` DATE NULL ,
  `data_previsao_inicio` DATE NULL ,
  `data_previsao_fim` DATE NULL ,
  `data_limite` DATE NULL ,
  `observacao` VARCHAR(255) NULL ,
  PRIMARY KEY (`prazo_programa_id`) ,
  INDEX `fk_prazo_programador_adm_usuario_idx` (`adm_usuario_id` ASC) ,
  CONSTRAINT `fk_prazo_programador_adm_usuario`
    FOREIGN KEY (`adm_usuario_id` )
    REFERENCES `controle`.`usuario` (`usuario_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`programa`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`programa` (
  `programa_id` INT NOT NULL AUTO_INCREMENT ,
  `setor_id` INT NULL ,
  `programador_usuario_id` INT NULL ,
  `nome` VARCHAR(255) NULL ,
  `checklist_modelo_id` INT NULL ,
  PRIMARY KEY (`programa_id`) ,
  INDEX `fk_programador_usuario_idx` (`programador_usuario_id` ASC) ,
  CONSTRAINT `fk_programador_usuario`
    FOREIGN KEY (`programador_usuario_id` )
    REFERENCES `controle`.`usuario` (`usuario_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
CONSTRAINT `fk_sub_setor_checklist_modelo`
    FOREIGN KEY (`checklist_modelo_id` )
    REFERENCES `controle`.`checklist_modelo` (`checklist_modelo_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`situacao`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`situacao` (
  `situacao_id` INT NOT NULL AUTO_INCREMENT ,
  `situacao` CHAR NULL COMMENT 'P = PENDENTE, A = ANALISANDO, R = RESOLVIDO',
  PRIMARY KEY (`situacao_id`) )
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`status`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`status` (
  `status_id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(150) NULL ,
  PRIMARY KEY (`status_id`) )
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`cliente`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`cliente` (
  `cliente_id` INT NOT NULL AUTO_INCREMENT ,
  `cod` INT NULL ,
  `rede` VARCHAR(150) NULL ,
  `descricao` VARCHAR(150) NULL ,
  PRIMARY KEY (`cliente_id`) )
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`checklist_modelo`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`checklist_modelo` (
  `checklist_modelo_id` INT NOT NULL AUTO_INCREMENT,
  `data_modelo_json` TEXT NULL ,
  PRIMARY KEY (`checklist_modelo_id`) )
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`sub_setor`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`sub_setor` (
  `sub_setor_id` INT NOT NULL AUTO_INCREMENT ,

  `descricao` VARCHAR(150) NULL ,
  `setor_id` INT NOT NULL,
  PRIMARY KEY (`sub_setor_id`) ,
  CONSTRAINT `fk_sub_setor_setor`
    FOREIGN KEY (`setor_id` )
    REFERENCES `controle`.`setor` (`setor_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM;

-- -----------------------------------------------------
-- Table `controle`.`sub_setor_programa`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`sub_setor_programa` (
  `sub_setor_id` INT NOT NULL,
  `programa_id` INT NOT NULL,
CONSTRAINT `sub_setor_programa__sub_setor_id`
    FOREIGN KEY (`sub_setor_id` )
    REFERENCES `controle`.`sub_setor` (`sub_setor_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
CONSTRAINT `sub_setor_programa__programa_id`
    FOREIGN KEY (`programa_id` )
    REFERENCES `controle`.`programa` (`programa_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`pendente_resolucao_status`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`pendente_resolucao_status` (
  `pendente_resolucao_status_id` INT NOT NULL AUTO_INCREMENT,
  `status` TEXT NULL ,
  PRIMARY KEY (`pendente_resolucao_status_id`) )
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`pendente_resolucao`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`pendente_resolucao` (
  `pendente_resolucao_id` INT NOT NULL AUTO_INCREMENT,
  `solicitante_usuario_id` INT NULL ,
  `solicitado_usuario_id` INT NULL ,
  `solicitacao_data` DATE NULL ,
  `solucao_data` DATE NULL ,
  `status_id` INT NULL ,
  `pendente_resolucao_status_id` INT,
  PRIMARY KEY (`pendente_resolucao_id`) ,
  CONSTRAINT `fk_pendente_resolucao_status`
    FOREIGN KEY (`status_id` )
    REFERENCES `controle`.`status` (`status_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION, 
  CONSTRAINT `fk_pendente_resolucao_pendente_resolucao_status`
    FOREIGN KEY (`pendente_resolucao_status_id` )
    REFERENCES `controle`.`pendente_resolucao_status` (`pendente_resolucao_status_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`kardex_erro`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`kardex_erro` (
  `kardex_erro_id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NULL ,
  `data` DATE NULL ,
  `status_id` INT NULL ,
  `descricao` TEXT NULL ,
  `pendente_resolucao_id` INT NULL ,
  `erro_id` INT NULL ,	
  PRIMARY KEY (`kardex_erro_id`) ,
  INDEX `fk_kardex_erro_pendente_resolucao_idx` (`pendente_resolucao_id` ASC) ,
  CONSTRAINT `fk_kardex_erro_pendente_resolucao`
    FOREIGN KEY (`pendente_resolucao_id` )
    REFERENCES `controle`.`pendente_resolucao` (`pendente_resolucao_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_kardex_erro_erro`
    FOREIGN KEY (`erro_id` )
    REFERENCES `controle`.`erro` (`erro_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`tag`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`tag` (
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `tag` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`tag_id`) )
ENGINE = MyISAM;



-- -----------------------------------------------------
-- Table `controle`.`erro`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`erro` (
  `erro_id` INT NOT NULL AUTO_INCREMENT ,
  `qualidade` INT NULL COMMENT 'valor de 1 a 5, sendo 5 o maior nível de qualidade',
  `situacao_id` INT NULL ,
  `programa_id` INT NULL ,
  `usuario_tecnico_id` INT NULL ,
  `usuario_testador_id` INT NULL ,
  `usuario_programador_id` INT NULL ,
  `usuario_qualidate_id` INT NULL ,
  `prazo_programador_id` INT NULL ,
  `status_id` INT NULL ,
  `cliente_id` INT NULL ,
  `sub_setor_id` INT NULL ,
  `prioridade` CHAR NULL COMMENT 'B = BAIXO, M = MÉDIO, A = ALTA, U = URGENTE',
  `descricao` TEXT NULL ,
  `data_problema` DATE NULL ,
  `checklist_data_json` TEXT NULL ,
  `versao_erro` VARCHAR(100) NULL ,
  `versao_correcao` VARCHAR(100) NULL ,
  `data_solucao` DATE NULL ,
  `tag_id` INT ,
  PRIMARY KEY (`erro_id`) ,
  CONSTRAINT `fk_tecnico_usuario`
    FOREIGN KEY (`usuario_tecnico_id` )
    REFERENCES `controle`.`usuario` (`usuario_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_erro_prazo_programador`
    FOREIGN KEY (`prazo_programador_id` )
    REFERENCES `controle`.`prazo_programador` (`prazo_programa_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_erro_programa`
    FOREIGN KEY (`programa_id` )
    REFERENCES `controle`.`programa` (`programa_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_erro_situacao`
    FOREIGN KEY (`situacao_id` )
    REFERENCES `controle`.`situacao` (`situacao_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_erro_status`
    FOREIGN KEY (`status_id` )
    REFERENCES `controle`.`status` (`status_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_erro_cliente`
    FOREIGN KEY (`cliente_id` )
    REFERENCES `controle`.`cliente` (`cliente_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_programador_usuario`
    FOREIGN KEY (`usuario_programador_id` )
    REFERENCES `controle`.`usuario` (`usuario_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_testador_usuario`
    FOREIGN KEY (`usuario_testador_id`)
    REFERENCES `controle`.`usuario` (`usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_qualidade_usuario`
    FOREIGN KEY (`usuario_qualidate_id` )
    REFERENCES `controle`.`usuario` (`usuario_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_erro_sub_setor`
    FOREIGN KEY (`sub_setor_id` )
    REFERENCES `controle`.`sub_setor` (`sub_setor_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_erro_tag`
    FOREIGN KEY (`tag_id` )
    REFERENCES `controle`.`tag` (`tag_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`log`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`log` (
  `log_id` INT NOT NULL AUTO_INCREMENT ,
  `usuario_id` INT NULL ,
  `id_tabela` INT NULL ,
  `tabela` VARCHAR(60) NULL ,
  `data` DATE NULL ,
  `log` TEXT NULL ,
  PRIMARY KEY (`log_id`) ,
  INDEX `fk_usuario_log_idx` (`usuario_id` ASC) ,
  CONSTRAINT `fk_usuario_log`
    FOREIGN KEY (`usuario_id` )
    REFERENCES `controle`.`usuario` (`usuario_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`status_sugestao`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`status_sugestao` (
  `status_sugestao_id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(100) NULL ,
  PRIMARY KEY (`status_sugestao_id`) )
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`solicitacao`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`solicitacao` (
  `solicitacao_id` INT NOT NULL ,
  `descricao` TEXT NULL ,
  `usuario_tecnico_id` INT NULL ,
  `data` DATE NULL ,
  PRIMARY KEY (`solicitacao_id`) )
ENGINE = MyISAM;


-- -----------------------------------------------------
-- Table `controle`.`sugestao`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `controle`.`sugestao` (
  `sugestao_id` INT NOT NULL AUTO_INCREMENT ,
  `programa_id` INT NULL ,
  `status_sugestao_id` INT NULL ,
  `solicitacao_id` INT NULL ,
  PRIMARY KEY (`sugestao_id`) ,
  INDEX `fk_sugestao_1solicitacao_idx` (`solicitacao_id` ASC) ,
  CONSTRAINT `fk_sugestao_status_sugestao`
    FOREIGN KEY (`status_sugestao_id`)
    REFERENCES `controle`.`status_sugestao` (`status_sugestao_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sugestao_1solicitacao`
    FOREIGN KEY (`solicitacao_id` )
    REFERENCES `controle`.`solicitacao` (`solicitacao_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sugestao_programa`
    FOREIGN KEY (`programa_id`)
    REFERENCES `controle`.`programa` (`programa_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM;

USE `controle` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



