import React, { Component } from 'react'
import { GEOAPIFY_KEY } from '../utils/chaves.js'
import { Button } from '@primereact/ui/button'


export default class MeuPonto extends Component {

    state = {
        agora: null
    }
    contador = null

    componentDidMount() {
        this.contador = setInterval(() => {
            this.setState({
                agora: Date.now()
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.contador)
        console.log('MeuPonto removido')
    }

    render() {
        const url = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${this.props.longitude},${this.props.latitude}&zoom=16&marker=lonlat:${this.props.longitude},${this.props.latitude};color:%23d32f2f;size:48&apiKey=${GEOAPIFY_KEY}`

        const hemisferio = this.props.latitude < 0 ? 'Sul' : 'Norte'
        const segundos = Math.max(0, Math.floor((this.state.agora - this.props.horarioLocalizacao) / 1000))

        return (

            <div className="flex flex-column gap-2">
                <img
                    src={url}
                    alt="Mapa da sua localização"
                    style={{ width: '100%' }}
                />
                <p className="my-0">
                    Latitude: {this.props.latitude.toFixed(4)} | Longitude: {this.props.longitude.toFixed(4)}
                </p>
                <p className="my-0">Hemisfério {hemisferio}</p>
                <p className="my-0">Localização obtida há {segundos} s</p>
                <Button className="mt-3" variant="outlined" onClick={this.props.onAtualizar}>
                    <i className="pi pi-refresh"></i>
                    Atualizar localização
                </Button>
            </div>
        )
    }
}
