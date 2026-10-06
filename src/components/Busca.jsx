import React, { Component } from 'react'

    const categorias = [
        {
            rotulo: "Cafés",
            chave: "catering.cafe"
        },
        {
            rotulo: "Restaurantes",
            chave: "catering.restaurant"
        },
        {
            rotulo: "Parques",
            chave: "leisure.park"
        },
        {
            rotulo: "Farmácias",
            chave: "healthcare.pharmacy"
        },
        {
            rotulo: "Supermercados",
            chave: "commercial.supermarket"
        },
        {
            rotulo: "Museus",
            chave: "entertainment.museum"
        }
        
    ]


export default class Busca extends Component {

    state = {
        categoria: null,
        raio: '1000',
        erro: null
    }

  render() {
    return (
        <div>
        </div>
    )
  }
}