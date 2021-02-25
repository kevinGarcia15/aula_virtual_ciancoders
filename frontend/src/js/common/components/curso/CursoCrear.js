import React, { Component } from 'react'
import CursoForm from './CursoForm'

class CursoCrear extends Component {
    state = {
        crearFlag: true,
        titulo: "Crear Curso",
        botonTexto: "Crear",
    };

    componentWillMount(){
        const {leer, match} = this.props;
        const id = match.params.id;
        if (id) {
            this.setState({crearFlag:false,
                titulo:"Actualizar Curso",
                botonTexto:"Actualizar"
            })
            leer(id)
        }
    }

    actualizarCurso = (data)=>{
        const {editar} = this.props;
        const id = (data.id)
        editar(id,data)
    }

    render() {
        const {crear} = this.props
        const {crearFlag} = this.state
        const funcionEnvio = crearFlag ? crear : this.actualizarCurso;
        return (
            <React.Fragment>
                <div className="container mt-4">
                    <CursoForm
                        onSubmit={funcionEnvio}
                        crear={this.state.crearFlag}
                        titulo={this.state.titulo}
                        boton={this.state.botonTexto}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default CursoCrear
