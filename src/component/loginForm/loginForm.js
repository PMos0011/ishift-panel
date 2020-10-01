import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import Aux from '../../hoc/auxiliary';
import * as actions from '../../store/authorization/authAction';

import '../../style/form-style.css';
import '../../style/style.css';

const LoginForm = (props) => {

    let redirectToBasicsInfo = null;

    if (props.isAuth)
        redirectToBasicsInfo = <Redirect to="/auth" />

    const [formComponents, setComponents] = useState({
        userName: {
            labelDesc: 'Login',
            elemConf: {
                type: 'text',
                name: 'userName'
            },
            value: ''
        },
        password: {
            labelDesc: 'Hasło',
            elemConf: {
                type: 'password',
                name: 'password'
            },
            value: ''
        },
        submit: {
            labelDesc: '',
            elemConf: {
                type: 'submit',
                name: 'Login'
            },
            value: 'Login'
        }
    });

    const formArray = [];
    for (let key in formComponents) {
        formArray.push({
            id: key,
            formConfig: formComponents[key]
        })
    }

    let inputChangeHandler = (event, inputName) => {

        const updatedLoginForm = {
            ...formComponents
        };
        const updatedElement = {
            ...updatedLoginForm[inputName]
        };

        updatedElement.value = event.target.value;

        updatedLoginForm[inputName] = updatedElement;
        setComponents(updatedLoginForm);
    }


    const submitForm = (event) => {
        event.preventDefault();

        props.onSubmit(formComponents.userName.value,
            formComponents.password.value);
    }

    return (
        <Aux>
            <div className="gray-card flex-center app-border-shadow">
                {redirectToBasicsInfo}
                <form onSubmit={submitForm}>
                    <div>
                        {formArray.map((component) => {
                            return (
                                <label key={component.id}>{component.formConfig.labelDesc}
                                    <input {...component.formConfig.elemConf}
                                        value={component.formConfig.value}
                                        onChange={(event) => inputChangeHandler(event, component.id)} />
                                </label>
                            )
                        })
                        }
                    </div>
                </form>
            </div>
                    <p>{props.errorMessage}</p>
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuthenticated,
        errorMessage: state.errorReducer.errorMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (name, pass) => dispatch(actions.authorizeUser(name, pass))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);