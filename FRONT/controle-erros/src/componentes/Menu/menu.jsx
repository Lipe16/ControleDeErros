import React from 'react';
import {PanelMenu} from 'primereact/panelmenu';
import {SlideMenu} from 'primereact/slidemenu';
import {Menu} from 'primereact/menu';

import {Button} from 'primereact/button';
import {Sidebar} from 'primereact/sidebar';
import {UsuarioLogado} from '../../servicos/usuario';


import '../../App.css';


class MenuComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            usuarioLogado: null
        };
    }

    CarregarUsuarioLogado(){
        UsuarioLogado().then((auxUsuario)=>{
            this.setState({usuarioLogado:auxUsuario});
        });
    }

    componentDidMount() {
        this.CarregarUsuarioLogado();
    }

    
    items = []



    render(){
        let perfil = this.state.usuarioLogado !== null ? this.state.usuarioLogado.perfil.perfil : '';

        if(perfil === 'P'){
            this.items = [
        
                {label: 'Erros', icon: 'pi pi-fw pi-list',command:()=>{ window.location.hash="/tabelaErros"; this.setState({visible: false});}},
                {label: 'Consultar erros resolvidos', icon: 'pi pi-fw pi-info',command:()=>{ window.location.hash="/tabelaErrosResolvidos"; this.setState({visible: false});}},
                {label: 'Usuarios', icon: 'pi pi-fw pi-users',command:()=>{ window.location.hash="/tabelaUsuarios";this.setState({visible: false}); }},
                {label: 'Programas', icon: 'pi pi-fw pi-th-large',command:()=>{ window.location.hash="/tabelaProgramas";this.setState({visible: false}); }},
                {label: 'Gráfico', icon: 'pi pi-chart-bar',command:()=>{ window.location.hash="/chartErros";this.setState({visible: false}); }},
                {
                    separator:true
                 },
                {label: 'Sair', icon: 'pi pi-fw pi-cog', command:()=>{ sessionStorage.removeItem("token") ;window.location.href="/"; }}
            ]
        }else if(perfil === 'A'){
            this.items = [
                {label: 'Erros', icon: 'pi pi-fw pi-list',command:()=>{ window.location.hash="/tabelaErros"; this.setState({visible: false});}},
                {label: 'Consultar erros resolvidos', icon: 'pi pi-fw pi-info',command:()=>{ window.location.hash="/tabelaErrosResolvidos"; this.setState({visible: false});}},
                {label: 'Gráfico', icon: 'pi pi-chart-bar',command:()=>{ window.location.hash="/chartErros";this.setState({visible: false}); }},
                {
                    separator:true
                 },
                {label: 'Sair', icon: 'pi pi-fw pi-cog', command:()=>{ sessionStorage.removeItem("token") ;window.location.href="/"; }}
            ]
        }else if(perfil === 'T'){
            this.items = [
                {label: 'Erros', icon: 'pi pi-fw pi-list',command:()=>{ window.location.hash="/tabelaErros"; this.setState({visible: false});}},
                {label: 'Consultar erros resolvidos', icon: 'pi pi-fw pi-info',command:()=>{ window.location.hash="/tabelaErrosResolvidos"; this.setState({visible: false});}},
                {label: 'Gráfico', icon: 'pi pi-chart-bar',command:()=>{ window.location.hash="/chartErros";this.setState({visible: false}); }},
                {
                    separator:true
                 },
                {label: 'Sair', icon: 'pi pi-fw pi-cog', command:()=>{ sessionStorage.removeItem("token") ;window.location.href="/"; }}
            ]
        }else if(perfil === 'Q'){
            this.items = [
                {label: 'Erros', icon: 'pi pi-fw pi-list',command:()=>{ window.location.hash="/tabelaErros"; this.setState({visible: false});}},
                {label: 'Consultar erros resolvidos', icon: 'pi pi-fw pi-info',command:()=>{ window.location.hash="/tabelaErrosResolvidos"; this.setState({visible: false});}},
                {label: 'Programas', icon: 'pi pi-fw pi-th-large',command:()=>{ window.location.hash="/tabelaProgramas";this.setState({visible: false}); }},
                {label: 'Kardex', icon: 'pi pi-fw pi-search',command:()=>{ window.location.hash="/kardex";this.setState({visible: false}); }},
                {label: 'Log', icon: 'pi pi-fw pi-folder-open',command:()=>{ window.location.hash="/log";this.setState({visible: false}); }},
                {label: 'Gráfico', icon: 'pi pi-chart-bar',command:()=>{ window.location.hash="/chartErros";this.setState({visible: false}); }},
                {
                    separator:true
                 },
                {label: 'Sair', icon: 'pi pi-fw pi-cog', command:()=>{ sessionStorage.removeItem("token") ;window.location.href="/"; }}            
            ]
        }else{
            this.items = [
                {label: 'Erros', icon: 'pi pi-fw pi-list',command:()=>{ window.location.hash="/tabelaErros"; this.setState({visible: false});}},
                {label: 'Consultar erros resolvidos', icon: 'pi pi-fw pi-info',command:()=>{ window.location.hash="/tabelaErrosResolvidos"; this.setState({visible: false});}},
                {label: 'Usuarios', icon: 'pi pi-fw pi-users',command:()=>{ window.location.hash="/tabelaUsuarios";this.setState({visible: false}); }},
                {label: 'Programas', icon: 'pi pi-fw pi-th-large',command:()=>{ window.location.hash="/tabelaProgramas";this.setState({visible: false}); }},
                {label: 'SubSetores', icon: 'pi pi-fw pi-filter',command:()=>{ window.location.hash="/tabelaSubSetores";this.setState({visible: false}); }},
                {label: 'Kardex', icon: 'pi pi-fw pi-search',command:()=>{ window.location.hash="/kardex";this.setState({visible: false}); }},
                {label: 'Log', icon: 'pi pi-fw pi-folder-open',command:()=>{ window.location.hash="/log";this.setState({visible: false}); }},
                {label: 'Gráfico', icon: 'pi pi-chart-bar',command:()=>{ window.location.hash="/chartErros";this.setState({visible: false}); }},
                {
                    separator:true
                 },
                {label: 'Sair', icon: 'pi pi-fw pi-cog', command:()=>{ sessionStorage.removeItem("token") ;window.location.href="/"; }}            
            ]
        }

    return (
            <div >
                <Sidebar style={{ padding:0 , margin:0}} className="ui-sidebar-sm" 

                    visible={this.state.visible} onHide={(e) => this.setState({visible:false})}
                 >
            
                    <Menu  model={this.items} style={{width: '100%', padding:0 , margin:0}}/>
                   
                </Sidebar>
                
                <Button icon="pi pi-bars" onClick={(e) => this.setState({visible:true})}/>

               
            </div>
            );
    }
}

export default MenuComponent;