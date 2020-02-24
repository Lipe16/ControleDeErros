import React from 'react';
import imagem from '../../imagens/rocket.gif';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            token: '',
        };
    }


    componentDidMount(){
        this.verificaToken();
    }

    verificaToken =()=>{
        var tokenAux = sessionStorage.getItem("token");
        if(tokenAux  !== undefined && tokenAux  !== null && tokenAux  !==  ''){
            this.setState({token:tokenAux  });

        }else{ window.location.href= "/";}
        
    }

    render(){

    return (
                <div >
                    <div style={{width: 400, marginLeft: 'auto', marginRight:'auto'}}>
                        <img  style={{width: 400 }} src={imagem}/>
                    </div>
                </div>
            );
    }
}

export default Home;