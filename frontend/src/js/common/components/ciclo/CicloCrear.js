import React, { Component } from 'react'
import CicloForm from './CicloForm'

export class CicloCrear extends Component {
    state = {
        crearFlag: true,
        titulo: "Crear Ciclo",
    };

    componentWillMount(){
        const {leer, match} = this.props;
        const id = match.params.id;
        if (id) {
            this.setState({crearFlag:false})
            this.setState({titulo:"Actualizar Ciclo"})
            leer(id)
        }
    }
    actualizarCiclo = (data)=>{
        const {editar} = this.props;
        const id = (data.id)
        editar(id,data)
    }  
    render() {
        const {crear} = this.props
        const {crearFlag} = this.state
        const funcionEnvio = crearFlag ? crear : this.actualizarCiclo;
        return (
            <React.Fragment>
                <div className="container mt-4">
                    <CicloForm
                        onSubmit={funcionEnvio}
                        titulo={this.state.titulo}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default CicloCrear
