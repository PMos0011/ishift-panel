const values = [
    "szt.",
    "godz.",
    "usł.",
    "doba",
    "dzień",
    "gr",
    "grupa",
    "h",
    "kg",
    "km",
    "kpl.",
    "kurs",
    "l",
    "m",
    "m2",
    "m3",
    "mb",
    "mies",
    "opak.",
    "pkt.",
    "rolka",
    "strona",
    "rgb",
    "Mg",
    "cm",
    "abonament"
]

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
    measure: "",
    name: "",
    price: "",
    vatAmount: "",
}



    export const unitsMap = []

    for (var i = 0; i < values.length; i++)
    unitsMap.push({
            value:i,
            label:values[i]
        })

export default form;