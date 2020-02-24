import React from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';

import {UsuarioLogado} from '../../servicos/usuario';
import {getListSubSetores} from '../../servicos/subSetor';

import ModalSubSetor from './modal_subsetores';

import {Growl} from 'primereact/growl';

class TabelaSubSetores extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            programas:[],
            modalVisible:false,
            subsetores:[],
            subSetorSelecionado: [],

        };

        this.mensagem = this.mensagem.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.atualizarSubSetores = this.atualizarSubSetores.bind(this);

    }

    
    mensagem = (tipo, detalhe,  texto) =>{
        this.growl.show({severity: tipo, summary: texto, detail: detalhe});
    }


    fecharModal = ()=> {
        this.setState({modalVisible: false});
    }
    
    componentDidMount() {
        getListSubSetores().then((data)=>{   
            this.setState({subsetores:data});
        });
    }

    atualizarSubSetores = () =>{
        getListSubSetores().then((data)=>{   
            this.setState({subsetores:data});
        });
    }


    actionTemplate = (rowData, column) => { 
        return (
            <div>
                <Button 
                    onClick={ ()=>{
                                this.setState({subSetorSelecionado:rowData , modalVisible: true});
                            }
                        } 
                    type="button" icon="pi pi-pencil" className="p-button-success" style={{marginRight: '.5em'}}></Button>           
            </div>
        );
    }


    render(){
        let add =   <div style={{textAlign:'center'}}><Button icon="pi pi-plus" style={{padding:5}} onClick={()=>{ this.setState({subSetorSelecionado:[], modalVisible: true});} }/></div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <div className="content-section implementation">
                    <DataTable header={add} responsive={true} value={this.state.subsetores} paginator={true}  rows={5} rowsPerPageOptions={[5,10,20]}>
                        <Column field="id" header="Id" sortable={true}  />
                        <Column field="setor.descricao" header="Setor" sortable={true}  />  
                        <Column field="descricao" header="Descricao" sortable={true}  />  
                        <Column body={this.actionTemplate} style={{textAlign:'center', width: '8em'}}  header="Editar" style={{width:'10%', textAlign:'center'}} />  
  
                    </DataTable>
                </div>

                <ModalSubSetor atualizarSubSetores={this.atualizarSubSetores} mensagem={this.mensagem} subSetorSelecionado={this.state.subSetorSelecionado} visible={this.state.modalVisible} fecharModal={this.fecharModal} />

            </div>
        );
    }
}

export default TabelaSubSetores;