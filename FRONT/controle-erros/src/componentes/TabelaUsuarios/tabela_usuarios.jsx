import React from 'react';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

import {Button} from 'primereact/button';

import {GetUsuarios, UsuarioLogado, salvarUsuario} from '../../servicos/usuario';


import {Dialog} from 'primereact/dialog';
import {InputText} from "primereact/inputtext";



import {SelectButton} from 'primereact/selectbutton';



import {Password} from 'primereact/password';
import {Growl} from 'primereact/growl';

class TabelaUsuarios extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            usuarios:[],
            token:'',
            usuario: [],
            id: null,
            nome:'',
            email:'',
            perfil:'',
            senha:'',
            resenha:'',
            visible:false
        };
    }


    perfil = [
        {label: 'ANALISTA', value: 'A'},
        {label: 'PROGRAMADOR', value: 'P'},
        {label: 'TESTADOR', value: 'T'},
        {label: 'QUALIDADE', value: 'Q'},
        {label: 'GERENTE', value: 'G'},

    ];

    alteraPerfil(perfil){
        let auxPerfil = {perfil: perfil, id: 0};
        this.setState({perfil: auxPerfil});
    }
    

    
    componentDidMount() {
        UsuarioLogado().then((data)=>{
            this.setState({usuario:data});
        });

        GetUsuarios().then((data)=>{
  
                this.setState({
                    usuarios: data,
                    id:null
                });
        });        
    }

    usuario = {
        id:null,
        perfil:'',
        nome:'',
        email:'',
        senha:'',
        resenha:''
        

    
    }

    limparUsuario =()=>{
        this.usuario.id =null;
        this.usuario.perfil ='';
        this.usuario.nome = '';
        this.usuario.email='';
        this.usuario.senha='';
        this.usuario.resenha='';

    }

    mensagemErro =(text)=>{
        this.growl.show({severity: 'error', summary: 'Erro', detail: text});
    }


    enviar = ()=>{
        this.limparUsuario();
        this.usuario.id = this.state.id;
        this.usuario.nome = this.state.nome;
        this.usuario.email = this.state.email;
        this.usuario.senha = this.state.senha;
        this.usuario.resenha = this.state.resenha;
        this.usuario.perfil = this.state.perfil;

   

        if(this.usuario.perfil === ''){
            this.mensagemErro("perfil faltando"); 
        }else if(this.usuario.email === ''){
            this.mensagemErro("email faltando"); 
        }else if(this.usuario.nome === ''){
            this.mensagemErro("nome faltando"); 
        }else if(this.usuario.senha  !== this.usuario.resenha ){
            this.mensagemErro("Senha de confirmação difere da senha");  
        }else if((this.usuario.id === null) && (this.usuario.senha === null || this.usuario.senha ==="")){

            this.mensagemErro("Usuarios novos precisam de senha"); 
        }else if(this.usuario.senha !== null && (!this.usuario.senha ==="")){
            if(this.usuario.senha.length < 4){
                this.mensagemErro("Se vai alterar senha, ela deve ser maior que 4 caracteres"); 
            }else{
                this.usuario.id = this.usuario.id === null ? 0 :this.usuario.id;
                salvarUsuario(this.usuario).then((retorno)=>{
                        this.abrirModal();
                        this.growl.show({severity: 'success', summary: 'Successo', detail: 'Usuario salvo/editado!'});
                        let encontrado = false;
                        let auxUsuarios = this.state.usuarios;
                        let auxUsuarios2 = this.state.usuarios;
                        console.log(this.usuario)
                        auxUsuarios.map((usuario, i)=>{
                            if(retorno.id === usuario.id){
                                encontrado = true;
                                auxUsuarios2[i] = retorno;
                                this.setState({usuarios: auxUsuarios2});
                            }
                        });
                    
        
                        if(!encontrado)
                            this.setState({usuarios: [retorno ,...auxUsuarios2]});

                    
                }); 
            }
        }else{
            this.usuario.id = this.usuario.id === null ? 0 :this.usuario.id;
            salvarUsuario(this.usuario).then((retorno)=>{
                if(retorno.error === null || retorno.error === undefined){

                    this.abrirModal();
                    this.growl.show({severity: 'success', summary: 'Successo', detail: 'Usuario salvo/editado!'});
                    let encontrado = false;
                    let auxUsuarios = this.state.usuarios;
                    let auxUsuarios2 = this.state.usuarios;
                    auxUsuarios.map((usuario, i)=>{
                        if(retorno.id === usuario.id){
                            encontrado = true;
                            auxUsuarios2[i] = retorno;
                            this.setState({usuarios: auxUsuarios2});
                        }
                    });

                    if(!encontrado)
                        this.setState({usuarios: [retorno ,...auxUsuarios2]});
                }else{
                    this.growl.show({severity: 'error', summary: 'Erro', detail: retorno.error}); 
                }
                
            });
        }
    }
    

    footer = ()=>{
        return(
        <div>
            <Button label="Salvar" icon="pi pi-check" onClick={ this.enviar}  />
            <Button label="Cancelar" icon="pi pi-times" onClick={ this.abrirModal} />
        </div>
        );
    }

    modal= ()=>{
        return(
            <Dialog style={{width: window.innerWidth < 800 ? '80vw': '30vw' }}  footer={this.footer()} header="Usuario" visible={this.state.visible}  modal={true} onHide={() => this.setState({visible: false})}>

                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-8">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-bell"></i>
                                </span>
                                <SelectButton 
                                    value={this.state.perfil !== null ? this.state.perfil.perfil : null  } onChange={(e) => {this.alteraPerfil(e.target.value);}}
                                    options={this.perfil} ></SelectButton>
                            </div>

                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText 
                                    value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})}
                                    placeholder="Nome" />
                            </div>

                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText 
                                    value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}
                                    placeholder="Email" />
                            </div>

                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-key"></i>
                                </span>
                                <Password value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})}  />
                            </div>

                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-key"></i>
                                </span>
                                <Password value={this.state.resenha} onChange={(e) => this.setState({resenha: e.target.value})}  />
                            </div>



                        </div>
                    </div>
                    
            </Dialog>
        )
    }

    data ={data:[]}

    limparData(){

        this.data.data = {
            id: null,
            perfil: '',
            nome: '',
            email: '',
            senha: '',
            resenha: '',
        }
    }
    
    popularModal = ()=>{

        this.setState({
            id: this.data.data.id!==null?this.data.data.id:null,
            perfil: this.data.data.perfil!==null?this.data.data.perfil:"",
            nome: this.data.data.nome!==null?this.data.data.nome:"",
            email: this.data.data.email!==null?this.data.data.email:"",
            senha: this.data.data.senha!==null?this.data.data.senha:"",
            resenha: this.data.data.resenha!==undefined?this.data.data.resenha:"",
             });

    }


    actionTemplate = (rowData, column) => { 
        let auxPerfil =  this.state.usuario.perfil !== undefined ? this.state.usuario.perfil.perfil : "";
        if(auxPerfil === "G"){
            return (
                <div>
                    <Button 
                        onClick={ ()=>{
                            this.limparData();
                            
                            this.data.data = rowData;
                            this.popularModal();
                            this.abrirModal();
                                }
                            } 
                        type="button" icon="pi pi-pencil" className="p-button-success" style={{marginRight: '.5em'}}></Button>           
                </div>
            );
        }else{

        }
    }

    abrirModal = ()=>{
    
        this.setState({visible:!this.state.visible});

    }

render(){

    let add = (this.state.usuario.perfil !== undefined)  && (this.state.usuario.perfil.perfil === "G") ? <Button icon="pi pi-plus" style={{padding:5}} onClick={()=>{  this.limparData();this.popularModal();this.abrirModal()}}/> :null;
   
    return (
        <div>
            <Growl ref={(el) => this.growl = el} />
            <div className="content-section implementation">
                <DataTable responsive={true} resizableColumns={true} header={add} value={this.state.usuarios} paginator={true}  rows={10} rowsPerPageOptions={[5,10,20]}>
                    <Column field="id" header="Id" filter={true} />   
                    <Column field="nome" header="Nome" filter={true} />           
                    <Column field="email" header="email" filter={true} /> 
                    
                    <Column body={this.actionTemplate} style={{textAlign:'center', width: '8em'}} />             
                </DataTable>
            </div>
            {this.modal()}
        </div>
    );
}
}

export default TabelaUsuarios;