import React, {Component} from 'react';
import {Chart} from 'primereact/chart';
import {GetChartErros} from '../../servicos/chart';

import {Button} from 'primereact/button';

import {Calendar} from 'primereact/calendar';
import {DateParseString} from '../../util/date_util';

export class ChartErros extends Component {

    constructor(props){
        super(props);
        this.state = {
            ChartErros: null,
            data: [],
            data1: new Date(),
            data2: new Date(),
        }
    }

    buscarDados = () =>{
        let data1 = DateParseString(this.state.data1);
        let data2 = DateParseString(this.state.data2);

        GetChartErros(data1,data2).then((chart)=>{
            this.setState({ChartErros: chart});
            console.log(chart)
            if(this.state.ChartErros !== null){ 
                this.setState({ data: [this.state.ChartErros.pendentes, this.state.ChartErros.analisando, this.state.ChartErros.resolvidos] });
            }
        });
    }
   
    componentDidMount() {        
        this.buscarDados();
    }
    

    render() {
        const data = {
            labels: ['Pendente', 'Analisando','Resolvido'],
            datasets: [
                {
                    data: this.state.data,
                    backgroundColor: [
                        "#FFCE56",
                        "#FF6384",                       
                        
                        "#36A2EB"
                    ],
                    hoverBackgroundColor: [
                        "#FFCE56",
                        "#FF6384",
                        
                        "#36A2EB"
                        
                    ]
                }]    
            };
        
        let add =  <div style={{textAlign:'left'}}>  <div style={{textAlign:'center'}}>   <Calendar dateFormat="dd/mm/yy" value={this.state.data1} onChange={(e) => this.setState({data1: e.value}, ()=>{this.buscarDados()} )}/> <Calendar dateFormat="dd/mm/yy" value={this.state.data2} onChange={(e) => this.setState({data2: e.value}, ()=>{this.buscarDados()}) }/>   <Button icon="pi pi-search" onClick={()=>{this.buscarDados();}} className="p-button-warning"/></div> </div> ;
       
        return (
            <div >
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Erros registrados</h1>
                        <p>{add}</p>
                    </div>
                </div>

                <div style={{maxWidth: '900px', marginLeft: 'auto', marginRight:'auto' }} className="content-section implementation">
                    <Chart style={{alignItems:'center'}} type="doughnut" data={data} />
                </div>

            
            </div>
        )
    }
}