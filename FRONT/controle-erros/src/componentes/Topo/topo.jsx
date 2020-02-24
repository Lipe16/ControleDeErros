import React from 'react';
import {Panel} from 'primereact/panel';
import {UsuarioLogado} from '../../servicos/usuario';
import imagem from '../../imagens/logo.jpg';
import {Toolbar} from 'primereact/toolbar';

class Topo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            usuario: [],
        };
    }

    componentDidMount(){
        UsuarioLogado().then((data)=>{
        
            this.setState({usuario:data});
        });
    }

    
    render(){
    return (
            <div >
                <Panel >
                    <div style={{width:'100%', height:60}}>
                        <img  style={{height: 60 }} src={imagem}/>
                        <div style={{float:'right'}}>

                            
                            <Toolbar style={{backgroundColor: '#e0e0e0'}}>
                                <div className="p-toolbar-group-left" style={{backgroundColor: '#e0e0e0'}}>
                                    <i className="pi pi-fw pi-user" style={{marginRight:'.25em'}} />
                                    <label>Logado como: {this.state.usuario.nome} - {this.state.usuario.perfil != null ? this.state.usuario.perfil.perfil : null}</label>
                                </div>

                            </Toolbar>

                        </div>
                    </div>            
                </Panel>
            </div>
            );
    }
}

export default Topo;