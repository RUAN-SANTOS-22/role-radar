import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div className="flex flex-column align-items-center">
        <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
        <span className="mt-2">{this.props.mensagem}</span>
      </div>
    )
  }
}

Loading.defaultProps = {
  mensagem: "Carregando..."
}
