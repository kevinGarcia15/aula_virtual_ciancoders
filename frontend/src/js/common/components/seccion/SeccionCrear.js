import React, { Component } from 'react'
import SeccionForm from './SeccionForm'

class SeccionCrear extends Component {
    state = {
        crearFlag: true,
        titulo: "Crear Seccion",
    };

    componentWillMount(){
        const {leer, match} = this.props;
        const id = match.params.id;
        if (id) {
            this.setState({crearFlag:false})
            this.setState({titulo:"Actualizar Seccion"})
            leer(id)
        }
    }
    actualizarSeccion = (data)=>{
        const {editar} = this.props;
        const id = (data.id)
        editar(id,data)
    }
    render() {
        const {crear} = this.props
        const {crearFlag} = this.state
        const funcionEnvio = crearFlag ? crear : this.actualizarSeccion;
        return (
            <React.Fragment>
                <div className="container mt-4">
                    <SeccionForm
                        onSubmit={funcionEnvio}
                        titulo={this.state.titulo}
                    />
                </div>
            </React.Fragment>
        )
    }
}
export default SeccionCrear
