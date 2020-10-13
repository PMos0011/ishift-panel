
const formBuilder = (data) => {

    let form= {};

    data.map(item => {

        if (item.companyNumber > 1103 && item.companyNumber <= 1120 && item.companyNumber !== 1118)
        form = Object.assign(form,{
            [item.companyNumber]: {
                labelDesc: item.dataDescription,
                elemConf: {
                    type: 'text',
                    name: item.companyNumber
                },
                value: item.companyData
            }
        });

    })

    form = Object.assign(form,{
        submit: {
            labelDesc: "",
            elemConf: {
                type: 'submit',
                name: 'submit'
            },
            value: 'Aktualizuj dane'

        }
    });

    return form;
};

export default formBuilder;