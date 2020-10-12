const form ={
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
}

export default form;