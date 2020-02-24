import React from 'react';

import {DataTable} from 'primereact/datatable';

import {Growl} from 'primereact/growl';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';

import {UsuarioLogado} from '../../servicos/usuario';

import {getLogs} from '../../servicos/log';
import {InputText} from 'primereact/inputtext';

import {Editor} from 'primereact/editor';

import {DateParseString} from '../../util/date_util';
import {Calendar} from 'primereact/calendar';



class TabelaLog extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            usuarioLogado:null,
            listaLogs:[],
            data1: new Date(),
            data2: new Date(),
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
        let data1 = DateParseString(this.state.data1);
        let data2 = DateParseString(this.state.data2);

        getLogs(data1,data2).then((lista)=>{
            console.log(lista)
            this.setState({listaLogs: lista});
        });
    }





        
    componentDidMount() {
        this.CarregarUsuarioLogado();
      
    }

    headerEditor = (
        <span   style={{width: '80%'}}>

        </span>
    );

    descricaoTemplate = (rowData, column) => { 

        let descricao = rowData.log.replace("," , "<br/><br/>");
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

        let status = rowData.pendenteResolucao.pendenteResolucaoStatus.status.replace("_" , " ");

        return ( 
            <InputText 
                readOnly
                style={{width:'100%', height: '100px'}}
                value={status}
        />     
        );
    }


    render(){
        let add =  <div> <div style={{textAlign:'left'}}><Button type="button" icon="pi pi-external-link" iconPos="left" label="CSV" onClick={this.export}/></div>  <div style={{textAlign:'center'}}>   <Calendar dateFormat="dd/mm/yy" value={this.state.data1} onChange={(e) => this.setState({data1: e.value})}/> <Calendar dateFormat="dd/mm/yy" value={this.state.data2} onChange={(e) => this.setState({data2: e.value})}/>   <Button icon="pi pi-search" onClick={()=>{this.buscarDados();}} className="p-button-warning"/></div> </div> ;
       
        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <div className="content-section implementation">
                    <DataTable  header={add} paginator={true}  rows={5} rowsPerPageOptions={[5,10,20]} value={this.state.listaLogs} responsive={true} ref={(el) => { this.dt = el; }} >
                        <Column field="data" header="Data" sortable={true}  style={{width:'10%'}}/>  
                        <Column field="usuario.nome" header="Usuario" sortable={true}  style={{width:'10%'}}/>  
                        <Column field="tabela" header="Tabela" sortable={true}  style={{width:'10%'}}/>  
                        <Column field="idTabela" header="ID na tabela" sortable={true}  style={{width:'5%'}}/>  

                        <Column body={this.descricaoTemplate}  field="log" header="Log" sortable={true} style={{width:'40%'}} /> 
                    </DataTable>
                </div>
            </div>
        );
    }
}

export default TabelaLog;