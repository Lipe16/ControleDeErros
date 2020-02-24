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
            bloquearbotaoSalvar: true,
            bloquearBTNSalvar: false
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
    
    salvar(){
        this.setState({bloquearBTNSalvar: true});
        this.aptoParaSalvar = true;
        
        this.prazo.erroId= this.state.erroId;
        this.prazo.id = this.state.id;

        this.prazo.dataLimite = this.state.dataLimite !== '' && this.state.dataLimite !== null ? DateParseString(this.state.dataLimite) : null;
        this.prazo.dataPrevisaoFim = this.state.dataPrevisaoFim !== '' && this.state.dataPrevisaoFim !== null ?  DateParseString(this.state.dataPrevisaoFim) : null;
        this.prazo.dataPrevisaoInicio = this.state.dataPrevisaoInicio !== '' && this.state.dataPrevisaoInicio !== null ?  DateParseString(this.state.dataPrevisaoInicio) : null;
        this.prazo.datacriacao = this.state.datacriacao !== '' && this.state.datacriacao !== null ?  DateParseString(this.state.datacriacao) : null;
        this.prazo.observacao = this.state.observacao;

        if(this.prazo.erroId === 0){
            this.aptoParaSalvar = false;
        }


        if(this.prazo.dataPrevisaoFim === '' || this.prazo.dataPrevisaoFim  === null){
            this.aptoParaSalvar = false;
            this.props.mensagem('error', 'Erro', 'Falta data de privisão final');
        }

        if(this.prazo.dataPrevisaoInicio === '' || this.prazo.dataPrevisaoInicio === null){
            this.aptoParaSalvar = false;
            this.props.mensagem('error', 'Erro', 'Falta data de previsão de inicio');
        }



        if(this.prazo.observacao === '' || this.prazo.observacao === null){
            this.aptoParaSalvar = false;
            this.props.mensagem('error', 'Erro', 'Falta observação');
        }

        
        if(this.aptoParaSalvar){
            salvarPrazoProgramador(this.prazo).then((data)=>{

                console.log(this.prazo);
                console.log(data);
                this.limparDados(); 
                this.props.fecharModalPrazo();
                this.props.mensagem( 'success', 'OK', 'Registro salvo!');
            });
        }else{
            this.setState({bloquearBTNSalvar: false});
        }
   }

   

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
            erroId:0  ,
            bloquearBTNSalvar: false
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


    footer = ()=>{
        return(
        <div>
            {this.state.usuarioLogado.perfil.perfil === 'G' || this.state.usuarioLogado.perfil.perfil === 'P'? <Button disabled={this.state.bloquearBTNSalvar} label="Salvar" icon="pi pi-check" onClick={()=>{ this.salvar()} }  /> : null}
            <Button label="Cancelar" icon="pi pi-times" onClick={()=>{this.limparDados(); this.props.fecharModalPrazo(); }} />
        </div>
        );
    }

    render(){

        return (
            <Dialog responsive={true} style={{width: window.innerWidth < 800 ? '100vw': '50vw', minHeight: this.state.heigth - 80 }}
                    footer={this.footer()} header="Prazo" visible={this.visible}
                    modal={true} onHide={() => {this.props.fecharModalPrazo(); this.limparDados();   } }>  

                <div style={{maxHeight: window.innerHeight - 140, overflow:'scroll', minHeight: this.state.heigth - 140}}>

                    <span style={{marginTop: 15, display: 'block' }}>
                        <label style={{ marginTop: 5, display: 'block' }}>Gerente</label>
                        <InputText readOnly={true} style={{marginTop: 5, display: 'block' }} value={this.state.admUsuario !== null && this.state.admUsuario.nome !== undefined ? this.state.admUsuario.nome : '' }   />
                    </span > 
                    

                    <span  style={{marginTop: 20,  display: 'block'}}>
                        <label  style={{ display: 'block'}}>Data previsao ínicio</label>
                        <Calendar readOnly readOnlyInput dateFormat="dd/mm/yy" id="dataPrevisaoInicio" value={this.state.dataPrevisaoInicio} onChange={(e) => this.setState({dataPrevisaoInicio: e.value})}></Calendar>   
                    </span> 


                    <span  style={{marginTop: 20,  display: 'block'}}>
                        <label  style={{ display: 'block'}}>Data previsao fim</label>
                        <Calendar readOnly readOnlyInput dateFormat="dd/mm/yy" id="dataPrevisaoFim" value={this.state.dataPrevisaoFim} onChange={(e) => this.setState({dataPrevisaoFim: e.value})}></Calendar>   
                    </span> 

                    <span  style={{marginTop: 20,  display: 'block'}}>
                        <label  style={{ display: 'block'}}>Data limite (Só o gerente consegue editar)</label>
                        <Calendar disabled={ this.eGerente() } readOnlyInput dateFormat="dd/mm/yy" id="dataLimite" value={this.state.dataLimite} onChange={(e) => this.setState({dataLimite: e.value})}></Calendar>   
                    </span> 


                    <span  style={{marginTop: 25}}>
                        <label  style={{ display: 'block'}}>Observação</label>
                        <div style={{width: '90%'}}>
                            <Editor style={{height: '200px'}} id="observacao"  value={this.state.observacao}  onTextChange={ (e) => {this.setState({observacao: e.htmlValue});} }  headerTemplate={this.headerEditor}/>
                        </div>
                    </span> 

                </div>
            </Dialog>
        );
    }
}

export default ModalPrazo;