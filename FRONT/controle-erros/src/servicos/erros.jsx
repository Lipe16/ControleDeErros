import getAPI from './links';

    const token = sessionStorage.getItem("token");


    export const getErros = ()=>{
        return fetch(getAPI()+"erros",{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token}})
        .then((response) => { return response.json();})
    }

    export const getErrosPorData = (data1, data2)=>{
        return fetch(getAPI()+"erros/data?dataUm="+data1+"&dataDois="+data2,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token}})
        .then((response) => { return response.json();})
    }

    export const getErro = (id)=>{
        return fetch(getAPI()+"erro/"+id,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token}})
        .then((response) => {  return response.json();})
    }

    export const salvarErro = (data)=>{
        console.log("serviço de salvar erro");
        console.log(data);
        return fetch(getAPI()+"erro/",{
            method:'POST',
            mode: 'cors',
            headers:{
            'Access-Control-Allow-Origin':'*',
              'Content-Type':'application/json',
              'Authorization':'Bearer '+token},
              'body':JSON.stringify(data)
          })
        .then((response) => { return response.json();})
    }

    export const EnviarImagem = (data)=>{
        return fetch(getAPI()+"erro/imagem",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token},
                'body':JSON.stringify(data)
            })
        .then((response) => {   return response.json();})
    }

    export const GetURLImagens = (id)=>{
        return fetch(getAPI()+"erros/imagem/"+id,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token}
            })
        .then((response) => {  return response.json();})
    }

    export const salvarErroQualidade = (erro)=>{
        
        return fetch(getAPI()+"erro/qualidade/",{
            method:'POST',
            mode: 'cors',
            headers:{
            'Access-Control-Allow-Origin':'*',
              'Content-Type':'application/json',
              'Authorization':'Bearer '+token},
              'body':JSON.stringify(erro)
          })
        .then((response) => { return response.json();})
    }


