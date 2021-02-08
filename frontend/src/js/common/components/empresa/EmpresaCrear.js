import React, { Component } from "react";
import { registroEmpresa } from "../../../redux/modules/empresa/empresa";
import EmpresaForm from "./EmpresaForm";

export class EmpresaCrear extends Component {
    state = {
        crear:true,
    }
    componentWillMount() {
        const { leer, match } = this.props;
        const id = match.params.id;
        if (id) {
            leer(id);
            this.setState({crear:false})
        }
    }
    render() {
        const { registroEmpresa, actualizarEmpresa } = this.props;
        const funcionEnvio = this.state.crear ? registroEmpresa : actualizarEmpresa

        return (
            <React.Fragment>
                <EmpresaForm onSubmit={funcionEnvio} crear={this.state.crear} />
            </React.Fragment>
        );
    }
}

export default EmpresaCrear;
