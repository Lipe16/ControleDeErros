import getAPI from './links';

const token = sessionStorage.getItem("token");

export const ObterToken= (usuario)=>{ 
    return fetch(getAPI()+"oauth/token?grant_type=password&username="+usuario.email+"&password="+encodeURIComponent(usuario.senha),{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          'Authorization':'Basic Y2xpZW50ZToxMjM='}
      })
    .then((response) => { return response.json();})
}


export const UsuarioLogado= ()=>{ 
    return fetch(getAPI()+"usuario",{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization':'Bearer '+token}
      })
    .then((response) => { return response.json();})
}

export const GetUsuarios= ()=>{ 
    return fetch(getAPI()+"usuarios",{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization':'Bearer '+token}
      })
    .then((response) => { return response.json();})}


    export const salvarUsuario = (data)=>{
        
        return fetch(getAPI()+"usuario/",{
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