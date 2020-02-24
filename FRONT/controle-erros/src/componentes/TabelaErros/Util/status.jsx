export const ListarStatus = (usuario, stateStatus)=>{

    if(usuario.perfil.perfil === 'G'){
        return [];
    }else if(usuario.perfil.perfil === 'Q'){
        return [];
    }else if(usuario.perfil.perfil === 'P'){
    
            return [
                    {label: 'ANALISAR', value: 'ANALISANDO_PROGRAMADOR'},
                    {label: 'DEVOLVER TESTER', value: 'AGUARDANDO_CONFERENCIA_TESTE'}
                ];
        
    }else if(usuario.perfil.perfil === 'T'){
        
       
        if(stateStatus === 'AGUARDANDO_TESTE' || stateStatus === 'ANALISANDO_TESTE'){
            
            return [
                {label: 'CANCELAR', value: 'CANCELADO'},
                {label: 'ANALISAR', value: 'ANALISANDO_TESTE'},
                {label: 'ENVIAR PROGRAMACAO', value: 'AGUARDANDO_PROGRAMADOR'}
            ];
        }else if(stateStatus === 'AGUARDANDO_CONFERENCIA_TESTE' || stateStatus ===  'ANALISANDO_CONFERENCIA_TESTE'){
            return [
                {label: 'REANALISAR', value: 'ANALISANDO_CONFERENCIA_TESTE'},
                {label: 'DEVOLVER PARA ANALISTA', value: 'LIBERADO_CLIENTE_TESTE'},
            ];
        }
    
    }else if(usuario.perfil.perfil === 'A'){
        
        if(stateStatus !== undefined){
            if(stateStatus === 'LIBERADO_CLIENTE_TESTE'){
                return [
                    {label: 'ANALISAR', value: 'LIBERADO_CLIENTE_TESTE'},
                    {label: 'LIBERAR (Resolvido)', value: 'LIBERADO'}
                ];
            }
        }else{
            
            return [{label: 'AGUARDANDO TESTE', value: 'AGUARDANDO_TESTE'}];
        }
    }
}


