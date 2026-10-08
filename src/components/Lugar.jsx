import React from 'react'
import Cartao from './Cartao'

const estiloCirculo = {
    borderRadius: '50%',
    width: '3rem',
    height: '3rem',
    backgroundColor:'#9ceaa7'
}

const formatarDistancia = (distancia)=>{
    const metros = Number(distancia)
    if(metros < 1000){
        return `${Math.round(metros)} m`
    }
    const quilometros = (metros/1000).toFixed(1).replace(".", ",")
    return `${quilometros} km`
}

const Lugar = ({numero, nome, endereco, distancia}) => { 
    
    return (
        <Cartao cabecalho={formatarDistancia(distancia)}>
            <div className='grid align-items-center gap-3'>
                <div
                    style={estiloCirculo} 
                    className='col-3 flex align-items-center justify-content-center'>
                    {numero}
                </div>
                <div className='col-9 flex flex-column'>
                    <h2 className='my-1'><strong>{nome === undefined ? 'Sem nome' : nome}</strong></h2>
                    <span>{endereco}</span>
                </div>

            </div>
        </Cartao>
  )
}

export default Lugar