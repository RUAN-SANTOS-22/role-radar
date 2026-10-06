import React from 'react'
import { MapMarker } from '@primeicons/react'
import Cartao from './Cartao'
import Creditos from './Creditos'
import Loading from './Loading'
import MeuPonto from './MeuPonto'
import geoapifyClient from '../utils/geoapifyClient'
import Busca from './Busca'
import ListaLugares from './ListaLugares'

export default class App extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null,
        lugares: null
    }

    componentDidMount() {
        this.obterLocalizacao()
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div className='grid mx-5'>

                    <div className='col-12 flex flex-column align-items-center gap-2'>
                        <div className='flex align-items-center gap-2'>
                            <MapMarker size={24} color="#8e0000" />
                            <h1 className='titulo'>RolêRadar</h1>
                        </div>
                        <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>     
                        <Creditos />
                    </div>

                    <div className='col-6 flex flex-column gap-3 gap-2'>
                        {
                            this.state.mensagemDeErro ?
                                <p>{this.state.mensagemDeErro}</p>
                                :
                                !this.state.latitude ?
                                    <Loading />
                                    :
                                    <Cartao cabecalho="Você está aqui">
                                        <MeuPonto
                                            latitude={this.state.latitude}
                                            longitude={this.state.longitude}
                                            horarioLocalizacao={this.state.horarioLocalizacao}
                                            onAtualizar={this.obterLocalizacao}>
                                        </MeuPonto>
                                    </Cartao>
                        }
                        <Cartao cabecalho="O que você procura?">
                            <Busca onBuscaRealizada={this.onBuscaRealizada}>
                            </Busca>
                        </Cartao>
                    </div>
                    <div className="col-6 flex flex-column gap-3">
                        {
                            
                            this.state.lugares === null ?
                                null
                            :
                                this.state.lugares.length === 0 ?
                                    <div className="flex justify-content-center mt-4">
                                        <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
                                    </div>
                                :
                                    <ListaLugares lugares={this.state.lugares} />
                        }
                    </div>

                    <div className='col-12 flex rodape justify-content-center'>
                        <p>RolêRadar © {obterAno()}</p>
                    </div>

                </div>
        )
    }

    obterLocalizacao = () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
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
        const { latitude, longitude } = this.state;

        geoapifyClient.get('/places', {
            params: {
                categories: categoria,
                filter: `circle:${longitude},${latitude},${raio}`,
                bias: `proximity:${longitude},${latitude}`,
                limit: 20
            }
        }).then((result) => {
            this.setState({lugares: result.data.features})
            console.log(result.data.features);
        });
    }
}

const estiloSubtitulo = {
    'fontFamily': 'cursive',
    'color': '#8d8d8d',
    'fontSize': 15,
    'margin': 0
}

const obterAno = () => {
    return new Date().getFullYear()
}



