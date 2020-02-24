import React from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import {InputText} from 'primereact/inputtext';
import {Editor} from 'primereact/editor';

import {UsuarioLogado} from '../../servicos/usuario';
import {getPrazoProgramadorPorErro} from '../../servicos/prazo_programador';

import {salvarPrazoProgramador} from '../../servicos/prazo_programador';

import {StringDateParse} from '../../util/date_util';
import {DateParseString} from '../../util/date_util';

class ModalPrazo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            admUsuario: [],
            dataLimite:  null,
            dataPrevisaoFim: '',
            dataPrevisaoInicio: '',
            datacriacao: new Date(),
            id: 0,
            observacao: '',
            setor: 0,
            usuarioLogado: {id: 1, nome: "AUX TESTE", perfil: {id:0, perfil: 'A'}, email: "auxteste@teste.com"},
            erroId:0,
            heigth: 300,
            bloquearbotaoSalvar: true
        };
    }



    visible = false;
    aptoParaSalvar = true;

    prazo = {
        erroId:0,
        dataLimite: null,
        dataPrevisaoFim: '',
        dataPrevisaoInicio: '',
        datacriacao: '',
        id: 0,
        observacao: ''
    };
   

    componentWillReceiveProps(nextProps){
        this.visible = nextProps.modalPrazoVisible;
        this.setState({erroId:nextProps.erroId}, ()=> {this.carregarPrazo();});

      }

      limparDados = ()=> {
         this.setState({
            admUsuario: [],
            dataLimite: '',
            dataPrevisaoFim: '',
            dataPrevisaoInicio: '',
            datacriacao: new Date(),
            id: 0,
            observacao: '',
            setor: 0,
            erroId:0  
        }); 
      }

        
    componentDidMount() {
        
        this.setState({heigth: window.innerHeight - 60});
        this.CarregarUsuarioLogado();  
    }


    CarregarUsuarioLogado(){
        UsuarioLogado().then((auxUsuario)=>{
            this.setState({usuarioLogado:auxUsuario});
        });
    }


    carregarPrazo(){
        
        getPrazoProgramadorPorErro(this.state.erroId).then((prazo) =>{

            console.log(prazo)
           
            this.setState({
                admUsuario: prazo.admUsuario !== null ?  prazo.admUsuario : null,
                dataLimite: prazo.dataLimite !== null ? StringDateParse(prazo.dataLimite) : null,
                dataPrevisaoFim: prazo.dataPrevisaoFim !== null ? StringDateParse(prazo.dataPrevisaoFim) : null,
                dataPrevisaoInicio: prazo.dataPrevisaoInicio !== null ? StringDateParse(prazo.dataPrevisaoInicio) : null,
                datacriacao: prazo.datacriacao !== null ? StringDateParse(prazo.datacriacao) :null,
                id: prazo.id !== null ? prazo.id : 0,
                observacao: prazo.observacao,
       
            })
        });
    }

    headerEditor = (
        <span  className="ql-formats" style={{width: '80%'}}>
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
        </span>
    );

    eGerente = () => {

        if(this.state.usuarioLogado.perfil !== undefined  && this.state.usuarioLogado.perfil.perfil !== undefined && this.state.usuarioLogado !== null){
            return !( this.state.usuarioLogado.perfil.perfil === 'G')
        }else{
            return true
        }
    }


    render(){

        return (
            <Dialog responsive={true} style={{width: window.innerWidth < 800 ? '100vw': '50vw', minHeight: this.state.heigth - 80 }}
                    header="Prazo(Modo leitura)" visible={this.visible}
                    modal={true} onHide={() => {this.props.fecharModalPrazo(); this.limparDados();   } }>  

                <div style={{maxHeight: window.innerHeight - 140, overflowY:'scroll', minHeight: this.state.heigth - 140}}>

                    <span style={{marginTop: 15, display: 'block' }}>
                        <label style={{ marginTop: 5, display: 'block' }}>Gerente</label>
                        <InputText disabled={true} readOnly={true} style={{marginTop: 5, display: 'block' }} value={this.state.admUsuario !== null && this.state.admUsuario.nome !== undefined ? this.state.admUsuario.nome : '' }   />
                    </span > 
                    

                    <span  style={{marginTop: 20,  display: 'block'}}>
                        <label  style={{ display: 'block'}}>Data criação</label>
                        <Calendar disabled={true} readOnly readOnlyInput dateFormat="dd/mm/yy" id="datacriacao" value={this.state.datacriacao} onChange={(e) => this.setState({datacriacao: e.value})}></Calendar>   
                    </span>

                    <span  style={{marginTop: 20,  display: 'block'}}>
                        <label  style={{ display: 'block'}}>Data previsao ínicio</label>
                        <Calendar disabled={true} readOnly readOnlyInput dateFormat="dd/mm/yy" id="dataPrevisaoInicio" value={this.state.dataPrevisaoInicio} onChange={(e) => this.setState({dataPrevisaoInicio: e.value})}></Calendar>   
                    </span> 


                    <span  style={{marginTop: 20,  display: 'block'}}>
                        <label  style={{ display: 'block'}}>Data previsao fim</label>
                        <Calendar disabled={true} readOnly readOnlyInput dateFormat="dd/mm/yy" id="dataPrevisaoFim" value={this.state.dataPrevisaoFim} onChange={(e) => this.setState({dataPrevisaoFim: e.value})}></Calendar>   
                    </span> 

                    <span  style={{marginTop: 20,  display: 'block'}}>
                        <label  style={{ display: 'block'}}>Data limite</label>
                        <Calendar disabled={true} disabled={ this.eGerente() } readOnlyInput dateFormat="dd/mm/yy" id="dataLimite" value={this.state.dataLimite} onChange={(e) => this.setState({dataLimite: e.value})}></Calendar>   
                    </span> 


                    <span  style={{marginTop: 25}}>
                        <label  style={{ display: 'block'}}>Observação</label>
                        <div style={{width: '90%'}}>
                            <Editor readOnly style={{height: '200px'}} id="observacao"  value={this.state.observacao}  onTextChange={ (e) => {this.setState({observacao: e.htmlValue});} }  headerTemplate={this.headerEditor}/>
                        </div>
                    </span> 

                </div>
            </Dialog>
        );
    }
}

export default ModalPrazo;