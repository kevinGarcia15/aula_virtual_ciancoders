import React, { Component } from "react";
import FormEditar  from "./formEditar";


class EventoEditar extends Component {
    componentWillMount(){
        const {leer, match}= this.props
        const id = match.params.id
        leer(id)
    }
    actualizar = (data)=>{
        const {editar} = this.props
        const id = data.id
        editar(id,data)
    }
    render() {
        return (
            <div className="" id="crearEvento">
                <div className="modal-dialog">
                    <FormEditar onSubmit={this.actualizar}/>
                </div>
            </div>
        );
    }
}

export default EventoEditar;
