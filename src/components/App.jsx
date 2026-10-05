import React from 'react'
import { MapMarker } from '@primeicons/react'
import Cartao from './Cartao'
import Creditos from './Creditos'
import Loading from './Loading'
import MeuPonto from './MeuPonto'
import geoapifyClient from '../utils/geoapifyClient'
import { Button } from '@primereact/ui/button'

export default class App extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null,
    }
    
    componentDidMount(){
        this.obterLocalizacao()
    }

    componentDidUpdate(){
    }

    render(){
        return (
          <div className='flex flex-column align-items-center p-3'>
      
              <div className='flex flex-column align-items-center gap-1'>
                  <div className='flex align-items-center gap-2'>
                      <MapMarker size={24} color="#8e0000" />
                      <h1 className='titulo'>RolêRadar</h1>
                  </div>
                  <div className="flex align-items-center">
                      <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
                  </div>
                  <Creditos/>
              </div>
      
              <div className='m-4'>
                {
                    this.state.mensagemDeErro ? 
                        <p>{this.state.mensagemDeErro}</p>   
                    :
                        !this.state.latitude ?
                            <Loading />
                        :
                            <Cartao cabecalho="Você está aqui">
                                <MeuPonto 
                                    latitude ={this.state.latitude}
                                    longitude={this.state.longitude}
                                    horarioLocalizacao={this.state.horarioLocalizacao}
                                    onAtualizar={this.obterLocalizacao}>                                    
                                </MeuPonto>

                                 <Button 
                                    className="mt-3"
                                    onClick={() => this.onBuscaRealizada("catering.cafe", 1000)}>
                                    Testar busca
                                </Button>
                            </Cartao>
                }
              </div>
      
              <div className='rodape'>
                  <p>RolêRadar © {obterAno()}</p>
              </div>
      
          </div>
        )
    }
    obterLocalizacao = () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) =>{
                const dataMilissegundos = Date.now()
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    horarioLocalizacao: dataMilissegundos   
                })
            },
            (erro) => {
                console.log(`Erro: ${erro}`)
                this.setState({
                mensagemDeErro: 'Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.'
                })
            }
        )
    }

    onBuscaRealizada = (categoria, raio) => {
        const {latitude, longitude } = this.state;

        geoapifyClient.get('/places', {
            params: {
                categories: categoria,
                filter: `circle:${longitude},${latitude},${raio}`,
                bias: `proximity:${longitude},${latitude}`,
                limit: 20
            }
        }).then((result) => {
            console.log(result.data.features);
        });
    }
}



const estiloSubtitulo = {
    'fontFamily': 'cursive',
    'color': '#8d8d8d',
    'fontSize' : 15,
    'margin' : 0
}

const obterAno = ()=>{
    return new Date().getFullYear()
}



