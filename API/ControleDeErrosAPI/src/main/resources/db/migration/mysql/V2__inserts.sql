-- -----------------------------------------------------
-- inserindo setores
-- -----------------------------------------------------
insert into setor(descricao) values('FRONT-END');
insert into setor(descricao) values('BACK-END');
insert into setor(descricao) values('MOBILE');

-- -----------------------------------------------------
-- Inserindo Perfis 
-- -----------------------------------------------------
insert into perfil(perfil) values('A');
insert into perfil(perfil) values('T');
insert into perfil(perfil) values('Q');
insert into perfil(perfil) values('P');
insert into perfil(perfil) values('G');

-- -----------------------------------------------------
-- inserindo Usuarios
-- -----------------------------------------------------
insert into usuario(perfil_id,nome,email,senha) values(5,'Usuario ADM', 'adm@teste.com', '$2a$10$P3QzLRmACqmw5.0hstuaGOA/g/5uk03Dw7z6LJRBbGEIIYBAe7MA6');
insert into usuario(perfil_id,nome,email,senha) values(4,'Usuario Programador', 'programador@teste.com', '$2a$10$P3QzLRmACqmw5.0hstuaGOA/g/5uk03Dw7z6LJRBbGEIIYBAe7MA6');
insert into usuario(perfil_id,nome,email,senha) values(3,'Usuario qualidade', 'qualidade@teste.com', '$2a$10$P3QzLRmACqmw5.0hstuaGOA/g/5uk03Dw7z6LJRBbGEIIYBAe7MA6');
insert into usuario(perfil_id,nome,email,senha) values(2,'Usuario Testador', 'testador@teste.com', '$2a$10$P3QzLRmACqmw5.0hstuaGOA/g/5uk03Dw7z6LJRBbGEIIYBAe7MA6');
insert into usuario(perfil_id,nome,email,senha) values(1,'Usuario Analista', 'analista@teste.com', '$2a$10$P3QzLRmACqmw5.0hstuaGOA/g/5uk03Dw7z6LJRBbGEIIYBAe7MA6');






-- -----------------------------------------------------
-- inserindo situações 
-- -----------------------------------------------------
insert into situacao(situacao) values('P');
insert into situacao(situacao) values('A');
insert into situacao(situacao) values('R');

-- -----------------------------------------------------
-- inserindo STATUS
-- -----------------------------------------------------
insert into status (status) values ('AGUARDANDO_TESTE');
insert into status (status) values ('ANALISANDO_TESTE');
insert into status (status) values ('AGUARDANDO_PROGRAMADOR');
insert into status (status) values ('ANALISANDO_PROGRAMADOR');
insert into status (status) values ('AGUARDANDO_CONFERENCIA_TESTE');
insert into status (status) values ('ANALISANDO_CONFERENCIA_TESTE');
insert into status (status) values ('LIBERADO_CLIENTE_TESTE');
insert into status (status) values ('LIBERADO');
insert into status (status) values ('CANCELADO');

-- -----------------------------------------------------
-- inserindo CLIENTE teste
-- -----------------------------------------------------
insert into cliente(cod, rede, descricao) values (123, 'restaurante Don Pedro', 'restaurante Don Pedro');
insert into cliente(cod, rede, descricao) values (124, 'Posto 200', 'posto bom filho');


-- -----------------------------------------------------
-- inserindo sub_Setor
-- -----------------------------------------------------
insert into sub_setor(setor_id,  descricao ) values(2,'CONTAS');
insert into sub_setor(setor_id,  descricao ) values(2,'PAGAMENTOS');
insert into sub_setor(setor_id,  descricao ) values(1,'VENDAS');
insert into sub_setor(setor_id,  descricao ) values(2,'VENDAS');
insert into sub_setor(setor_id,  descricao ) values(3,'VENDAS');
insert into sub_setor(setor_id,  descricao ) values(3,'LOGIN');




-- -----------------------------------------------------
-- inserindo pendente_resolucao_status
-- -----------------------------------------------------
insert into pendente_resolucao_status (status) values ('AGUARDANDO_TESTE');
insert into pendente_resolucao_status (status) values ('ANALISANDO_TESTE');
insert into pendente_resolucao_status (status) values ('AGUARDANDO_PROGRAMADOR');
insert into pendente_resolucao_status (status) values ('ANALISANDO_PROGRAMADOR');
insert into pendente_resolucao_status (status) values ('AGUARDANDO_CONFERENCIA_TESTE');
insert into pendente_resolucao_status (status) values ('ANALISANDO_CONFERENCIA_TESTE');
insert into pendente_resolucao_status (status) values ('LIBERADO_CLIENTE_TESTE');
insert into pendente_resolucao_status (status) values ('LIBERADO');
insert into pendente_resolucao_status (status) values ('CANCELADO');

-- -----------------------------------------------------
-- inserindo tag
-- -----------------------------------------------------
insert into tag(tag) values('Recorrente');
insert into tag(tag) values('ClienteNovo');
insert into tag(tag) values('TesteErro');


