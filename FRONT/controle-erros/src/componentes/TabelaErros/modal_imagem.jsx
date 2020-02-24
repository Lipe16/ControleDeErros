import React from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';



import {FileUpload} from 'primereact/fileupload';
import FileBase64 from 'react-file-base64';
import {Lightbox} from 'primereact/lightbox';

import {getServidorDeImagens} from '../../servicos/links';


import {EnviarImagem, GetURLImagens} from '../../servicos/erros';


class ModalImagem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            usuarioLogado: {id: 1, nome: "AUX TESTE", perfil: {id:0, perfil: 'A'}, email: "auxteste@teste.com"},
            heigth: 300,
            bloquearbotaoSalvar: true,

            erro:[],
            imagemErro:'',
            visibleModalImagem:false,
            imagem64:null,
            imagensURI:[]
        };
    }

    visible;




    componentWillReceiveProps(nextProps){
        this.visible = nextProps.modalVisible;
        if(nextProps.imagemErro !== null ){
            this.setState({erro: nextProps.imagemErro});
            this.carregarImagens(nextProps.imagemErro.id);

            
        }
    }

    carregarImagens(id){
        GetURLImagens(id).then((data)=>{
            var z =[];
            if(data.length > 0)
            data.map((aux)=>{          
                if(aux.match(/_/)){
                }else{
                    var y = {source:'', thumbnail:'',title:'imagem do erro'}
                    console.log(aux)
                    y.source = getServidorDeImagens()+id+"/"+aux;
                    console.log(y)
                    y.thumbnail = getServidorDeImagens()+id+"/"+aux.split(".")[0]+"_pequena.jpg";
                    z.push(y);
                }
            });
            this.setState({imagensURI: z});console.log(z)
        });
    }



    enviarImagem = ()=>{
        var auxImagem64 = this.state.imagem64;
        if(auxImagem64 != null){
            let aux = this.state.erro.id;
            let imagemAux = {img : auxImagem64, codErro: aux };

            console.log(imagemAux);
            EnviarImagem(imagemAux).then(()=>{
                this.carregarImagens(aux);
                this.setState({imagem64:null});
              
            });
        }else{
            //this.mensagemErro("A imagem deve ser JPG(image/jpeg), favor tentar novamente.");
            //this.mensagemErro("nenhuma imagem selecionada, favor tentar novamente."); 
        }
    }

    getFiles(base64){
        if(base64.type == "image/jpeg"){
            console.log(base64)
            this.setState({imagem64:base64.base64});
        }else{
            this.setState({imagem64:null});
            this.mensagemErro("A imagem deve ser JPG(image/jpeg), favor tentar novamente."); 
        }
    }





    visible = false;
    aptoParaSalvar = true;



    footer = ()=>{
        return(
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={()=>{  this.props.fecharModal();}} />
        </div>
        );
    }

    render(){

        return (
            <Dialog responsive={true} style={{width: window.innerWidth < 800 ? '100vw': '50vw', minHeight: this.state.heigth - 80 }}
                    footer={this.footer()} header="Prazo" visible={this.visible}
                    modal={true} onHide={() => { this.props.fecharModal();  } }>  

                <div style={{maxHeight: window.innerHeight - 140, overflow:'scroll', minHeight: this.state.heigth - 140}}>

                    <div className="content-section implementation">
                        <label>Código do erro: { this.state.erro.id }</label><br />

            
                        <FileBase64
                            multiple={ false }
                            onDone={ this.getFiles.bind(this) } />
                            <img style={{width:80}} src={this.state.imagem64} />

                        <br />
                        { this.state.imagem64 != null ?<Button  onClick={this.enviarImagem} label="salvar"/> :"" }
                    </div>
            
                    <br/>

                    <h3 className="first">Imagens</h3>
                    <Lightbox  modal={false} type="images" easing="ease-in" effectDuration="200ms" images={this.state.imagensURI} />
            
    
                </div>
            </Dialog>
        );
    }
}

export default ModalImagem;