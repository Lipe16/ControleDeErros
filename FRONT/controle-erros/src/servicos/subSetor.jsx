import getAPI from './links';
const token = sessionStorage.getItem("token");

export const getSubSetores = (id)=>{
    return fetch(getAPI()+"subSetores/setor/id?id="+id,{
    method:'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token}})
    .then((response) => {  console.log(response); return response.json();})
}



export const getListSubSetores = ()=>{
    return fetch(getAPI()+"subSetores",{
    method:'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token}})
    .then((response) => {  console.log(response); return response.json();})
}


export const salvarSubSetor = (data)=>{
    console.log(data)    
    return fetch(getAPI()+"subsetor",{
        method:'POST',
        mode: 'cors',
        headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token},
        'body':JSON.stringify(data)
    }).then((response) => { return response.json();})
}