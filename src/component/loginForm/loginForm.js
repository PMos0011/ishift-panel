import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import * as actions from '../../store/authAction';

import './form-style.css';
import '../style.css';

const LoginForm = (props) => {

    let redirectToBasicsInfo = null;
    
    if(props.isAuth)
        redirectToBasicsInfo = <Redirect to="/basicsInfo"/>

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
        <div className="gray-card flex-center">
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
    )
}

const mapStateToProps = (state) => {
    return {
      isAuth: state.authReducer.isAuthenticated,
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (name, pass) => dispatch(actions.authorizeUser(name, pass))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);