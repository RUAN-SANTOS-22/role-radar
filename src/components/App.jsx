import React from 'react'
import { MapMarker } from '@primeicons/react'
import Cartao from './Cartao'
import Creditos from './Creditos'
import Loading from './Loading'
import MeuPonto from './MeuPonto'
import geoapifyClient from '../utils/geoapifyClient'
import Busca from './Busca'
import ListaLugares from './ListaLugares'
import MapaRadar from './MapaRadar'

export default class App extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null,
        lugares: null,
        buscando: false,
        erroBusca: null,
        raioBuscado: null
    }

    componentDidMount() {
        this.obterLocalizacao()
    }

    render() {
        return (
            <div className='grid mx-5'>
                    <div className='col-12 flex flex-column align-items-center gap-2 mx-5'>
                        <div className='flex align-items-center gap-2'>
                            <i className="pi pi-map-marker" style={{ color: "#8e0000", fontSize: '2rem'}}></i> 
                            <h1 className='titulo'>RolêRadar</h1>
                        </div>
                        <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>     
                        <Creditos />
                    </div>

                    <div className='col-6 flex flex-column gap-3'>
                        {
                            this.state.mensagemDeErro ?
                                <p>{this.state.mensagemDeErro}</p>
                                :
                                !this.state.latitude ?
                                    <Loading mensagem="Aguardando permissão de localização..." />
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
                            this.state.buscando ?
                                <Loading mensagem="Procurando lugares..."/>
                            :
                                this.state.erroBusca ?
                                    <p>{this.state.erroBusca}</p>
                                :
                                    this.state.lugares === null ?
                                        null
                                    :
                                        this.state.lugares.length === 0 ?
                                            <div className="flex justify-content-center mt-4">
                                                <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
                                            </div>
                                        :
                                            <div className="flex flex-column gap-3">
                                                <h2 className="m-1">{this.resumoRadar()}</h2>
                                                <Cartao cabecalho="Radar">
                                                    <MapaRadar
                                                        latitude={this.state.latitude}
                                                        longitude={this.state.longitude}
                                                        lugares={this.state.lugares}
                                                    ></MapaRadar>
                                                </Cartao> 
                                                <ListaLugares lugares={this.state.lugares} />
                                            </div>
                        }
                    </div>

                    <div className='col-12 flex justify-content-center border-top-1 border-300 mt-2'>
                        <p>RolêRadar © {obterAno()}</p>
                    </div>
                </div>
        )
    }

    resumoRadar = ()=>{
        const qtdeLugares = this.state.lugares.length
        const stringLugar = qtdeLugares === 1 ? 'lugar encontrado' : 'lugares encontrados'
        return `${qtdeLugares} ${stringLugar} em até ${this.state.raioBuscado} m`
    }

    obterLocalizacao = () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                const dataMilissegundos = Date.now()
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    horarioLocalizacao: dataMilissegundos,
                    mensagemDeErro: null
                })
            },
            (erro) => {
                console.log(erro)
                this.setState({
                    mensagemDeErro: 'Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.'
                })
            }
        )
    }

    onBuscaRealizada = (categoria, raio) => {
        const { latitude, longitude } = this.state;
        this.setState({buscando: true, raioBuscado: raio, erroBusca:false})

        geoapifyClient.get('/places', {
            params: {
                categories: categoria,
                filter: `circle:${longitude},${latitude},${raio}`,
                bias: `proximity:${longitude},${latitude}`,
                limit: 20
            }
        })
        .then((result) => {
            this.setState({lugares: result.data.features, buscando: false})
        })
        
        .catch((erro)=>{
            console.log(erro)
            this.setState({buscando: false, erroBusca: " Não foi possível consultar os lugares. Tente novamente."})
        })
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



