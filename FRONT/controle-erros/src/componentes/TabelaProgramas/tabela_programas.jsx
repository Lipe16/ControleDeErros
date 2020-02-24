import React from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';

import {UsuarioLogado} from '../../servicos/usuario';
import {getProgramasPorProgramador} from '../../servicos/programa';

import ModalPrograma from './modal_programa';

import {Growl} from 'primereact/growl';

class TabelaProgramas extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            programas:[],
            modalVisible:false,
            programaSelecionado: [],
            usuarioLogado: null,

        };

        this.mensagem = this.mensagem.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.atualizarTBProgramas = this.atualizarTBProgramas.bind(this);
    }

    
    mensagem = (tipo, detalhe,  texto) =>{
        this.growl.show({severity: tipo, summary: texto, detail: detalhe});
    }


    fecharModal = ()=> {
        this.setState({modalVisible: false});
    }
    
    componentDidMount() {
        this.CarregarUsuarioLogado();
        getProgramasPorProgramador().then((data)=>{   
            this.setState({programas:data});
        });
    }

    atualizarTBProgramas = () =>{
        getProgramasPorProgramador().then((data)=>{   
            this.setState({programas:data});
        });
    }

    CarregarUsuarioLogado(){
        UsuarioLogado().then((auxUsuario)=>{
            this.setState({usuarioLogado:auxUsuario});
        });
    }


    actionTemplate = (rowData, column) => { 
        return (
            <div>
                <Button 
                    onClick={ ()=>{
                                this.setState({programaSelecionado:rowData , modalVisible: true});
                            }
                        } 
                    type="button" icon="pi pi-pencil" className="p-button-success" style={{marginRight: '.5em'}}></Button>           
            </div>
        );
    }


    render(){
    let add =   <div style={{textAlign:'center'}}>{ this.state.usuarioLogado !== null && this.state.usuarioLogado.perfil.perfil === "P" ? <Button icon="pi pi-plus" style={{padding:5}} onClick={()=>{ this.setState({programaSelecionado:[], modalVisible: true});} }/> : ''}</div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <div className="content-section implementation">
                    <DataTable header={add} responsive={true} value={this.state.programas} paginator={true}  rows={5} rowsPerPageOptions={[5,10,20]}>
                        <Column field="id" header="Id" sortable={true}  />
                        <Column field="nome" header="Nome" sortable={true}  />  
                        <Column body={this.actionTemplate} style={{textAlign:'center', width: '8em'}}  header="Editar" style={{width:'10%', textAlign:'center'}} />  
  
                    </DataTable>
                </div>
                <ModalPrograma atualizarTBProgramas={this.atualizarTBProgramas} mensagem={this.mensagem} programa={this.state.programaSelecionado} visible={this.state.modalVisible} fecharModal={this.fecharModal} />
            </div>
        );
    }
}

export default TabelaProgramas;