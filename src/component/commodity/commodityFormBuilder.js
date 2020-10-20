let form = (comm) => {

    return [
        {
            id: "name",
            label: "Nazwa towaru/ usługi:",
            value: comm.name,
            elemConf: {
                type: "text",
                name: "name"
            }
        },
        {
            id: "price",
            label: "Cena netto:",
            value: comm.price,
            elemConf: {
                type: "number",
                name: "price"
            }
        },
        {
            id: "vatAmount",
            label: "Stawka VAT: ",
            value: comm.vatAmount,
            elemConf: {
                type: "number",
                name: "vatAmount"
            }
        }
    ]
}

export let newObject = {
    id: "",
    measureId: "",
    name: "",
    price: "",
    vatAmount: "",
}

export default form;