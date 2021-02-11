import React from "react";
import { Field} from "redux-form";
import { Link } from "react-router-dom";
import {
    renderField,
    renderNumber,
    renderFilePicker,
    SelectField,
} from "../../Utils/renderField/renderField";

function ProfileForm() {
    const Options = [
        { label: "Perito Contador", value: "1" },
        { label: "Bachiller", value: "2" },
    ];
    return (
        <React.Fragment>
            <div className="col-12 mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <h5 className="card-title">Perfil</h5>
                            </div>
                            <div className="col-8">
                            <label htmlFor="select_field">profesión</label>
                                <Field
                                    name="profesion"
                                    options={Options}
                                    component={SelectField}
                                />
                                <label>Teléfonos</label>
                                <Field
                                    name="phone"
                                    decimalScale={2}
                                    numberFormat="#### #### #### ####"
                                    placeholder="5746 9663"
                                    component={renderNumber}
                                />
                                <label>Dirección</label>
                                <Field name="address" component={renderField} />
                                <label htmlFor="file_field">
                                    Imagen de perfil
                                </label>
                                <Field
                                    name="avatar"
                                    component={renderFilePicker}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="row justify-content-end">
                            <div className="col-3">
                                <Link
                                    to="/maestros"
                                    className="btn btn-secondary mr-2"
                                >
                                    Cancelar
                                </Link>
                                <button className="btn btn-primary">
                                    Registrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProfileForm;
