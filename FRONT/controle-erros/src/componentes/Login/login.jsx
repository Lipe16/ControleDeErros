import React from 'react';
import {Panel} from 'primereact/panel';

import {InputText} from "primereact/inputtext";
import {Password} from 'primereact/password';


import {Button} from 'primereact/button';

import {ObterToken} from '../../servicos/usuario';

import {Growl} from 'primereact/growl';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            senha:  '',
            carregando:false,
        };
    }

    
    eEmail = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regex = new RegExp(reg);
  
          return regex.test(this.usuario.email);
  
    }

    usuario = {
        email:'',senha:''
    }

    limparUsuario = ()=>{this.usuario.email=''; this.usuario.senha=''}

    login = ()=>{
        this.limparUsuario();

        this.usuario.email = this.state.email;
        this.usuario.senha = this.state.senha;

        if(this.usuario.email === '' && this.usuario.senha === ''){
            this.growl.show({severity: 'error', summary: 'Erro', detail:'email ou senha faltando'});
        }else if(!this.eEmail()){
            this.growl.show({severity: 'error', summary: 'Erro', detail:'email incorreto'});
        }else{

            ObterToken(this.usuario).then((retorno)=>{
                console.log(retorno.access_token)
                if(retorno.access_token !== null && retorno.access_token !== undefined){
                    
                    this.growl.show({severity: 'success', summary: 'OK', detail:'Login permitido'});
                    sessionStorage.setItem('token', retorno.access_token);
                    window.location.href= "/";

                }else{
                    this.growl.show({severity: 'error', summary: 'Erro', detail:'Falha no login'});
                }
            });
        }
    }


    render(){

    return (
            <Panel header="Login" style={{marginTop:'30%'}}>
                    <Growl ref={(el) => this.growl = el} />
                    <br/>
                    <div className="p-grid p-fluid" >
                        <div className="p-col-12 p-md-4">

                            
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText onKeyPress={(e)=>{ if(e.which === 13) {this.login()}  }} value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}  placeholder="Email" />
                            </div>

                            <br/>

                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-key"></i>
                                </span>
                                <Password strongLabel="Senha top!" promptLabel="Insira uma senha" weakLabel="senha fraca" mediumLabel="senha média" value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})} onKeyPress={(e)=>{ if(e.which === 13) {this.login()}  }} />
                            </div>

                            <br/><br/><br/><br/>
                            <Button onClick={this.login} onSubmit={this.login}  label="Logar"  />
                       
                        </div>
                    </div>
            </Panel>
            );
    }
}

export default Login;