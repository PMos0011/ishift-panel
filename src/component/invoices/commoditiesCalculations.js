import Dinero from "dinero.js";

export const convertToDinero = (num) => {
    let n = Number(num) * 100;
    n = n.toFixed(0);
    n = parseInt(n);
    return Dinero({ amount: n, currency: 'PLN' })
}

export const correctionCallculations = (before, after) => {
    before = parseFloat(before).toFixed(2);
    after = parseFloat(after).toFixed(2);
    return (after - before).toFixed(2);
}

export const moneyCallculations = (invoiceCommodity, id, fromBrutto) => {

    let price = convertToDinero(invoiceCommodity[id].price);
    const amount = parseFloat(invoiceCommodity[id].amount);
    const discount = parseFloat(invoiceCommodity[id].discount);

    let vat = 0;
    if (!isNaN(parseFloat(invoiceCommodity[id].vat)))
        vat = parseFloat(invoiceCommodity[id].vat);

    if (fromBrutto) {

        price = convertToDinero(invoiceCommodity[id].singleBrutto);
        price = price.multiply(100);
        price = price.divide(vat + 100, "HALF_UP");
        price = price.divide((100 - discount) / 100, "HALF_UP");
    }

    const discountNetto = price.multiply((100 - discount) / 100, "HALF_UP");
    const nettoAmount = discountNetto.multiply(amount, "HALF_UP");
    const vatAmount = nettoAmount.multiply(vat / 100, "HALF_UP");
    const brutto = nettoAmount.add(vatAmount);
    const bruttoValue = discountNetto.multiply((vat+100) / 100, "HALF_UP");

    invoiceCommodity[id].price = price.toFormat('0.00');
    invoiceCommodity[id].nettoAmount = nettoAmount.toFormat('0.00');
    invoiceCommodity[id].vatAmount = vatAmount.toFormat('0.00');
    invoiceCommodity[id].brutto = brutto.toFormat('0.00');
    invoiceCommodity[id].singleBrutto = bruttoValue.toFormat('0.00');

    return { ...invoiceCommodity };
}

export const recalculateSummary = (commodities) => {
    let summaryNetto = Dinero({ amount: 0, currency: 'PLN' });
    let summaryVat = Dinero({ amount: 0, currency: 'PLN' });
    let summaryBrutto = Dinero({ amount: 0, currency: 'PLN' });

    let newVatRateObj = {};

    for (let key in commodities) {

        summaryNetto = summaryNetto.add(
            convertToDinero(commodities[key].nettoAmount)
        );
        summaryVat = summaryVat.add(
            convertToDinero(commodities[key].vatAmount)
        );
        summaryBrutto = summaryBrutto.add(
            convertToDinero(commodities[key].brutto)
        );

        if (newVatRateObj[commodities[key].vat] === undefined) {
            let newVatRate = {
                [commodities[key].vat]: {
                    nettoAmount: commodities[key].nettoAmount,
                    vatAmount: commodities[key].vatAmount,
                    bruttoAmount: commodities[key].brutto
                }
            }
            newVatRateObj = Object.assign(newVatRateObj, newVatRate)
        }
        else {
            let netto = convertToDinero(newVatRateObj[commodities[key].vat].nettoAmount)
                .add(convertToDinero(commodities[key].nettoAmount));
            let vat = convertToDinero(newVatRateObj[commodities[key].vat].vatAmount)
                .add(convertToDinero(commodities[key].vatAmount));
            let brutto = convertToDinero(newVatRateObj[commodities[key].vat].bruttoAmount)
                .add(convertToDinero(commodities[key].brutto));

            newVatRateObj[commodities[key].vat].nettoAmount = netto.toFormat('0.00');
            newVatRateObj[commodities[key].vat].vatAmount = vat.toFormat('0.00');
            newVatRateObj[commodities[key].vat].bruttoAmount = brutto.toFormat('0.00');
        }
    }

    return {
        summary: [summaryNetto, summaryVat, summaryBrutto],
        newVatRateObj
    };
}

export const addInvoiceCommodity = (commodityFromSelector) => {

    const newId = Math.random().toString(20).substr(2, 6);
    let invoiceCommodity = {};

    if (commodityFromSelector !== undefined) {
        let value = null;
        if (commodityFromSelector.value !== undefined)
            value = commodityFromSelector.value

        invoiceCommodity = {
            [newId]: {
                name: commodityFromSelector.name,
                measure: commodityFromSelector.measure,
                amount: "1",
                price: commodityFromSelector.price.toString(),
                singleBrutto: "",
                discount: "0",
                nettoAmount: "",
                vat: commodityFromSelector.vatAmount.toString(),
                vatAmount: "",
                brutto: "",
                id: null,
                value: value
            }
        }
    } else {
        invoiceCommodity = {
            [newId]: {
                name: "",
                measure: "",
                amount: 1,
                price: 0,
                singleBrutto: "",
                discount: 0,
                nettoAmount: "",
                vat: 0,
                vatAmount: "",
                brutto: "",
                id: null,
                value: null
            }
        }
    }

    invoiceCommodity = moneyCallculations(invoiceCommodity, newId);

    return invoiceCommodity;
}

export const commodityToCorrect = (commodity) => {

    const newId = Math.random().toString(20).substr(2, 6);
    let invoiceCommodity = {
        [newId]: {
            name: commodity.name,
            measure: commodity.measure,
            amount: commodity.amount,
            price: commodity.price,
            discount: commodity.discount,
            nettoAmount: "",
            vat: commodity.vat,
            vatAmount: "",
            brutto: "",
            id: commodity.id
        }
    };

    invoiceCommodity = moneyCallculations(invoiceCommodity, newId);

    return invoiceCommodity;

}

export const currencyExchangeCalculations = (amount, multiply) => {

    const value = convertToDinero(amount);
    let multiplyValue = value.multiply(multiply, "HALF_UP");
    return multiplyValue.toFormat('0.00');


}

