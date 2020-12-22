const form = {
    userName: {
        labelDesc: 'Login',
        elemConf: {
            type: 'text',
            name: 'userName',
            className: 'text-x-large-input'
        },
        value: '',
        submit: false
    },
    password: {
        labelDesc: 'Hasło',
        elemConf: {
            type: 'password',
            name: 'password',
            className: 'text-x-large-input'
        },
        value: '',
        submit: false
    },
    submit: {
        labelDesc: '',
        elemConf: {
            type: 'submit',
            name: 'login'
        },
        value: 'Login',
        submit: true
    },
    submitDemo: {
        labelDesc: '',
        elemConf: {
            type: 'submit',
            name: 'demo'
        },
        value: 'Demo',
        submit: true,
    }
}

export default form;