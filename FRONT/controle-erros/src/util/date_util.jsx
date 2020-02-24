const corrigiDoisdigitos = (aux)=>{
    if(aux.toString().length === 1){
        return "0"+aux;
    }else{
        return aux;
    }
}

export const StringDateParse = (date) =>{
    let auxDate = date.split('-');
    return new Date(auxDate[0], auxDate[1]-1, auxDate[2]);
}

export const DateParseString = (date) => {
    if(date !== null){
        let auxMes = date.getMonth()+1;
        return date.getFullYear()+"-"+corrigiDoisdigitos(auxMes)+"-"+corrigiDoisdigitos(date.getDate());
    }
    else{
        return null;
    }
}
