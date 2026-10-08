import React from 'react'
import { GEOAPIFY_KEY } from '../utils/chaves'

const MapaRadar = ({ latitude, longitude, lugares }) => {

    const marcadorUsuario = `lonlat:${longitude},${latitude};color:%23d32f2f;size:48`

    const marcadoresLugares = lugares.map((lugar, i) => (
        `lonlat:${lugar.properties.lon},${lugar.properties.lat};type:circle;color:%231565c0;size:42;contentsize:28;text:${i + 1}`
    ))

    const MARCADORES = marcadorUsuario + "|" + marcadoresLugares.join("|")

    const url = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&marker=${MARCADORES}&apiKey=${GEOAPIFY_KEY}`

    return (
        <img
            src={url}
            alt="Radar com os lugares encontrados"
            style={{ width: '100%' }}
        />
    )
}

export default MapaRadar