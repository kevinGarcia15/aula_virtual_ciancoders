import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import RecuperarForm from './RecuperarForm';
import LoadMask from "../../Utils/LoadMask/LoadMask";

class Recuperar extends Component {
    static propTypes = {
        verifyEmail: PropTypes.func.isRequired,
    };

    componentDidMount(props) {

    }

    render() {
        const { verifyEmail, loader } = this.props;
        return (
            <div className="blue-gradient-bg">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <p>Recuperar contraseña</p>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <h5 className="text-center pv">Recuperar contraseña</h5>
                        <LoadMask loading={loader} light type={"Grid"}>
                            <RecuperarForm onSubmit={verifyEmail} />
                            <span><Link to="/login">Regresar</Link></span>
                        </LoadMask>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recuperar;
