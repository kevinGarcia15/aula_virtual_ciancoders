import React from "react";
import { Field} from "redux-form";
import {
    renderField,
} from "../../Utils/renderField/renderField";

function UserForm() {
    return (
        <React.Fragment>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <h5 className="card-title">Usuario</h5>
                            </div>
                            <div className="col-8">
                                <label>Nombres</label>
                                <Field
                                    name="first_name"
                                    component={renderField}
                                />
                                <label>Apellidos</label>
                                <Field
                                    name="last_name"
                                    component={renderField}
                                />
                                <label>Correo</label>
                                <Field name="email" component={renderField} />
                                <label>Usuario</label>
                                <Field
                                    name="username"
                                    component={renderField}
                                />
                                <label>Contraseña</label>
                                <Field
                                    name="password"
                                    type="password"
                                    component={renderField}
                                />
                                <label>Repetir Contraseña</label>
                                <Field
                                    name="repeat password"
                                    type="password"
                                    component={renderField}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default UserForm;
