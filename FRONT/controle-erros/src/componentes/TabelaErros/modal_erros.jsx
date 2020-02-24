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
import {salvarErro} from '../../servicos/erros';

import {StringDateParse} from '../../util/date_util';
import {DateParseString} from '../../util/date_util';

import {ListarStatus} from './Util/status';

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
            auxCod: '',
            clientes: [],

            heigth: 300,
            bloquearbotaoSalvar: true,
            bloquearBTNSalvar: false
        };
    }

    visible = false;
    aptoParaSalvar = true;

    VerificarChecklist = async (dataObject)=>{
        var promises =  dataObject.auxCheckListJson.map((aux, i)=>{
            

            if(aux.tipo === 'int'){
                this.aptoParaSalvar = aux.value === 0 || aux.value === '' ? false: this.aptoParaSalvar;
            
            }else if(aux.tipo === 'String'){
                this.aptoParaSalvar = aux.value === null || aux.value === '' ? false : this.aptoParaSalvar; 
               
            }else if(aux.tipo === 'boolean'){
                this.aptoParaSalvar = aux.value === null || aux.value === '' ? false : this.aptoParaSalvar;
            
            }else if(aux.tipo === 'float'){
                this.aptoParaSalvar = aux.value === 0 || aux.value === '' ? false : this.aptoParaSalvar;
              
            }

            if(aux.value === 0 || aux.value === '' || aux.value === null || aux.value === undefined){
                this.props.mensagem('error', 'Erro', 'problemas na hora de salvar, Checklist '+aux.nome+' '+aux.value);
            }
        });

       return await Promise.all(promises);
    }

    
    salvarDados =  ()=>{
        this.setState({bloquearBTNSalvar: true});
        this.aptoParaSalvar = true;
        let dataObject = {
            id : this.state.id,
            checkListDataJson : this.state.checkListDataJson,
            cliente  : this.state.cliente,
            dataSolucao :this.state.dataSolucao,
            dataproblema  : this.state.dataproblema,
            descricao : this.state.descricao,
            prioridade : this.state.prioridade,
            programaId : this.state.programa.id,
            situacao : this.state.situacao,
            status : this.state.status,
            subsetor : this.state.subsetor,
            tag : this.state.tag,
            setor : this.state.setor,
            auxCheckListJson : this.state.auxCheckListJson  
        }
        
        this.VerificarChecklist(dataObject).then(()=>{ 
            
                dataObject.checkListDataJson = JSON.stringify(dataObject.auxCheckListJson);

                if(dataObject.descricao === '' ||  dataObject.descricao === null  ){
                    this.aptoParaSalvar = false; 
                    this.props.mensagem('error', 'Erro', 'problemas na hora de salvar, campo descricao');
                }
                if(dataObject.prioridade === '' ||  dataObject.prioridade === null  ){
                    this.aptoParaSalvar = false; 
                    this.props.mensagem('error', 'Erro', 'problemas na hora de salvar, campo prioridade');
                }
                if(dataObject.programaId === '' ||  dataObject.programaId === null || dataObject.programaId === undefined ){
                    this.aptoParaSalvar = false;
                    this.props.mensagem('error', 'Erro', 'problemas na hora de salvar, campo programa');
                }
                if(dataObject.situacao === '' ||  dataObject.situacao === null && dataObject.situacao === undefined ){
                    this.aptoParaSalvar = false; 
                    this.props.mensagem('error', 'Erro', 'problemas na hora de salvar, campo situacao');
                }
                if(dataObject.status === '' || dataObject.status === null || dataObject.status === undefined){
                    this.aptoParaSalvar = false; 
                    this.props.mensagem('error', 'Erro', 'problemas na hora de salvar, campo status');
                }
                if(dataObject.subsetor === '' ||  dataObject.subsetor === null || dataObject.subsetor === undefined ){
                    this.aptoParaSalvar = false; 
                    this.props.mensagem('error', 'Erro', 'problemas na hora de salvar, campo subsetor');
                }
                if(dataObject.tag === '' || dataObject.tag === null || dataObject.tag === undefined ){
                    this.aptoParaSalvar = false; 
                    this.props.mensagem('error', 'Erro', 'problemas na hora de salvar, campo tag');
                }
                if(dataObject.setor === '' || dataObject.setor === null && dataObject.setor === undefined ){
                    this.aptoParaSalvar = false; 
                    this.props.mensagem('error', 'Erro', 'problemas na hora de salvar, campo setor');
                }
                
        
                if(this.aptoParaSalvar){
                   
                    salvarErro(dataObject).then((data)=>{
                        this.setState({bloquearBTNSalvar: false});
                        this.limparDados();
                        this.props.fecharModal();
                        this.visible = false;
                        this.props.mensagem( 'success',  'OK', 'Erro registrado com sucesso!');
                    });
                }else{
                    this.setState({bloquearBTNSalvar: false});
                    this.props.mensagem('error', 'Erro', 'problemas na hora de salvar, verifique o formulário.');
                }
        });

    }


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
        let usuario = this.state.usuarioLogado;
        let status = this.state.status;

        this.status = ListarStatus( usuario, status.status );
        if(this.status !== undefined)
            this.setState({listaStatus: this.status});

        console.log(this.status);
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
                    return <div  key={i}> <span style={{marginTop: 20, display: 'block'}}> <label style={{ display: 'block'}} >{this.state.auxCheckListJson[i].nome}</label> <InputText  type="number"  value={ this.state.auxCheckListJson[i].value}  onChange={(e) =>{this.atualizarStateChecklist(i, e.target.value);}}   /></span></div> ;
                }else if(aux.tipo === 'String'){
                    return <div  key={i}> <span style={{marginTop: 20, display: 'block'}}> <label style={{ display: 'block'}} >{this.state.auxCheckListJson[i].nome}</label> <InputText  value={ this.state.auxCheckListJson[i].value } onChange={(e) =>{this.atualizarStateChecklist(i, e.target.value); }}  /></span></div> ;
                }else if(aux.tipo === 'boolean'){
                    return <div  key={i}> <span style={{marginTop: 20, display: 'block'}}> <label style={{ display: 'block'}} >{this.state.auxCheckListJson[i].nome}</label> <Checkbox  checked={this.state.auxCheckListJson[i].value } onChange={(e) =>{this.atualizarStateChecklist(i, e.checked); }} /></span></div> ;
                }else if(aux.tipo === 'float'){
                   return <div  key={i}>  <span style={{marginTop: 20, display: 'block'}}> <label style={{ display: 'block'}} >{this.state.auxCheckListJson[i].nome}</label> <InputText   type="number"  value={this.state.auxCheckListJson[i].value } onChange={(e) =>{this.atualizarStateChecklist(i, e.target.value); }} /></span></div> ;
                }
            });
        }
    }



    alterarStatus(status){
        this.setState({status: {id: 0, status: status} });
    }

    componentWillReceiveProps(nextProps){
        this.popularStatus();
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
                if(data.length > 0)
                    this.setState({clientes: data});
                else
                this.setState({clientes: []});
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


    footer = ()=>{
        return(
        <div>
            <Button disabled={this.state.bloquearBTNSalvar} label="Salvar" icon="pi pi-check" onClick={()=>{this.salvarDados() } }  />
            <Button label="Cancelar" icon="pi pi-times" onClick={()=>{this.limparDados(); this.props.fecharModal(); this.visible = false}} />
        </div>
        );
    }

    render(){

        return (
            <Dialog responsive={true} style={{width: window.innerWidth < 800 ? '100vw': '50vw', minHeight: this.state.heigth - 80 }}
                    footer={this.footer()} header="Usuario" visible={this.visible}
                    modal={true} onHide={() => {this.props.fecharModal(); this.limparDados();} }>  

                <div style={{ maxHeight: window.innerHeight - 140, overflowY:'scroll', minHeight: this.state.heigth - 140}}>

                    <div style={{ borderColor: '#d6d7da', borderRadius: 4, borderWidth: 1}}>
                        <h4 style={{ color:'red'}} >Informações: </h4>
                        <div style={{ display: 'block'}}>
                            <label style={{ marginTop: 5, display: 'block' }}>Pesquisar e selecionar cliente (Opcional*)</label>
                            <InputText style={{marginTop: 5, display: 'block' }} value={this.state.auxCod}  onChange={(e) => { this.setState({auxCod:  ! isNaN(parseInt( e.target.value)) ? e.target.value : ''  });  this.carregarClientes()} }   />
                            <Dropdown style={{marginTop: 5, marginBottom:20 }} optionLabel="descricao"  value={this.state.cliente} options={this.state.clientes} onChange={(e) => {  this.setState({cliente: e.value }); } } placeholder="Selecione um cliente"/>
                            
                        </div > 


                        <span  style={{marginTop: 25}}>
                            <label  style={{ display: 'block'}}>Descricao</label>
                            <div style={{width: '90%'}}>
                                <Editor style={{height: '200px'}} id="descricao"  value={this.state.descricao !== undefined && this.state.descricao !== null ? this.state.descricao : ""}  onTextChange={ (e) => {this.setState({descricao: e.htmlValue}); } }  headerTemplate={this.headerEditor}/>
                            </div>
                        </span> 

                        <div >
                            <label  style={{ display: 'block'}}>Prioridade</label>
                            <SelectButton 
                                        value={this.state.prioridade !== null ? this.state.prioridade : null  } onChange={(e) => {this.setState({prioridade: e.target.value});}}
                                        options={this.prioridades} >
                            </SelectButton>
                        </div>
                        <span  style={{marginTop: 20,  display: 'block' }}>
                            <label  style={{ display: 'block'}} >Tag</label>
                            <Dropdown filter={true}  optionLabel="tag" value={this.state.tag  } options={this.state.tags} onChange={(e) => {this.setState({tag: e.value})}} placeholder="Selecione uma tag"/>
                        </span>
                    </div>

                    
                    <div style={{ borderColor: '#d6d7da', borderRadius: 4, borderWidth: 1, marginTop: 50}}>
                        <h4 style={{ color:'red'}} >Selecione o programa:</h4>

                        <span >   
                            <label  style={{ display: 'block'}}>Setor</label>
                            <Dropdown optionLabel="descricao"  value={this.state.setor} options={this.state.setores} onChange={(e) => { this.carregarListaDeSubSetores(e.value.id);  this.setState({setor: e.value, programa: [], programas: [], subsetor: [], auxCheckListJson: [] }); this.auxJson  =  []; } } placeholder="Selecione um setor"/>
            
                        </span> 

                        <span  style={{marginTop: 25}}>
                            <label  style={{ display: 'block'}} >Subsetor</label>
                            <Dropdown optionLabel="descricao"  value={this.state.subsetor} options={this.state.subsetores} onChange={(e) => {  this.setState({subsetor: e.value }); this.carregarlistaDeprogramas(e.value.id); } } placeholder="Selecione um subsetor"/>
                        </span> 


                        <span style={{marginTop: 20}}>
                            <label  style={{ display: 'block'}} >Programa</label>
                            <Dropdown optionLabel="nome"  value={this.state.programa} options={this.state.programas} onChange={(e) => { this.setState({programa: e.value }) ; this.carregarChecklist(e.value)} } placeholder="Selecione um Programa"/>

                        </span> 
                        
                    </div>
                    
                     
                    
                    <div style={{ borderColor: '#d6d7da', borderRadius: 4, borderWidth: 1, marginTop: 50}}>
                        <h4 style={{ color:'red'}} >Checklist:</h4>
                            
                        
                            {  this.state.auxCheckListJson !== '' && this.state.auxCheckListJson !== null && this.state.auxCheckListJson !== [] ?  this.renderCheckList() : null}
                    </div>
                    

                    <div style={{ borderColor: '#d6d7da', borderRadius: 4, borderWidth: 1, marginTop: 50}}>
                        <h4 style={{ color:'red'}} >Status: </h4>
                        <span  style={{ marginBottom: 15, display: 'block'}}>
                            {this.state.listaStatus.length === 0 ? <Button label={this.state.status.status} /> : null}
                            <SelectButton 
                                        value={this.state.status !== null ? this.state.status.status  : null  } onChange={(e) => {this.alterarStatus(e.target.value) ; }}
                                        options={this.state.listaStatus} >
                            </SelectButton>
                        </span> 
                    </div>

                </div>
            </Dialog>
        );
    }
}

export default ModalErros;