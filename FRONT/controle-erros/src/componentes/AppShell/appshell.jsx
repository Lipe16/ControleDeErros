import React from 'react';

import {Route} from 'react-router-dom';
import Home from '../Home/home';
import TabelaErros from '../TabelaErros/tabela_erros';
import TabelaUsuarios from '../TabelaUsuarios/tabela_usuarios';

import TabelaProgramas from '../TabelaProgramas/tabela_programas';
import TabelaSubSetores from '../TabelaSubSetores/tabela_subsetores';

import Login from '../Login/login';
import TabelaKardex from '../kardexErros/tabela_kardex';
import TabelaLog from '../TabelaLog/tabela_log';
import TabelaErrosResolvidos from '../TabelaErrosResolvidos/tabela_erros_resolvidos';
import { ChartErros } from '../Chart/chart_erros';


class AppShell extends React.Component{
    render(){
        return (
            <div>
                <Route exact path="/" component={TabelaErros} />
                <Route exact path="/tabelaErros" component={TabelaErros} />
                <Route exact path="/tabelaErrosResolvidos" component={TabelaErrosResolvidos} />
                <Route exact path="/tabelaUsuarios" component={TabelaUsuarios} />
                <Route exact path="/tabelaProgramas" component={TabelaProgramas} />
                <Route exact path="/tabelaSubSetores" component={TabelaSubSetores} />
                <Route exact path="/kardex" component={TabelaKardex} />
                <Route exact path="/log" component={TabelaLog} />
                <Route exact path="/chartErros" component={ChartErros} />
            </div>
        );
    }
}

export default AppShell;