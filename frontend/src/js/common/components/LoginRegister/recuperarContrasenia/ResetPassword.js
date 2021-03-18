import React, { Component } from 'react';
import ResetPasswordForm from "./ResetPasswordForm";


class ResetPassword extends Component {
    state = {
        isValidToken: true
    }

    componentWillMount(){
        const {match, verifiacarTokenResetPass} = this.props
        const token = match.params.token

    }
    update = (data) => {
        const { resetPassword ,match} = this.props;
        const token = match.params.token
        resetPassword({...data,token});
    };

    render() {
        return (
            <ResetPasswordForm onSubmit={this.update} />
        );
    }
}

export default (ResetPassword);