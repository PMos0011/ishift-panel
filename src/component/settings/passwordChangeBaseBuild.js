const form = {
    userName: {
        labelDesc: 'nowy Login',
        secLebel: "Puste oznacza login bez zminay",
        redLabel: false,
        elemConf: {
            type: 'text',
            name: 'newUserName'
        },
        value: ''
    },
    newPassword: {
        labelDesc: 'nowe hasło',
        secLebel: "Puste oznacza hasło bez zminay",
        redLabel: false,
        elemConf: {
            type: 'password',
            name: 'newPassword'
        },
        value: ''
    },
    newPasswordConfirm: {
        labelDesc: 'powtórz hasło',
        secLebel: " ",
        redLabel: false,
        elemConf: {
            type: 'password',
            name: 'newPasswordConfirm'
        },
        value: ''
    },
    password: {
        labelDesc: 'obecne hasło',
        secLebel: "Podaj obecne hasło żeby autoryzować zmiany",
        redLabel: false,
        elemConf: {
            type: 'password',
            name: 'password'
        },
        value: ''
    },
    submit: {
        labelDesc: '',
        secLebel: "",
        redLabel: false,
        elemConf: {
            type: 'submit',
            name: 'Login'
        },
        value: 'Wyślij'
    }
}

export default form;