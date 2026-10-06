import React from 'react'
import Lugar from './Lugar'

const ListaLugares = ({lugares}) => {
  return (
    lugares.map((lugar, i)=>(
        <Lugar 
            key={lugar.properties.place_id}
            numero={i+1}
            nome={lugar.properties.name}
            endereco={lugar.properties.address_line2}
            distancia={lugar.properties.distance}
        >
        </Lugar>
    ))
  )
}

export default ListaLugares