import getAPI from './links';
const token = sessionStorage.getItem("token");

export const getProgramas = (id)=>{
    return fetch(getAPI()+"programas/setor/id?id="+id,{
    method:'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token}})
    .then((response) => {  console.log(response); return response.json();})
}

export const getProgramasPorProgramador = (id)=>{
    return fetch(getAPI()+"programas/programador",{
    method:'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token}})
    .then((response) => {  console.log(response); return response.json();})
}

export const salvarPrograma = (data)=>{
    console.log(data)    
    return fetch(getAPI()+"programa",{
        method:'POST',
        mode: 'cors',
        headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token},
        'body':JSON.stringify(data)
    }).then((response) => { return response.json();})
}