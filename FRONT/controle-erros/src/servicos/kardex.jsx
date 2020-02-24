import getAPI from './links';

const token = sessionStorage.getItem("token");

export const getKardex = (id)=>{
    return fetch(getAPI()+"kardex/erro/id?id="+id,{
    method:'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token}})
    .then((response) => {  console.log(response); return response.json();})
}