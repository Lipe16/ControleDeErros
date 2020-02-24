import React from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Calendar} from 'primereact/calendar';
import {Editor} from 'primereact/editor';
import {SelectButton} from 'primereact/selectbutton';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';



import {getSetores } from '../../servicos/setor';

import {getSubSetores } from '../../servicos/subSetor';

import {getProgramas } from '../../servicos/programa';
import {UsuarioLogado} from '../../servicos/usuario';
import {getTags} from '../../servicos/tag';
import {getClientes} from '../../servicos/cliente';


import {StringDateParse} from '../../util/date_util';




class ModalErros extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            usuarioLogado: {id: 1, nome: "AUX TESTE", perfil: {id:0, perfil: 'A'}, email: "auxteste@teste.com"},
            id: 0,
            checkListDataJson: [],
            cliente: null,
            dataSolucao: null,
            dataproblema: new Date(),
            descricao: "",
            prazoProgramador: null,
            prioridade: 'B',
            programa: [],
            situacao: {id: 1, situacao: "PEDENTE"},
            status: {id: 1, status: "AGUARDANDO_TESTE"},
            subsetor: null,
            tag: null,
            setor: null,
            setores:null,
            subsetores:null,
            programas: null,
            listaStatus:[],
            tags:[],
            auxCheckListJson:[],
            auxCod: 0,
            clientes: [],

            heigth: 300,
            bloquearbotaoSalvar: true
        };
    }

    visible = false;
    aptoParaSalvar = true;



    



    limparDados(){
        this.props.limparErroSelecionado();
        this.setState({
            usuarioLogado: {id: 1, nome: "AUX TESTE", perfil: {id:0, perfil: 'A'}, email: "auxteste@teste.com"},
            id: 0,
            checkListDataJson: [],
            cliente: null,
            dataSolucao: null,
            dataproblema: new Date(),
            descricao: "",
            prazoProgramador: null,
            prioridade: 'B',
            programa: [],
            situacao: {id: 1, situacao: "PEDENTE"},
            status: [],
        
            subsetor: null,
            tag: null,
            setor: null,
            setores:null,
            subsetores:null,
            programas: null,
            listaStatus:[],

            tags:[],
            auxCheckListJson:[],
            auxCod: 0,
            clientes: [],

        },()=>{
                    
        this.popularStatus();
        this.carregarListaDeSetores();
        this.CarregarUsuarioLogado();
        this.carregarTags();
        });
    }


    prioridades = [
        {label: 'BAIXA', value: 'B'},
        {label: 'MÉDIA', value: 'M'},
        {label: 'ALTA', value: 'A'},
        {label: 'URGENTE', value: 'U'}
    ];

    status = [];

    popularStatus(){
  
        if(this.state.usuarioLogado.perfil.perfil === 'G'){
            this.status = [
                {label: 'AGUARDANDO (Tester)', value: 'AGUARDANDO_TESTE'},
                {label: 'ANALISANDO (Tester)', value: 'ANALISANDO_TESTE'},
                {label: 'AGUARDANDO (Programador)', value: 'AGUARDANDO_PROGRAMADOR'},
                {label: 'ANALISANDO (Programador)', value: 'ANALISANDO_PROGRAMADOR'},
                {label: 'AGUARDANDO (Tester 2º)', value: 'AGUARDANDO_CONFERENCIA_TESTE'},
                {label: 'ANALISANDO (Tester 2º)', value: 'ANALISANDO_CONFERENCIA_TESTE'},
                {label: 'AGUARDANDO (Analista)', value: 'LIBERADO_CLIENTE_TESTE'},
                {label: 'LIBERADO (Analista)', value: 'LIBERADO'}
            ];
        }else if(this.state.usuarioLogado.perfil.perfil === 'Q'){
            this.status = [
                {label: 'AGUARDANDO (Tester)', value: 'AGUARDANDO_TESTE'},
                {label: 'ANALISANDO (Tester)', value: 'ANALISANDO_TESTE'},
                {label: 'AGUARDANDO (Programador)', value: 'AGUARDANDO_PROGRAMADOR'},
                {label: 'ANALISANDO (Programador)', value: 'ANALISANDO_PROGRAMADOR'},
                {label: 'AGUARDANDO (Tester 2º)', value: 'AGUARDANDO_CONFERENCIA_TESTE'},
                {label: 'ANALISANDO (Tester 2º)', value: 'ANALISANDO_CONFERENCIA_TESTE'},
                {label: 'AGUARDANDO (Analista)', value: 'LIBERADO_CLIENTE_TESTE'},
                {label: 'LIBERADO (Analista)', value: 'LIBERADO'}
            ];
        }else if(this.state.usuarioLogado.perfil.perfil === 'P'){
        
                this.status = [
                    {label: 'ANALISAR', value: 'ANALISANDO_PROGRAMADOR'},
                    {label: 'DEVOLVER TESTER', value: 'AGUARDANDO_CONFERENCIA_TESTE'}
                ];
            
        }else if(this.state.usuarioLogado.perfil.perfil === 'T'){

            if(this.state.status.status === 'AGUARDANDO_TESTE'){
                this.status = [
                    {label: 'ANALISAR', value: 'ANALISANDO_TESTE'},
                    {label: 'ENVIAR PROGRAMACAO', value: 'AGUARDANDO_PROGRAMADOR'}
                ];
            }else if(this.state.status.status === 'AGUARDANDO_CONFERENCIA_TESTE' || this.state.status.status ===  'ANALISANDO_CONFERENCIA_TESTE'){
                this.status = [
                    {label: 'REANALISAR', value: 'ANALISANDO_CONFERENCIA_TESTE'},
                    {label: 'DEVOLVER PARA ANALISTA', value: 'LIBERADO_CLIENTE_TESTE'},
                ];
            }

        }else if(this.state.usuarioLogado.perfil.perfil === 'A'){

            if(this.state.status.status !== undefined)
                if(this.state.status.status === 'LIBERADO_CLIENTE_TESTE'){
                    this.status = [
                        {label: 'ANALISAR', value: 'LIBERADO_CLIENTE_TESTE'},
                        {label: 'LIBERAR (Resolvido)', value: 'LIBERADO'}
                    ];
                }
        }
        this.setState({listaStatus: this.status});
    }

    atualizarStateChecklist(i, value){
        let aux = this.state.auxCheckListJson;
        aux[i].value = value;
        this.setState({auxCheckListJson: aux});
    }

    auxJson = "";
    renderCheckList = () =>{
        
        
        if(this.auxJson !== null && this.auxJson !== '' && this.auxJson !== undefined){

            return this.state.auxCheckListJson.map((aux, i)=>{
                               
                if(aux.tipo === 'int'){
                    return <div  key={i}> <span style={{marginTop: 20, display: 'block'}}> <label style={{ display: 'block'}} >{this.state.auxCheckListJson[i].nome}</label> <InputText disabled={true} type="number"  value={ this.state.auxCheckListJson[i].value}  onChange={(e) =>{this.atualizarStateChecklist(i, e.target.value);}}   /></span></div> ;
                }else if(aux.tipo === 'String'){
                    return <div  key={i}> <span style={{marginTop: 20, display: 'block'}}> <label style={{ display: 'block'}} >{this.state.auxCheckListJson[i].nome}</label> <InputText  disabled={true} value={ this.state.auxCheckListJson[i].value } onChange={(e) =>{this.atualizarStateChecklist(i, e.target.value); }}  /></span></div> ;
                }else if(aux.tipo === 'boolean'){
                    return <div  key={i}> <span style={{marginTop: 20, display: 'block'}}> <label style={{ display: 'block'}} >{this.state.auxCheckListJson[i].nome}</label> <Checkbox  disabled={true} checked={this.state.auxCheckListJson[i].value } onChange={(e) =>{this.atualizarStateChecklist(i, e.checked); }} /></span></div> ;
                }else if(aux.tipo === 'float'){
                   return <div  key={i}>  <span style={{marginTop: 20, display: 'block'}}> <label style={{ display: 'block'}} >{this.state.auxCheckListJson[i].nome}</label> <InputText disabled={true}  type="number"  value={this.state.auxCheckListJson[i].value } onChange={(e) =>{this.atualizarStateChecklist(i, e.target.value); }} /></span></div> ;
                }
            });
        }
    }



    alterarStatus(status){
        this.setState({status: {id: 0, status: status} });
    }

    componentWillReceiveProps(nextProps){
        
        this.visible = nextProps.modalVisible;

        if(nextProps.modalVisible !== this.props.modalVisible && nextProps.erro !== []  && nextProps.erro.id !== undefined && nextProps.erro.id !== 0  ){
            this.carregarListaDeSetores();
            this.carregarTags();
            

            this.visible = true;

            let erroSelecionado = nextProps.erro;


            this.auxJson = erroSelecionado.checkListDataJson !== '' && erroSelecionado.checkListDataJson !== null && erroSelecionado.checkListDataJson !== undefined ? JSON.parse(erroSelecionado.checkListDataJson) : [] ;

            this.setState({
                auxCheckListJson: erroSelecionado.checkListDataJson !== '' && erroSelecionado.checkListDataJson !== null && erroSelecionado.checkListDataJson !== undefined ? JSON.parse(erroSelecionado.checkListDataJson) : [] ,
                id: erroSelecionado.id,
                checkListDataJson: erroSelecionado.checkListDataJson,
                cliente: erroSelecionado.cliente !== undefined && erroSelecionado.cliente !== null ?  erroSelecionado.cliente :null,
                auxCod: erroSelecionado.cliente !== undefined && erroSelecionado.cliente !== null ?  erroSelecionado.cliente.cod : 0,
                dataSolucao: erroSelecionado.dataSolucao !== null ? StringDateParse(erroSelecionado.dataSolucao) : null,
                dataproblema: erroSelecionado.dataproblema !== null ? StringDateParse(erroSelecionado.dataproblema) : null,
                descricao: erroSelecionado.descricao,
                prazoProgramador: erroSelecionado.prazoProgramador !== undefined && erroSelecionado.prazoProgramador !== null ? erroSelecionado.prazoProgramador : [],
                prioridade: erroSelecionado.prioridade,
                programa: erroSelecionado.programa !== undefined && erroSelecionado.programa !== null ? erroSelecionado.programa : [],
                situacao: erroSelecionado.situacao !== undefined && erroSelecionado.situacao !== null ? {id: erroSelecionado.situacao.id, situacao: erroSelecionado.situacao.situacao} : [],
                status: erroSelecionado.status !== undefined && erroSelecionado.status !== null ? {id: erroSelecionado.status.id, status: erroSelecionado.status.status} : {id: 1, status: "AGUARDANDO_TESTE"},
                
                subsetor: erroSelecionado.subsetor !== undefined && erroSelecionado.subsetor !== null ? erroSelecionado.subsetor : [],
                
                tag: erroSelecionado.tag !== undefined && erroSelecionado.tag !== null ? erroSelecionado.tag: "",

                setor: erroSelecionado.subsetor.setor !== undefined && erroSelecionado.subsetor !== null ? erroSelecionado.subsetor.setor  : []
            },()=>{                
                    this.carregarListaDeSubSetores(erroSelecionado.subsetor.setor.id);
                    this.carregarlistaDeprogramas(erroSelecionado.subsetor.id);
                    this.carregarClientes();
                    this.popularStatus();
                 
            });
        }
      }

        
    componentDidMount() {
        
        this.setState({heigth: window.innerHeight - 50});
        
        this.popularStatus();
        this.carregarListaDeSetores();
        this.CarregarUsuarioLogado();
        this.carregarTags();    
    }

    carregarClientes(){
        getClientes(this.state.auxCod).then((data)=>{
                this.setState({clientes: data});
        });
    }

    carregarTags(){
        getTags().then((data4)=>{  
            this.setState({tags: data4})
        })     
    }

    carregarlistaDeprogramas(id){
        getProgramas(id).then((data3)=>{
            this.setState({programas: data3})
        })
    }

    carregarChecklist(data){


        if(this.state.checkListDataJson === '' || this.state.checkListDataJson === null || this.state.checkListDataJson.length === 0 ){
           
            this.auxJson  = data.checklistModelo !== '' && data.checklistModelo !== null ? JSON.parse(data.checklistModelo.dataModeloJson) : [];
            this.setState({auxCheckListJson: data.checklistModelo !== '' && data.checklistModelo !== null ? JSON.parse(data.checklistModelo.dataModeloJson) : []});

        }else{
            if(this.state.checkListDataJson !== null && this.state.checkListDataJson.length > 0)
                this.setState({auxCheckListJson: this.state.checkListDataJson });
        }
    }

    carregarListaDeSubSetores(id){
        
        getSubSetores(id).then((data2)=>{
          
            this.setState({subsetores: data2})

        });
        
    }

    CarregarUsuarioLogado(){
        UsuarioLogado().then((auxUsuario)=>{
            this.setState({usuarioLogado:auxUsuario}, ()=>{this.popularStatus();});
        });
    }

    carregarListaDeSetores(){
        getSetores().then((data)=>{
            this.setState({setores: data});
        });
    }

    headerEditor = (
        <span  className="ql-formats" style={{width: '80%'}}>
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
        </span>
    );



    render(){

        return (
            <Dialog responsive={true} style={{width: window.innerWidth < 800 ? '100vw': '50vw', minHeight: this.state.heigth - 80 }}
                    header="Usuario(Modo leitura)" visible={this.visible}
                    modal={true} onHide={() => {this.props.fecharModal(); this.limparDados();} }>  

                <div style={{maxHeight: window.innerHeight - 140, overflowY:'scroll', minHeight: this.state.heigth - 140}}>

                    <span style={{marginTop: 15, display: 'block' }}>
                        <label style={{ marginTop: 5, display: 'block' }}>Pesquisar e selecionar cliente</label>
                        <InputText disabled={true} style={{marginTop: 5, display: 'block' }} value={this.state.auxCod}  onChange={(e) => { this.setState({auxCod: e.target.value}); this.carregarClientes()} }   />
                        <Dropdown disabled={true} style={{marginTop: 5, marginBottom:20 }} optionLabel="descricao"  value={this.state.cliente} options={this.state.clientes} onChange={(e) => {  this.setState({cliente: e.value }); } } placeholder="Selecione um cliente"/>
                        
                    </span > 


                    <span  style={{marginTop: 25}}>
                        <label  style={{ display: 'block'}}>Descricao</label>
                        <div style={{width: '90%'}}>
                            <Editor readOnly style={{height: '200px'}} id="descricao"  value={this.state.descricao !== undefined && this.state.descricao !== null ? this.state.descricao : ""}  onTextChange={ (e) => {this.setState({descricao: e.htmlValue}); } }  headerTemplate={this.headerEditor}/>
                        </div>
                    </span> 

                    <div >
                        <label  style={{ display: 'block'}}>Prioridade</label>
                        <SelectButton disabled={true}
                                    value={this.state.prioridade !== null ? this.state.prioridade : null  } onChange={(e) => {this.setState({prioridade: e.target.value});}}
                                    options={this.prioridades} >
                        </SelectButton>
                    </div>

                    <hr />

                    <span style={{marginTop: 25}}>   
                        <label  style={{ display: 'block'}}>Setor</label>
                        <Dropdown disabled={true} optionLabel="descricao"  value={this.state.setor} options={this.state.setores} onChange={(e) => { this.carregarListaDeSubSetores(e.value.id);  this.setState({setor: e.value, programa: [], programas: [], subsetor: [], auxCheckListJson: [] }); this.auxJson  =  []; } } placeholder="Selecione um setor"/>
           
                    </span> 

                    <span  style={{marginTop: 25}}>
                        <label  style={{ display: 'block'}} >Subsetor</label>
                        <Dropdown disabled={true} optionLabel="descricao"  value={this.state.subsetor} options={this.state.subsetores} onChange={(e) => {  this.setState({subsetor: e.value }); this.carregarlistaDeprogramas(e.value.id); } } placeholder="Selecione um subsetor"/>
                    </span> 


                    <span style={{marginTop: 20}}>
                        <label  style={{ display: 'block'}} >Programa</label>
                        <Dropdown disabled={true} optionLabel="nome"  value={this.state.programa} options={this.state.programas} onChange={(e) => { this.setState({programa: e.value }) ; this.carregarChecklist(e.value)} } placeholder="Selecione um Programa"/>

                    </span> 
                    <hr />

                    <span  style={{marginTop: 20,  display: 'block' }}>
                        <label  style={{ display: 'block'}} >Tag</label>
                        <Dropdown disabled={true} optionLabel="tag" value={this.state.tag  } options={this.state.tags} onChange={(e) => {this.setState({tag: e.value})}} placeholder="Selecione uma tag"/>
                    </span>
                    
                     
                    <hr />
                    <span><h5>Checklist:</h5></span>
                        
                    
                        {  this.state.auxCheckListJson !== '' && this.state.auxCheckListJson !== null && this.state.auxCheckListJson !== [] ?  this.renderCheckList() : null}

                    <hr />


                    <span style={{marginTop: 20, display: 'block'}}>
                        <label style={{ display: 'block'}} >Data problema</label>
                        <Calendar disabled={true}  readOnlyInput dateFormat="dd/mm/yy" id="dataproblema" value={this.state.dataproblema !== undefined && this.state.dataproblema !== null ? new Date(this.state.dataproblema) : ""} onChange={(e) => this.setState({dataproblema: e.value})}></Calendar>
                    </span> 

                    <span  style={{marginTop: 20,  display: 'block'}}>
                        <label  style={{ display: 'block'}}>Data solucao</label>
                        <Calendar disabled={true}  readOnly readOnlyInput dateFormat="dd/mm/yy" id="dataSolucao" value={this.state.dataSolucao !== undefined && this.state.dataSolucao !== null ? new Date(this.state.dataSolucao) : ""} onChange={(e) => this.setState({dataSolucao: e.value})}></Calendar>   
                    </span> 

                    <span  style={{marginTop: 20, marginBottom: 15, display: 'block'}}>
                        <label  style={{ display: 'block'}} >Status</label><br/>
                        {this.state.listaStatus.length === 0 ? <Button label={this.state.status.status} /> : null}
                        <SelectButton disabled={true}
                                    value={this.state.status.status !== undefined ? this.state.status.status  : null  } onChange={(e) => {this.alterarStatus(e.target.value) ; }}
                                    options={this.state.listaStatus} >
                        </SelectButton>
                    </span> 

                </div>
            </Dialog>
        );
    }
}

export default ModalErros;