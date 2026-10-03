import React from 'react'
import { MapMarker } from '@primeicons/react'

const estiloSubtitulo = {
    'fontFamily': 'cursive',
    'color': '#8d8d8d',
    'fontSize' : 15
} 
const obterAno = ()=>{
    return new Date().getFullYear()
}

function App() {
  return (
    <div>
        <div className='cabecalho'>
            <h1 className='titulo'>RolêRadar</h1>
            <div className="flex align-items-center">
                <MapMarker size={24} color="#600000" />
                <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
            </div>
        </div>

        <div className='rodape'>
            <p>RolêRadar © {obterAno()}</p>
        </div>

    </div>
  )
}

export default App