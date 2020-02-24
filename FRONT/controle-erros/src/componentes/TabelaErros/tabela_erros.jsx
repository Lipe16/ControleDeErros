import React from 'react';
import Steps, { Step } from 'rc-steps';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';

import {DataTable} from 'primereact/datatable';

import {Growl} from 'primereact/growl';
import {Column} from 'primereact/column';
import {Dropdown} from 'primereact/dropdown';
import {getErros, salvarErroQualidade, salvarErro} from '../../servicos/erros';


import ModalErros from './modal_erros';
import ModalPrazo from './modal_prazo';
import ModalImagem from './modal_imagem';

import {Button} from 'primereact/button';

import {Editor} from 'primereact/editor';
import {UsuarioLogado} from '../../servicos/usuario';
import {Rating} from 'primereact/rating';
import {InputTextarea} from 'primereact/inputtextarea';
import {ListarStatus} from './Util/status';




class TabelaErros extends React.Component{

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
            statusCurrent: null

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
    bloquearAtualizacao = false;
    bloquearAtualizacaoPorDescricao = false;

    export() {
        this.dt.exportCSV();
    }

    salvarQualidadeErro = (erro, qualidade)=>{

        
        erro.qualidade = qualidade;

        salvarErroQualidade(erro).then((erro)=>{
            console.log(erro);
            this.mensagem('success', 'Qualidade atualizado',  erro.qualidade);
            getErros().then((data)=>{
                this.setState({erros:data});
            });
        });
    }


    salvarErro = (erro) =>{
        let auxErro = erro;
        this.growl.clear();
        salvarErro(auxErro).then((data)=>{

            this.mensagem( 'success',  'OK', 'Registro atualizado com sucesso!');
            
        });
    }

    salvarErroEAtualizar = (erro) =>{
        let auxErro = erro;
        this.growl.clear();
        salvarErro(auxErro).then((retorno)=>{

            this.mensagem( 'success',  'OK', 'Registro atualizado com sucesso!');

                console.log(retorno)
         

                let encontrado = false;
                let auxErros = this.state.erros;
                let auxErrosAtualizado = this.state.erros;
                
                auxErros.map((erro, i)=>{
                    if(retorno.id == erro.id){
                        encontrado = true;
                        auxErrosAtualizado[i] = retorno;
                        this.setState({erros: auxErrosAtualizado});
                    }
                });
                if(!encontrado)
                    this.setState({erros: [retorno ,...auxErrosAtualizado]});

                
         
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
        getErros().then((data)=>{
   
            this.setState({erros:data});
        });
    }

    fecharModalPrazo = () =>{
        this.setState({modalPrazoVisible: false });

        getErros().then((data)=>{
        
            this.setState({erros:data});
        });
    }

    fecharModalImagem = () =>{
        this.setState({modalVisibleImagem: false });
    }

    _interval = null; 
    componentDidMount() {
        this.CarregarUsuarioLogado();

        getErros().then((data)=>{
            this.setState({erros:data});
        });

        this._interval = setInterval(() => {
            console.log("entrou no setinterval");

            if(!this.state.modalPrazoVisible && !this.state.modalVisible && !this.state.modalVisibleImagem && this.bloquearAtualizacao !== true && this.bloquearAtualizacaoPorDescricao !== true){
                console.log("atualizou pelo setinterval");
                getErros().then((data)=>{
                    this.setState({erros:data});
                });
            }else{console.log("NÃO atualizou pelo setinterval");}

          }, 25000);
      
    }

    componentWillUnmount() {
        clearInterval(this._interval);
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

    //----------------------------- TEMPLATES -----------------------------------------
    onEditorValueChange(props, value) {
        let auxErros = [...props.value];
        auxErros[props.rowIndex][props.field] = value;

        this.setState({erros: auxErros});
    }

    //Template para prioridade
    prioridadeTemplate = (rowData, column) => { 
        if(this.bloquearAtualizacao === true ){
            this.bloquearAtualizacao = false;
             console.log("libera atualização")
        }
        if(rowData.prioridade == "B"){
            return (
                 <div>
                     <label style={{borderRadius: 10,color: 'green',  fontWeight:'bold'}}>BAIXA</label>
                </div>
            );
        }else if(rowData.prioridade == "M"){
            return (
                <div>
                    <label style={{borderRadius: 10,color: 'orange',  fontWeight:'bold'}}>MÉDIA</label>
                </div>
            );
        }else if(rowData.prioridade == "A"){
            return (
                <div>
                    <label style={{borderRadius: 10,color: 'red',  fontWeight:'bold'}}>ALTA</label>
                </div>
            );
        }else if(rowData.prioridade == "U"){
            return (
                <div>
                    <label style={{borderRadius: 10,color: '#8B0000',  fontWeight:'bold'}}>URGENTE</label>
                </div>
            );
        }
    }

    prioridadeEditorTemplate = (props, field) =>  {
        if(this.bloquearAtualizacao === false ){
            this.bloquearAtualizacao = true;
             console.log("bloqueia atualização")
        }
        let prioridades = [
            { value: 'B'},
            { value: 'M'},
            { value: 'A'},
            { value: 'U'}
        ];
        return (
            <Dropdown  
                options={prioridades} 
                placeholder="selecione"
                optionLabel="value" 
                value={ { value: props.rowData.prioridade } }  
                onChange={(e) => {
                    this.onEditorValueChange(props, e.value.value);
                    let auxErros = [...props.value];
                  
                    auxErros[props.rowIndex][props.field] =  e.value.value;
                    
                    auxErros[props.rowIndex]['programaId'] = auxErros[props.rowIndex]['programa'].id;
                    console.log(auxErros[props.rowIndex])

                    if(auxErros[props.rowIndex].id !== null && auxErros[props.rowIndex]['programaId'] > 0){
                        console.log("ir para salvar")
                        console.log(auxErros[props.rowIndex])
                        this.salvarErro(auxErros[props.rowIndex]);
                    }
                }} 
    
            />
        );
    }
    
    qualidadeTemplate = (rowData, column) =>{
        if(this.state.usuarioLogado !== null && this.state.usuarioLogado.perfil !==null && this.state.usuarioLogado.perfil.perfil !== null && this.state.usuarioLogado.perfil.perfil !== undefined && this.state.usuarioLogado.perfil.perfil === "Q"){
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
        if(this.bloquearAtualizacaoPorDescricao === true){
            this.bloquearAtualizacaoPorDescricao = false;
             console.log("desbloqueia atualização por descricao")
        }
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
/*
    //Template para descrição 
    descricaoEditorTemplate = (props, field) => { 
        if(this.bloquearAtualizacaoPorDescricao === false ){
            this.bloquearAtualizacaoPorDescricao = true;
             console.log("bloqueia atualização por descricao")
        }
        return (
            <InputTextarea autoResize={true} 
     
                rows={5} style={{width:'100%'}}
                onChange={(e) => this.onEditorValueChange(props, e.target.value)} 

                onKeyDown={(e) => { 
                    this.bloquearAtualizacaoPorDescricao = true;
                    console.log("bloqueia atualização por descricao");

                    if(e.keyCode == 13){
                        let auxErros = [...props.value];
                        auxErros[props.rowIndex][props.field] = e.target.value;
                        auxErros[props.rowIndex]['programaId'] = auxErros[props.rowIndex]['programa'].id;
                        this.salvarErro(auxErros[props.rowIndex])
                    }
                }}
                onBlur={(e) =>  { 
                    let auxErros = [...props.value];
                    auxErros[props.rowIndex][props.field] = e.target.value;
                    auxErros[props.rowIndex]['programaId'] = auxErros[props.rowIndex]['programa'].id;
                    this.salvarErro(auxErros[props.rowIndex])
                }}

                value={props.rowData.descricao.replace(/<.*?>/g, '')}
        /> 
        );
    }*/

    actionTemplate = (rowData, column) => { 
            return (
                <div>
                    <Button 
                        onClick={ ()=>{  
                                    this.setState({modalVisibleImagem: true, imagemErro: rowData});
                                }
                            } 
                        type="button" icon="pi pi-image"  style={{margin: 1}}>
                    </Button>    
                    <Button 
                        onClick={ ()=>{
                                 
                                    this.setState({erroSelecionado:rowData , modalVisible: true});
                                }
                            } 
                        type="button" icon="pi pi-pencil"  style={{margin: 1}}></Button>   
                            
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
                        type="button" icon="pi pi-calendar"  style={{marginRight: '.5em'}}></Button>           
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
                return (<div><label>Aguardando reanalise C/ tester</label></div>) 
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
                return (<div><label>CANCELADO</label></div>) 
                break;
        }
    }

    onChange = (current, props) => {
        console.log('onChange:', current);
        this.setState({ statusCurrent: current });
        console.log(this.itens[current])
        console.log(props.rowData)

        this.onEditorValueChange(props, this.itens[current]);

        let auxErros = [...props.value];
        auxErros[props.rowIndex][props.field] = {id: 1, status: this.itens[current].value };
        auxErros[props.rowIndex]['programaId'] = auxErros[props.rowIndex]['programa'].id;

        this.salvarErroEAtualizar(auxErros[props.rowIndex]);

        console.log(auxErros[props.rowIndex]);
    };

    auxCurrentStatus = 10;
    itens = [];

    templateEditorStatus = (props, field)=>{
        if(this.state.usuarioLogado !== null ){
            console.log(props.field)
            this.auxCurrentStatus = 10;
            let status = props.rowData.status.status;
            this.itens = ListarStatus(this.state.usuarioLogado, status);
            
            if(this.itens === undefined || this.itens.length ===0 ) {this.itens = [{label: status.replace('_', ' '), value: status}]  ; } 

            this.itens.map(( item, key)=>{
                console.log(item.value, status)

                if(item.value === status){ this.auxCurrentStatus = key; console.log(item.value) }
            })
 
            return(
                <Steps labelPlacement="vertical" current={this.auxCurrentStatus} onChange={(current) => this.onChange(current, props)} style={{ width: '100%' }}>
                    { 
                    this.itens.map(( item, key)=>{
                        
                        return (<Step key={key} description={item.label}     />);
                    })
                    }
                    
                </Steps>
            )

        }else{return null;}
    }

     //----------------------------- TEMPLATES  FIM -----------------------------------------

    render(){
        let add =  <div> <div style={{textAlign:'left'}}><Button type="button" icon="pi pi-external-link" iconPos="left" label="CSV" onClick={this.export}/> </div> <div style={{textAlign:'center'}}>{ this.state.usuarioLogado !== null &&  this.state.usuarioLogado.perfil.perfil === "A" ? <Button icon="pi pi-plus" style={{padding:5}} onClick={()=>{ this.setState({erroSelecionado: [] , modalVisible: true}); }}/> : null }</div> </div>;
       
        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <div className="content-section implementation">
                    <DataTable  header={add} paginator={true}  rows={5} rowsPerPageOptions={[5,10,20]} value={this.state.erros} responsive={true} ref={(el) => { this.dt = el; }} >
                        {/*<Column field="id" header="ID" sortable={true}  style={{width:'5%'}}/> */}
                        <Column field="dataproblema" header="Data" style={{width:'8%'}} />
                        <Column editor={this.prioridadeEditorTemplate} body={this.prioridadeTemplate} field="prioridade" header="Prioridade"  style={{width:'8%'}}/> 

                        

                        <Column field="programa.nome" header="Programa" sortable={true} style={{width:'10%'}} />

                        <Column editor={this.templateEditorStatus} body={this.templateStatus} field="status" header="Status" style={{width:'26%'}} />  

                        <Column   body={this.descricaoTemplate} field="descricao" header="Descricao" style={{width:'30%'}} />

                        <Column body={this.qualidadeTemplate} field="qualidade" header="Qualidade"style={{width:'8%'}}  />

                        <Column body={this.templatePrazo} header="Prazo" style={{width:'5%', textAlign:'center'}} />
                        <Column body={this.actionTemplate} style={{textAlign:'center', width: '8em'}}  header="Editar" style={{width:'8%', textAlign:'center'}} />  
                    </DataTable>
                </div>
                <ModalImagem limparErroImagem ={this.limparErroImagem } mensagem={this.mensagem} imagemErro={this.state.imagemErro} fecharModal={this.fecharModalImagem} modalVisible={this.state.modalVisibleImagem}/>

                <ModalErros limparErroSelecionado={this.limparErroSelecionado} mensagem={this.mensagem} erro={this.state.erroSelecionado} fecharModal={this.fecharModal} modalVisible={this.state.modalVisible} />
                <ModalPrazo mensagem={this.mensagem} modalPrazoVisible={this.state.modalPrazoVisible} erroId={this.state.erroId} fecharModalPrazo={this.fecharModalPrazo} /> 
            </div>
        );
    }
}

export default TabelaErros;