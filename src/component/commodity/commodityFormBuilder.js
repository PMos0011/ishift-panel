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
        }
    ]
}

export let newObject = {
    id: "",
    measure: "",
    name: "",
    price: "",
    vatAmount: "",
}

export default form;