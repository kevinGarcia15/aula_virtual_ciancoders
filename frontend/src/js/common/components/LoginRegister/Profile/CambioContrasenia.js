import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {renderField} from '../../Utils/renderField/renderField';
import CambioContraseniaForm from "./CambioContraseniaForm";


class CambioContrasenia extends Component {

    update = (data) => {
        const { updatePassword } = this.props;
        updatePassword({...data});
    };

    render() {
        return (
            <CambioContraseniaForm onSubmit={this.update} />
        );
    }
}

export default (CambioContrasenia);
