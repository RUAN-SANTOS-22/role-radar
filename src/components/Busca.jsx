import { Button } from '@primereact/ui/button'
import React, { Component } from 'react'
import { InputText } from '@primereact/ui/inputtext'
import { Search } from '@primeicons/react'

const categorias = [
    { rotulo: 'Cafés', chave: 'catering.cafe' },
    { rotulo: 'Restaurantes', chave: 'catering.restaurant' },
    { rotulo: 'Parques', chave: 'leisure.park' },
    { rotulo: 'Farmácias', chave: 'healthcare.pharmacy' },
    { rotulo: 'Supermercados', chave: 'commercial.supermarket' },
    { rotulo: 'Museus', chave: 'entertainment.museum' }
]

export default class Busca extends Component {

    state = {
        categoria: null,
        raio: '1000',
        erro: null
    }

    onRaioAlterado = (evento) => {
        this.setState({ raio: evento.target.value })
    }

    onFormSubmit = (evento) => {
        evento.preventDefault()

        if (this.state.categoria === null) {
            this.setState({ erro: 'Escolha uma categoria.' })
            return
        }
        const raioInt = Number(this.state.raio)

        if (!Number.isInteger(raioInt) || raioInt < 100 || raioInt > 5000) {
            this.setState({
                erro: 'Informe um raio inteiro entre 100 e 5000 metros.'
            })
            return
        }

        this.setState({ erro: null })

        this.props.onBuscaRealizada(this.state.categoria, raioInt)

    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>

                <div className="flex flex-wrap justify-content-center gap-3 mb-3">
                    {
                        categorias.map((categoria) => (
                            <Button
                                style={{ width: '100px' }}
                                type="button"
                                key={categoria.chave}
                                size='small'
                                variant={this.state.categoria === categoria.chave ? "filled" : "outlined"}
                                rounded={true}
                                onClick={() => this.setState({ categoria: categoria.chave })}>
                                {categoria.rotulo}
                            </Button>
                        ))
                    }
                </div>

                <div className="flex flex-column align-items-center gap-3">
                    <InputText
                        value={this.state.raio}
                        pt-root-onChange={this.onRaioAlterado}
                        className="w-full"
                        placeholder={this.props.dica}
                    />

                    <Button
                        className='w-5'
                        rounded={true}>
                        <Search /> Buscar
                    </Button>

                    {this.state.erro ? (
                        <div style={{ color: '#7f0000' }}>
                            {this.state.erro}
                        </div>)
                        :
                        null
                    }
                </div>
            </form>
        )
    }
}

Busca.defaultProps = {
    dica: 'Raio em metros (100 a 5000)'
}