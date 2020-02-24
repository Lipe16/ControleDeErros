import React from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

import {InputText} from 'primereact/inputtext';

import {getListSubSetores} from '../../servicos/subSetor';

import {MultiSelect} from 'primereact/multiselect';

import {SelectButton} from 'primereact/selectbutton';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {salvarPrograma} from '../../servicos/programa'

class ModalPrograma extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id:0,
            subSetoresSelecionados:[],
            subSetores:[],
            nome:'',
            checklistModelo:{id: 0, dataModeloJson: ""},
            checklistModeloJson:[],
            heigth: 300,

            auxNome:'',
            auxTipo:{label: 'String', value: 'String'},
            bloquearBTNSalvar: false
        };
    }

    tipos = [
        {label: 'Int', value: 'int'},
        {label: 'Float', value: 'float'},
        {label: 'String', value: 'String'},
        {label: 'Bool', value: 'boolean'}
    ];

    visible = false;

    limparDados(){
        this.setState({
            usuarioLogado: {id: 1, nome: "AUX TESTE", perfil: {id:0, perfil: 'A'}, email: "auxteste@teste.com"},
            id:0,
            subSetoresSelecionados:[],
            subSetores:[],
            nome:'',
            checklistModeloJson:[],
            auxNome:'',
            bloquearBTNSalvar:false
        });
    }
    
    componentWillReceiveProps(nextProps){
        this.limparDados();
        this.carregarSubSetores();
        this.visible = nextProps.visible;
        if(this.props.visible !== nextProps.visible && nextProps.programa !== null && nextProps.programa.id !== undefined && nextProps.programa.id > 0){
          
            this.setState({
                id: nextProps.programa.id,
                subSetoresSelecionados: nextProps.programa.subSetores,
                nome: nextProps.programa.nome,
                checklistModeloJson: nextProps.programa.checklistModelo !== null && nextProps.programa.checklistModelo.dataModeloJson !== "" ? JSON.parse(nextProps.programa.checklistModelo.dataModeloJson) : [],
                checklistModelo: nextProps.programa.checklistModelo ,
            },()=>{
                console.log(this.state.checklistModelo)
                
            });
        }
    }

    aptoParaSalvar = true;

    programa = {
        id:0,
        subSetores:[],
        nome:'',
        checklistModelo:{id: 0, dataModeloJson: ""},
    }
    salvarPrograma = ()=>{
        this.setState({bloquearBTNSalvar:true});
        this.aptoParaSalvar = true;

        this.programa.id = this.state.id; 
        this.programa.subSetores = this.state.subSetoresSelecionados; 
        this.programa.nome = this.state.nome; 
        this.programa.checklistModelo = this.state.checklistModelo;
        this.programa.checklistModelo.dataModeloJson = JSON.stringify(this.state.checklistModeloJson); 

        if(this.programa.subSetores.length === 0){
            this.aptoParaSalvar = false;
            this.props.mensagem( 'error', 'Erro', 'verifique pelo menos 1 subSetor!');
        }
        if(this.programa.nome === "" && this.programa.nome === null){
            this.aptoParaSalvar = false;
            this.props.mensagem( 'error', 'Erro', 'verifique o campo nome do programa!');
        }

        console.log(this.programa);

        if(this.aptoParaSalvar){
            salvarPrograma(this.programa).then((retorno)=>{
                console.log(retorno);
                this.props.mensagem( 'success', 'OK', 'Registro salvo!');
                this.props.fecharModal();
                this.props.atualizarTBProgramas();
                this.setState({bloquearBTNSalvar:false});
            });
        }

    }

    carregarSubSetores = () =>{
        getListSubSetores().then((data)=>{
            console.log(data)
            this.setState({subSetores: data});
        });
    }

    addCampoAoChecklist = () =>{
        var auxT = this.state.auxTipo.value;
        var auxN = this.state.auxNome;

        var auxL =  this.state.checklistModeloJson;
        
        console.log(auxL.length)
        if(auxL.length === 0)
            auxL = new Array();
        
        
        if(auxN !== "" && auxN !== null){
            if(auxT === 'int'){
                auxL.push({nome: auxN , tipo: "int", value: 0});
            }else if(auxT === 'boolean'){
                auxL.push({nome: auxN, tipo: "boolean", value: false});
            }else if(auxT === 'String'){
                auxL.push({nome: auxN, tipo: "String", value: ""});
            }else if(auxT === 'float'){
                auxL.push({nome: auxN, tipo: "float", value: 0});
            }

            this.setState({checklistModeloJson: auxL});
        }


    }
        
    componentDidMount() {
        this.setState({heigth: window.innerHeight - 60});
    }


    subSetorTemplate(option) {
        if (!option.descricao) {
            return option.label;
        }
        else {
            return (
                <div className="p-clearfix">
             
                    <span style={{float:'right', margin:'.5em .25em 0 0'}}>{option.descricao} ({option.setor.descricao})</span>
                </div>
            );
        }
    }


    footer = ()=>{
        return(
        <div>
            <Button disabled={this.state.bloquearBTNSalvar} label="Salvar" icon="pi pi-check" onClick={()=>{ this.salvarPrograma() ; } }  />
            <Button label="Cancelar" icon="pi pi-times" onClick={()=>{this.props.fecharModal();}} />
        </div>
        );
    }
    

    actionTemplate = (rowData, column) => { 
        return (
            <div>
                <Button 
                    onClick={ ()=>{

                                let auxX = this.state.checklistModeloJson;
                                var auxY = [];
                                auxX.map((data)=>{
                                    if(data.nome === rowData.nome){
                                    }else{
                                        auxY.push(data);
                                    }
                                });

                                this.setState({checklistModeloJson:auxY});
                            }
                        } 
                    type="button" icon="pi pi-trash" className="p-button-danger" style={{marginRight: '.5em'}}></Button>           
            </div>
        );
    }

    render(){
        return (
            <Dialog responsive={true} style={{width: window.innerWidth < 800 ? '100vw': '50vw', minHeight: this.state.heigth - 80 }}
                    footer={this.footer()} header="Programa" visible={this.visible}
                    modal={true} onHide={() => { this.props.fecharModal();  } }>  

                <div style={{maxHeight: window.innerHeight - 140, overflow:'scroll', minHeight: this.state.heigth - 140}}>

                    <span style={{marginTop: 15, display: 'block' }}>
                        <label style={{ marginTop: 5, display: 'block' }}>Nome</label>
                        <InputText style={{marginTop: 5, display: 'block' }} value={this.state.nome !== null && this.state.nome !== undefined ? this.state.nome : '' } onChange={(e) => { this.setState({nome: e.target.value})} }  />
                    </span > 

                    <span style={{marginTop: 15, display: 'block' }}>
                        <label style={{ marginTop: 5, display: 'block' }}>SubSetores</label>
                        <MultiSelect readOnlyInput placeholder="Selecione subsetores" itemTemplate={this.subSetorTemplate} filter={true} filterBy="descricao"  optionLabel="descricao"  value={this.state.subSetoresSelecionados} options={this.state.subSetores} onChange={(e) => this.setState({subSetoresSelecionados: e.value})} />
                    </span >  

                    <span style={{marginTop: 30, display: 'block'}}>
                        <h4 >Adicionar campo ao checklist: </h4>
                        <InputText placeholder="Nome do campo" style={{marginTop: 10, display: 'block' }} value={this.state.auxNome !== null && this.state.auxNome !== undefined ? this.state.auxNome : '' } onChange={(e) => { this.setState({auxNome: e.target.value})} }  />

                        <SelectButton style={{marginTop: 10, display: 'block' }}  optionLabel="label" value={this.state.auxTipo} options={this.tipos} onChange={(e) => this.setState({auxTipo: e.value})}></SelectButton>

                        <Button style={{marginTop: 10, display: 'block' }} label="Confirmar" className="p-button-success" onClick={()=>{ this.addCampoAoChecklist()}} />
                    </span> 

                    <span style={{marginTop: 30, display: 'block' }}>
                        <label style={{ marginTop: 5, display: 'block' }}>CheckList</label>

                        <DataTable responsive={true} value={this.state.checklistModeloJson}>
                            <Column field="nome" header="Nome" />
                            <Column field="tipo" header="Tipo" />
                            <Column field="value" header="Value" />
                            <Column body={this.actionTemplate} style={{textAlign:'center', width: '8em'}}  header="Excluir" style={{width:'10%', textAlign:'center'}} />  

                        </DataTable>   

                    </span >   
                </div>

            </Dialog>
        );
    }
}

export default ModalPrograma;