import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import {
    renderField,
    AsyncSelectField,
} from "../Utils/renderField/renderField";
import { validate, validators } from "validate-redux-form";
import { api } from "../../../utility/api";
import fromPairs from "lodash.frompairs";

const obtenerNiveles = (search) => {
    return api
        .get("niveles", { search })
        .then((data) => {
            if (data) {
                const niveles = [];
                data.results.forEach((nivel) => {
                    niveles.push({
                        value: nivel.id,
                        label: nivel.nombre,
                    });
                });
                return niveles;
            }
        })
        .catch((error) => {
            return [];
        });
};

class GradoForm extends Component {
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
                                    <label>Grado</label>
                                    <Field
                                        name="nombre"
                                        component={renderField}
                                    />
                                    <label htmlFor="nivel">
                                        Nivel
                                    </label>
                                    <Field
                                        name="nivel"
                                        loadOptions={obtenerNiveles}
                                        component={AsyncSelectField}
                                    />
                                    <label>Descripción</label>
                                    <Field
                                        name="descripcion"
                                        component={renderField}
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-end mt-4">
                                <div className="col-3">
                                    <Link
                                        to="/grado"
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
    form: "gradoForm",
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()("Este campo es requerido"),
            nivel: validators.exists()("Este campo es requerido"),
        });
    },
})(GradoForm);
