import React, { Component } from 'react'
import GradoForm from './GradoForm'

class GradoCrear extends Component {
    state = {
        crear: true,
        titulo: "Crear Grado",
    };

    render() {
        const {crearGrado} = this.props
        const funcionEnvio = crearGrado;
        return (
            <React.Fragment>
                <div className="container mt-4">
                    <GradoForm
                        onSubmit={funcionEnvio}
                        crear={this.state.crear}
                        titulo={this.state.titulo}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default GradoCrear
