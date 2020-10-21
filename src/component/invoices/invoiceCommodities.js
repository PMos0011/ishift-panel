import React, { useState } from "react";
import Select from "react-select"
import Aux from "../../hoc/auxiliary";
import Dinero from "dinero.js";

import addIcon from "../../images/add.svg";
import removeIcon from "../../images/remove.svg";

const InvoiceCommodities = (props) => {

    const [commoditySelectOption, setCommoditySelectOption] = useState(props.commoditySelectOptions[0]);
    const [vatRate, setVatRate] = useState({});
    const [invoiceSummary, setInvoiceSummary] = useState(
        {
            nettoAmount: "0.00",
            vatAmount: "0.00",
            bruttoAmount: "0.00"
        }
    );

    const convertToDinero = (num) => {
        let n = Number(Number(num) * 100).toFixed();
        n = parseInt(n);
        return Dinero({ amount: n, currency: 'PLN' })
    }

    const recalculateSummary = (commodities) => {
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

        setVatRate(newVatRateObj);

        setInvoiceSummary({
            nettoAmount: summaryNetto.toFormat('0.00'),
            vatAmount: summaryVat.toFormat('0.00'),
            bruttoAmount: summaryBrutto.toFormat('0.00')
        })
    }

    const moneyCallculations = (invoiceCommodity, id) => {

        const price = convertToDinero(invoiceCommodity[id].price);

        const vat = parseFloat(invoiceCommodity[id].vat);
        const amount = parseFloat(invoiceCommodity[id].amount);
        const discount = parseFloat(invoiceCommodity[id].discount);

        let nettoAmount = price.multiply(amount);
        nettoAmount = nettoAmount.percentage(100 - discount);
        const vatAmount = nettoAmount.percentage(vat);
        const brutto = nettoAmount.add(vatAmount);

        invoiceCommodity[id].price = price.toFormat('0.00');
        invoiceCommodity[id].nettoAmount = nettoAmount.toFormat('0.00');
        invoiceCommodity[id].vatAmount = vatAmount.toFormat('0.00');
        invoiceCommodity[id].brutto = brutto.toFormat('0.00');

        return { ...invoiceCommodity };
    }

    const addInvoiceCommodityfromSelector = () => {
        const commodityFromSelector = props.commodities.find(commodity => commodity.id === commoditySelectOption.value);

        const newId = Math.random().toString(20).substr(2, 6)
        let invoiceCommodity = {
            [newId]: {
                name: commodityFromSelector.name,
                measure: commodityFromSelector.measure.label,
                amount: "1",
                price: commodityFromSelector.price.toString(),
                discount: "0",
                nettoAmount: "",
                vat: commodityFromSelector.vatAmount.toString(),
                vatAmount: "",
                brutto: "",
                measureId: commodityFromSelector.measure.value,
            }
        }

        invoiceCommodity = moneyCallculations(invoiceCommodity, newId);

        let newInvoiceCommodities = {};
        newInvoiceCommodities = Object.assign({ ...props.invoiceCommodities }, invoiceCommodity);

        recalculateSummary(newInvoiceCommodities);
        props.setInvoiceCommodities(newInvoiceCommodities);

    }

    const addNewInvoiceCommodity = () => {

        const newId = Math.random().toString(20).substr(2, 6)
        let invoiceCommodity = {
            [newId]: {
                name: "",
                measure: "",
                amount: 1,
                price: 0,
                discount: 0,
                nettoAmount: "",
                vat: 0,
                vatAmount: "",
                brutto: "",
                measureId: 1,
            }
        }

        invoiceCommodity = moneyCallculations(invoiceCommodity, newId);

        let newInvoiceCommodities = {};
        newInvoiceCommodities = Object.assign({ ...props.invoiceCommodities }, invoiceCommodity);

        recalculateSummary(newInvoiceCommodities);
        props.setInvoiceCommodities(newInvoiceCommodities);
    }

    const recalculateForm = (event, id) => {

        let num = 0;
        if (!isNaN(parseFloat(event.target.value)))
            num = parseFloat(event.target.value)

        props.invoiceCommodities[id][event.target.name] = num.toString();

        let newInvoiceCommodities = moneyCallculations(props.invoiceCommodities, id);

        recalculateSummary(newInvoiceCommodities);
        props.setInvoiceCommodities(newInvoiceCommodities);

    }

    const inputchangehandler = (event, id) => {

        props.invoiceCommodities[id][event.target.name] = event.target.value

        let newInvoiceCommodities = { ...props.invoiceCommodities };

        props.setInvoiceCommodities(newInvoiceCommodities);
    }

    const removeInvoiceCommodity = (id) => {

        let { [id]: removed, ...newInvoiceCommodities } = props.invoiceCommodities;
        recalculateSummary(newInvoiceCommodities);
        props.setInvoiceCommodities(newInvoiceCommodities);
    }

    const setMeasure = (data, id) => {
        props.invoiceCommodities[id].measureId = data.value;
        props.invoiceCommodities[id].measure = data.label;
    }

    const formArray = [];
    for (let key in props.invoiceCommodities) {
        formArray.push({
            id: key,
            formConfig: props.invoiceCommodities[key]
        })
    }

    const formArrayVatRate = [];
    for (let key in vatRate) {
        formArrayVatRate.push({
            id: key,
            form: vatRate[key]
        })
    }

    let counter = 0;
    return (
        <Aux>
            <div className="doc-grid-3-container-invoice">
                <div>Dodaj z bazy: </div>
                <Select
                    options={props.commoditySelectOptions}
                    defaultValue={props.commoditySelectOptions[0]}
                    onChange={setCommoditySelectOption} />
                <img className="icon-size pointer-on-hover" src={addIcon} alt="add" onClick={addInvoiceCommodityfromSelector} />
            </div>
            <div className="grid-11-invoice">
                <div>Lp</div>
                <div />
                <div>Nazwa towaru lub usługi</div>
                <div>J.m.</div>
                <div>ilość</div>
                <div>Cena netto</div>
                <div>Rabat %</div>
                <div>Wartość netto</div>
                <div>Stawka VAT %</div>
                <div>Kwota VAT</div>
                <div>wartość brutto</div>
                {formArray.map(commodity => {
                    let option = props.measureSelectOptions.find(e => e.value === commodity.formConfig.measureId)
                    counter++;
                    return (
                        <Aux key={counter}>
                            <div>{counter}</div>
                            <img className="icon-size-mini pointer-on-hover" src={removeIcon} alt="remove" onClick={() => removeInvoiceCommodity(commodity.id)} />
                            <input className="input-invoice" type="text" name="name" value={commodity.formConfig.name} onChange={event => inputchangehandler(event, commodity.id)} />
                            <Select
                                styles={customStyles}
                                options={props.measureSelectOptions}
                                defaultValue={option}
                                onChange={data => setMeasure(data, commodity.id)} />
                            <input className="input-invoice" type="number" name="amount" value={commodity.formConfig.amount} onChange={event => inputchangehandler(event, commodity.id)} onBlur={event => recalculateForm(event, commodity.id)} />
                            <input className="input-invoice" type="number" name="price" value={commodity.formConfig.price} onChange={event => inputchangehandler(event, commodity.id)} onBlur={event => recalculateForm(event, commodity.id)} />
                            <input className="input-invoice" type="number" name="discount" value={commodity.formConfig.discount} onChange={event => inputchangehandler(event, commodity.id)} onBlur={event => recalculateForm(event, commodity.id)} />
                            <input className="input-invoice" type="number" name="nettoAmount" value={commodity.formConfig.nettoAmount} readOnly />
                            <input className="input-invoice" type="number" name="vat" value={commodity.formConfig.vat} onChange={event => inputchangehandler(event, commodity.id)} onBlur={event => recalculateForm(event, commodity.id)} />
                            <input className="input-invoice" type="number" name="vatAmount" value={commodity.formConfig.vatAmount} readOnly />
                            <input className="input-invoice" type="number" name="brutto" value={commodity.formConfig.brutto} readOnly />
                        </Aux>
                    )
                })}
                <hr className="hr-margin invoice-sumary" />
                <div className="invoice-add-empty">
                    <img className="icon-size pointer-on-hover" src={addIcon} alt="add" onClick={addNewInvoiceCommodity} />
                </div>
                <div>Razem</div>
                <input className="input-invoice" type="number" name="invoiceSummaryNetto" value={invoiceSummary.nettoAmount} readOnly />
                <div />
                <input className="input-invoice" type="number" name="invoiceSummaryVat" value={invoiceSummary.vatAmount} readOnly />
                <input className="input-invoice" type="number" name="invoiceSummaryBrutto" value={invoiceSummary.bruttoAmount} readOnly />

                {
                    formArrayVatRate.map(vRate => {
                        return (<Aux key={vRate.id}>
                            <div className="invoice-add-empty" />
                            <div />
                            <input className="input-invoice" type="number" name="invoiceVatRateNetto" value={vRate.form.nettoAmount} readOnly />
                            <input className="input-invoice" type="number" name="invoiceVatRate" value={vRate.id} readOnly />
                            <input className="input-invoice" type="number" name="invoiceVatRateSummary" value={vRate.form.vatAmount} readOnly />
                            <input className="input-invoice" type="number" name="invoiceVatRateBrutto" value={vRate.form.bruttoAmount} readOnly />
                        </Aux>
                        )
                    })
                }
                 <div className="invoice-add-empty" />
                 <h3>Do zapłaty</h3>
                 <input className="margin-all-1 text-x-large-input border-none" type="number" name="SummaryBrutto" value={invoiceSummary.bruttoAmount} readOnly />
            </div>
        </Aux>
    )
}

const customStyles = {
    option: (styles, state) => ({

        ...styles,
        fontSize: '10px',
        textAlign: 'left',
        width: 'auto',

    }),
    control: (styles, state) => ({
        ...styles,
        border: 'none',
    }),
    dropdownIndicator: (styles, state) => ({
        ...styles,
        padding: '0px'
    }),
    indicatorSeparator: (styles, state) => ({
        ...styles,
        width: '0px'
    }),
}

export default InvoiceCommodities;