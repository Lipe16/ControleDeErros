
import getAPI from './links';

const token = sessionStorage.getItem("token");

export const GetChartErros = (data1, data2)=>{
    return fetch(getAPI()+"chartErros/data?dataUm="+data1+"&dataDois="+data2,{
    method:'GET',
    headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token}})
    .then((response) => {  console.log(response); return response.json();})
}