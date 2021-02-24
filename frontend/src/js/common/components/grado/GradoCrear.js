import React, { Component } from 'react'
import GradoForm from './GradoForm'

class GradoCrear extends Component {
    state = {
        crear: true,
        titulo: "Crear Grado",
    };

    componentWillMount(){
        const {leerGrado, match} = this.props;
        const id = match.params.id;
        if (id) {
            this.setState({crear:false})
            this.setState({titulo:"Actualizar Grado"})
            leerGrado(id)
        }
    }

    actualizarGrado = (data)=>{
        const {editarGrado} = this.props;
        const id = (data.id)
        editarGrado(id,data)
    }

    render() {
        const {crearGrado} = this.props
        const {crear} = this.state
        const funcionEnvio = crear ? crearGrado : this.actualizarGrado;
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
