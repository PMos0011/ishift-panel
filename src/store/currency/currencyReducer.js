import * as actionTypes from '../actions';

const initialState = {
    avaibleCurrency: [
        { value: 0, label: "polski złoty PLN", code:"PLN" },
        { value: 1, label: "bat (Tajlandia) THB", code:"THB" },
        { value: 2, label: "dolar amerykański USD", code:"USD" },
        { value: 3, label: "dolar australijski AUD", code:"AUD" },
        { value: 4, label: "dolar Hongkongu HKD", code:"HKD" },
        { value: 5, label: "dolar kanadyjski CAD", code:"CAD" },
        { value: 6, label: "dolar nowozelandzki NZD", code:"NZD" },
        { value: 7, label: "dolar singapurski SGD", code:"SGD" },
        { value: 8, label: "euro EUR", code:"EUR" },
        { value: 9, label: "forint HUF", code:"HUF" },
        { value: 10, label: "frank szwjacarski CHF", code:"CHF" },
        { value: 11, label: "funt szterling GBP", code:"GBP" },
        { value: 12, label: "hrywna UAH", code:"UAH" },
        { value: 13, label: "jen JPY", code:"JPY" },
        { value: 14, label: "korona czeska CZK", code:"CZK" },
        { value: 15, label: "korona duńska DKK", code:"DKK" },
        { value: 16, label: "korona islandzka ISK", code:"ISK" },
        { value: 17, label: "korona norweska NOK", code:"NOK" },
        { value: 18, label: "korona szwedzka SEK", code:"SEK" },
        { value: 19, label: "kuna HRK", code:"HRK" },
        { value: 20, label: "lej rumuński RON", code:"RON" },
        { value: 21, label: "lew (Bułgaria) BGN", code:"BGN" },
        { value: 22, label: "lira turecka TRY", code:"TRY" },
        { value: 23, label: "nowy izraelski szekel ILS", code:"ILS" },
        { value: 24, label: "peso chilijskie CLP", code:"CLP" },
        { value: 25, label: "peso filipińskie PHP", code:"PHP" },
        { value: 26, label: "peso mexykańskie MXN", code:"MXN" },
        { value: 27, label: "rand (RPA) ZAR", code:"ZAR" },
        { value: 28, label: "real (Brazylia) BRL", code:"BRL" },
        { value: 29, label: "rinngit (Malezja) MYR", code:"MYR" },
        { value: 30, label: "rubel rosyjski RUB", code:"RUB" },
        { value: 31, label: "rupia indonezyjska IDR", code:"IDR" },
        { value: 32, label: "rupia indyjska INR", code:"INR" },
        { value: 33, label: "won południowokoreański KRW", code:"KRW" },
        { value: 34, label: "yuan renminbi (Chiny) CNY", code:"CNY" },
        { value: 35, label: "SDR (MWF) XDR", code:"XDR" }
    ]
}

const reducer = (state = initialState, action) => {
            return state
}

export default reducer;