import React from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';


import {getSetores} from '../../servicos/setor';
import { salvarSubSetor } from '../../servicos/subSetor';

class ModalSubSetor extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id:0,
            descricao:'',
            setor:[],
            setores:[]
        };
    }


    visible = false;

    limparDados(){
        this.setState({
            id:0,
            descricao:'',
            setor:[],
            setores:[],
            heigth: 400,
        });
    }

    componentDidMount() {
        
        this.setState({heigth: window.innerHeight - 60}); 
    }
    
    componentWillReceiveProps(nextProps){
        this.limparDados();
        this.carregarSetores();
        this.visible = nextProps.visible;
        if(this.props.visible !== nextProps.visible && nextProps.subSetorSelecionado.id !== null && nextProps.subSetorSelecionado.id > 0 ){
          
            this.setState({
                id: nextProps.subSetorSelecionado.id,
                descricao:nextProps.subSetorSelecionado.descricao,
                setor:nextProps.subSetorSelecionado.setor,

            },()=>{
                console.log(this.state.checklistModelo)
                
            });
        }
    }

    aptoParaSalvar = true;

    subsetor = {
        id:0,
        descricao:'',
        setor:[],
    }
    salvarSubSetor = ()=>{
        this.aptoParaSalvar = true;

        this.subsetor.id = this.state.id; 
        this.subsetor.setor = this.state.setor; 
        this.subsetor.descricao = this.state.descricao; 


        if(this.subsetor.setor.length === 0){
            this.aptoParaSalvar = false;
            this.props.mensagem( 'error', 'Erro', 'verifique o campo setor!');
        }
        if(this.subsetor.descricao === "" && this.subsetor.descricao === null){
            this.aptoParaSalvar = false;
            this.props.mensagem( 'error', 'Erro', 'verifique o campo nome do subSetor!');
        }

        console.log(this.subsetor);

        if(this.aptoParaSalvar){
            
            salvarSubSetor(this.subsetor).then((retorno)=>{
                console.log(retorno);
                this.props.mensagem( 'success', 'OK', 'Registro salvo!');
                this.props.fecharModal();
                this.props.atualizarSubSetores();
            });
        }

    }

    carregarSetores = () =>{
        getSetores().then((data)=>{
            console.log(data)
            this.setState({setores: data});
        });
    }

    

    footer = ()=>{
        return(
        <div>
            <Button label="Salvar" icon="pi pi-check" onClick={()=>{ this.salvarSubSetor() ; } }  />
            <Button label="Cancelar" icon="pi pi-times" onClick={()=>{this.props.fecharModal();}} />
        </div>
        );
    }
    


    render(){
        return (
            <Dialog responsive={true} style={{width: window.innerWidth < 800 ? '100vw': '50vw', minHeight: this.state.heigth - 50 }}
                    footer={this.footer()} header="Programa" visible={this.visible}
                    modal={true} onHide={() => { this.props.fecharModal();  } }>  

                <div style={{maxHeight: window.innerHeight - 50, overflow:'scroll', minHeight: this.state.heigth - 50}}>
                    
                    <span style={{marginTop: 15, display: 'block' }}>
                        <label style={{ marginTop: 5, display: 'block' }}>Setor</label>
                        <Dropdown filter={true}  optionLabel="descricao" value={this.state.setor} options={this.state.setores} onChange={(e) => {this.setState({setor: e.value})}} placeholder="Selecione um setor"/>
                    </span > 

                    <span style={{marginTop: 15, display: 'block' }}>
                        <label style={{ marginTop: 5, display: 'block' }}>Descrição</label>
                        <InputText style={{marginTop: 5, display: 'block' }} value={this.state.descricao !== null && this.state.descricao !== undefined ? this.state.descricao : '' } onChange={(e) => { this.setState({descricao: e.target.value})} }  />
                    </span > 



                

                </div>

            </Dialog>
        );
    }
}

export default ModalSubSetor;