import React from 'react';

import {DataTable} from 'primereact/datatable';

import {Growl} from 'primereact/growl';
import {Column} from 'primereact/column';

import {getErrosPorData, salvarErroQualidade} from '../../servicos/erros';

import ModalErros from './modal_erros';
import ModalPrazo from './modal_prazo';
import ModalImagem from './modal_imagem';

import {Button} from 'primereact/button';

import {Editor} from 'primereact/editor';
import {UsuarioLogado} from '../../servicos/usuario';
import {Rating} from 'primereact/rating';
import {Calendar} from 'primereact/calendar';
import {DateParseString} from '../../util/date_util';



class TabelaErrosResolvidos extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            erros: [],
            erroSelecionado:null,
            modalVisible:false,
            usuarioLogado:null,
            modalPrazoVisible: false,
            erroId: 0,
            modalVisibleImagem: false,
            imagemErro: null,
            
            data1: new Date(),
            data2: new Date(),

        };
        this.fecharModal = this.fecharModal.bind(this);
        this.mensagem = this.mensagem.bind(this);
        this.limparErroSelecionado = this.limparErroSelecionado.bind(this);
        this.limparPrazoSelecionado = this.limparPrazoSelecionado.bind(this);
        this.fecharModalPrazo = this.fecharModalPrazo.bind(this);
        this.fecharModalImagem = this.fecharModalImagem.bind(this);
        this.limparErroImagem  = this.limparErroImagem.bind(this);


        this.export = this.export.bind(this);
    }

    export() {
        this.dt.exportCSV();
    }

    salvarQualidadeErro = (erro, qualidade)=>{

        
        erro.qualidade = qualidade;

        salvarErroQualidade(erro).then((erro)=>{
            console.log(erro);
            this.mensagem('success', 'Qualidade atualizado',  erro.qualidade);
            this.buscarDados();
        });
    }

    buscarDados = () =>{
        let data1 = DateParseString(this.state.data1);
        let data2 = DateParseString(this.state.data2);

        getErrosPorData(data1,data2).then((lista)=>{
            console.log(lista)
            this.setState({erros: lista});
        });
    }


    CarregarUsuarioLogado(){
        UsuarioLogado().then((auxUsuario)=>{
            this.setState({usuarioLogado:auxUsuario});
        });
    }

    mensagem = (tipo, detalhe,  texto) =>{
        this.growl.show({severity: tipo, summary: texto, detail: detalhe});
    }
 

    fecharModal = () =>{
        this.setState({modalVisible: false });
        this.buscarDados();
    }

    fecharModalPrazo = () =>{
        this.setState({modalPrazoVisible: false });

        this.buscarDados();
    }

    fecharModalImagem = () =>{
        this.setState({modalVisibleImagem: false });
    }

        
    componentDidMount() {
        this.CarregarUsuarioLogado();      
    }

    limparErroSelecionado = ()=>{
        this.setState({erroSelecionado:[]}); 
        this.limparPrazoSelecionado();
    }


    limparPrazoSelecionado = ()=>{
        this.setState({ erroId: 0}); 
    }

    limparErroImagem = ()=>{
        this.setState({ imagemErro: []}); 
    }

    headerEditor = (
        <span  className="ql-formats" style={{width: '80%'}}>
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
        </span>
    );

    

    qualidadeTemplate = (rowData, column) =>{
        if(this.state.usuarioLogado.perfil.perfil === "Q"){
            return (
                <Rating value={rowData.qualidade} onChange={(e) => { this.salvarQualidadeErro(rowData, e.value)}} />
            );
        }else{
            return (
                <Rating disabled value={rowData.qualidade} />
            );
        }
    }

    descricaoTemplate = (rowData, column) => { 
        return ( 
            <Editor 
                readOnly
                autoResize={true} 
                headerTemplate={this.headerEditor}
                style={{width:'100%', height: '100px'}}

                value={rowData.descricao}
        />     
        );
    }

    //Template para descrição 
    descricaoEditorTemplate = (props, field) => { 
        return (
            <Editor 
                readOnly
                autoResize={true} 
                headerTemplate={this.headerEditor}
                style={{width:'100%', height: '100px'}}
                onBlur={(e) =>  { 
                    
                }}
    
                value={props.rowData.descricao}
            />    
        );
    }

    actionTemplate = (rowData, column) => { 
            return (
                <div>
                    <Button 
                        onClick={ ()=>{  
                                    this.setState({modalVisibleImagem: true, imagemErro: rowData});
                                }
                            } 
                        type="button" icon="pi pi-image" className="p-button-success" style={{margin: '.5px'}}>
                    </Button>    
                    <Button 
                        onClick={ ()=>{
                                 
                                    this.setState({erroSelecionado:rowData , modalVisible: true});
                                }
                            } 
                        type="button" icon="pi pi-pencil" className="p-button-success" style={{marginRight: '.5em'}}></Button>           
                </div>
            );
    }

    templatePrazo = (rowData, column) =>{
        if(this.state.usuarioLogado !== null && (this.state.usuarioLogado.perfil.perfil === "G" || this.state.usuarioLogado.perfil.perfil === "P")){
            return (
                <div>
                    <Button 
                        onClick={ ()=>{
                                   
                                    this.setState({erroId:rowData.id , modalPrazoVisible: true});
                                }
                            } 
                        type="button" icon="pi pi-calendar" className="p-button-danger" style={{marginRight: '.5em'}}></Button>           
                </div>
            );
        }else if(rowData.prazoProgramador !== null && rowData.prazoProgramador !== undefined ){
            return (
                <div>

                    <Button 
                        onClick={ ()=>{
                                 
                                    this.setState({erroId:rowData.id , modalPrazoVisible: true});
                                }
                            } 
                        type="button" icon="pi pi-calendar" className="p-button-success" style={{marginRight: '.5em'}}></Button>           
                </div>
            );
        }else{
            return (
                <div>
                    <label>N/A</label>
                </div> 
            );
        }
    }

    templateStatus = (rowData, column) =>{

        switch(rowData.status.status){
            case 'AGUARDANDO_TESTE':
                return (<div><label>Aguardando tester</label></div>) 
                break;
            case 'ANALISANDO_TESTE':
                return (<div><label>Em analise C/ tester</label></div>) 
                break;
            case 'AGUARDANDO_PROGRAMADOR':
                return (<div><label>Aguardando programador</label></div>) 
                break;
            case 'ANALISANDO_PROGRAMADOR':
                return (<div><label>Em Analise C/ programador</label></div>) 
                break;
            case 'AGUARDANDO_CONFERENCIA_TESTE':
                return (<div><label>Reanalise C/ tester</label></div>) 
                break;
            case 'ANALISANDO_CONFERENCIA_TESTE':
                return (<div><label>Reanalisando Testador</label></div>) 
                break;
            case 'LIBERADO_CLIENTE_TESTE':
                return (<div><label>Liberado P/ analista Testar</label></div>) 
                break;
            case 'LIBERADO':
                return (<div><label>Liberado/Finalizado</label></div>) 
                break;
            case 'CANCELADO':
                return (<div><label>Cancelado</label></div>) 
                break;
        }
    }

    render(){
        let add =  <div> <div style={{textAlign:'left'}}><Button type="button" icon="pi pi-external-link" iconPos="left" label="CSV" onClick={this.export}/></div>  <div style={{textAlign:'center'}}>   <Calendar style={{width: 300}} dateFormat="dd/mm/yy" value={this.state.data1} onChange={(e) => this.setState({data1: e.value})}/> <Calendar style={{width: 300}} dateFormat="dd/mm/yy" value={this.state.data2} onChange={(e) => this.setState({data2: e.value})}/>   <Button icon="pi pi-search" onClick={()=>{this.buscarDados();}} className="p-button-warning"/></div> </div> ;
       
        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <div className="content-section implementation">
                    <DataTable  header={add} paginator={true}  rows={5} rowsPerPageOptions={[5,10,20]} value={this.state.erros} responsive={true} ref={(el) => { this.dt = el; }} >
                        {/*<Column field="id" header="ID" sortable={true}  style={{width:'5%'}}/>*/ }

                        <Column field="prioridade" header="Prioridade" sortable={true}  style={{width:'10%'}}/> 

                        <Column field="programa.nome" header="Programa" sortable={true} style={{width:'10%'}} />   
                        <Column body={this.templateStatus}  header="Status" style={{width:'10%'}} />   
                        <Column editor={this.descricaoEditorTemplate}  body={this.descricaoTemplate} field="descricao" header="Descricao" style={{width:'40%'}} />

                        <Column body={this.qualidadeTemplate} field="qualidade" header="Qualidade"  />

                        <Column body={this.templatePrazo} header="Prazo" style={{width:'10%', textAlign:'center'}} />
                        <Column body={this.actionTemplate} style={{textAlign:'center', width: '8em'}}  header="Editar" style={{width:'10%', textAlign:'center'}} />  
                    </DataTable>
                </div>
                <ModalImagem limparErroImagem ={this.limparErroImagem } mensagem={this.mensagem} imagemErro={this.state.imagemErro} fecharModal={this.fecharModalImagem} modalVisible={this.state.modalVisibleImagem}/>

                <ModalErros limparErroSelecionado={this.limparErroSelecionado} mensagem={this.mensagem} erro={this.state.erroSelecionado} fecharModal={this.fecharModal} modalVisible={this.state.modalVisible} />
                <ModalPrazo mensagem={this.mensagem} modalPrazoVisible={this.state.modalPrazoVisible} erroId={this.state.erroId} fecharModalPrazo={this.fecharModalPrazo} /> 
            </div>
        );
    }
}

export default TabelaErrosResolvidos;