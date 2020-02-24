import React from 'react';

import {DataTable} from 'primereact/datatable';

import {Growl} from 'primereact/growl';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';

import {UsuarioLogado} from '../../servicos/usuario';

import {getKardex} from '../../servicos/kardex';
import {InputText} from 'primereact/inputtext';

import {Editor} from 'primereact/editor';



class TabelaKardex extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            usuarioLogado:null,
            listaKardex:[],
            id: ''
        };

        this.mensagem = this.mensagem.bind(this);
        this.export = this.export.bind(this);
    }

    export() {
        this.dt.exportCSV();
    }


    CarregarUsuarioLogado(){
        UsuarioLogado().then((auxUsuario)=>{
            this.setState({usuarioLogado:auxUsuario});
        });
    }

    mensagem = (tipo, detalhe,  texto) =>{
        this.growl.show({severity: tipo, summary: texto, detail: detalhe});
    }
    
    buscarDados = () =>{
        let id = this.state.id;
        getKardex(id).then((lista)=>{
            console.log(lista)
            this.setState({listaKardex: lista});
        });
    }





        
    componentDidMount() {
        this.CarregarUsuarioLogado();
      
    }

    headerEditor = (
        <span  className="ql-formats" style={{width: '80%'}}>
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
        </span>
    );

    descricaoTemplate = (rowData, column) => { 

        let descricao = rowData.descricao.replace("," , "<br/><br/>");
        descricao = descricao.replace(/;/g , "<br/>");
        return ( 
            <Editor 
                readOnly
                autoResize={true} 
                headerTemplate={this.headerEditor}
                style={{width:'100%', height: '100px'}}

                value={descricao}
        />     
        );
    }

    statusTemplate = (rowData, column) => { 
        let status = '';
        if(rowData.pendenteResolucao.pendenteResolucaoStatus !== null)
            status = rowData.pendenteResolucao.pendenteResolucaoStatus.status.replace("_" , " ");

        return ( 
            <InputText 
                readOnly
                style={{width:'100%', height: '100px'}}
                value={status}
        />     
        );
    }


    render(){
        let add =  <div> <div style={{textAlign:'left'}}><Button type="button" icon="pi pi-external-link" iconPos="left" label="CSV" onClick={this.export}/></div>  <div style={{textAlign:'center'}}> <InputText  type="number" value={this.state.id} onChange={(e) => this.setState({id: e.target.value})} placeholder="ID do erro"/><Button icon="pi pi-search" onClick={()=>{this.buscarDados();}} className="p-button-warning"/></div> </div> ;
       
        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <div className="content-section implementation">
                    <DataTable  header={add} paginator={true}  rows={5} rowsPerPageOptions={[5,10,20]} value={this.state.listaKardex} responsive={true} ref={(el) => { this.dt = el; }} >
                        <Column field="data" header="Data" sortable={true}  style={{width:'10%'}}/>  
                        <Column field="pendenteResolucao.usuarioSolicitante.nome" header="Solicitante" sortable={true}  style={{width:'10%'}}/>
                        <Column body={this.descricaoTemplate}  field="descricao" header="Descrição" sortable={true} style={{width:'40%'}} />  
                       {/* <Column field="status.status" header="Status" sortable={true}  style={{width:'10%'}}/> */ }
                        <Column  body={this.statusTemplate} field="pendenteResolucao.pendenteResolucaoStatus.status" header="Pendent/Status" sortable={true}  style={{width:'20%'}}/>  
                          
                        <Column field="pendenteResolucao.usuarioSolicitado.nome" header="Solicitado" sortable={true}  style={{width:'10%'}}/>
                        <Column field="pendenteResolucao.solicitacaoData" header="Solicitação" sortable={true}  style={{width:'10%'}}/>  
                        <Column field="pendenteResolucao.solucaoData" header="Solução" sortable={true}  style={{width:'10%'}}/>       
                    </DataTable>
                </div>
            </div>
        );
    }
}

export default TabelaKardex;