import React from 'react';

import './App.css';



import {HashRouter} from 'react-router-dom';
import AppShell from './componentes/AppShell/appshell';
import Topo from '../src/componentes/Topo/topo';
import MenuComponent from '../src/componentes/Menu/menu';

//import '../node_modules/primereact/resources/themes/nova-light/theme.css';
import '../node_modules/primereact/resources/themes/nova-dark/theme.css';
import '../node_modules/primereact/resources/primereact.min.css';
import '../node_modules/primeicons/primeicons.css';
import Login from './componentes/Login/login';

function App() {

    var logado = false;

    var verificaToken =()=>{
        var token = sessionStorage.getItem('token');
        if(token !== undefined && token !== null && token !==  '')
            logado = true
    }

    verificaToken();


    if(logado){
        return (
                <div style={{ clear: 'both',display:'block'}}>
                    <div >
                        <Topo/>
                        <div style={{ clear: 'both',display:'block'}}>
                            <div>
                                <MenuComponent />
                            </div>
                            <div style={{margin: '10px' }}>
                                <HashRouter >
                                    <AppShell/>          
                                </HashRouter>
                            </div>
                        </div>
                    </div>
                </div>
        );
        }else{
            
            return(
                <div style={{ clear: 'both', width:300,marginLeft: 'auto', marginRight: 'auto'}}>
                    <div >
                        <Login></Login>
                    </div>
                </div> 
            )  
        }
}

export default App;
