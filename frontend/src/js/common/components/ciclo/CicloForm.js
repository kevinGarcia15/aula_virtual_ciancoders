import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import {
    renderNumber
} from "../Utils/renderField/renderField";
import { validate, validators } from "validate-redux-form";


class CicloForm extends Component {
    render() {
        const { handleSubmit, titulo } = this.props;
        return (
            <form
                className="row justify-content-center"
                onSubmit={handleSubmit}
            >
                <div className="col-10">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title">{titulo}</h5>
                                </div>
                                <div className="col-8">
                                    <label>Ciclo</label>
                                    <Field
                                        name="anio"
                                        component={renderNumber}
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-end mt-4">
                                <div className="col-3">
                                    <Link
                                        to="/ciclos"
                                        className="btn btn-secondary mr-2"
                                    >
                                        Cancelar
                                    </Link>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: "cicloForm",
    validate: (data) => {
        return validate(data, {
            anio: validators.exists()("Este campo es requerido"),
        });
    },
})(CicloForm);
