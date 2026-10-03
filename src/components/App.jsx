import { MapMarker } from '@primeicons/react'
import Cartao from './Cartao'
import Creditos from './Creditos'

const estiloSubtitulo = {
    'fontFamily': 'cursive',
    'color': '#8d8d8d',
    'fontSize' : 15,
    'margin' : 0
}
const obterAno = ()=>{
    return new Date().getFullYear()
}
const App = () => {
  return (
    <div className='flex flex-column align-items-center p-3'>

        <div className='flex flex-column align-items-center gap-1'>
            <div className='flex align-items-center gap-2'>
                <MapMarker size={24} color="#600000" />
                <h1 className='titulo'>RolêRadar</h1>
            </div>
            <div className="flex align-items-center">
                <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
            </div>
            <Creditos/>
        </div>

        <div className='m-4'>
            <Cartao cabecalho="Teste">
                    Conteúdo do cartão
            </Cartao>   
        </div>

        <div className='rodape'>
            <p>RolêRadar © {obterAno()}</p>
        </div>

    </div>
  )
}

export default App