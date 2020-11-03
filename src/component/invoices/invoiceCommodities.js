import React, { useEffect, useState } from "react";
import Select from "react-select"
import Aux from "../../hoc/auxiliary";
import { connect } from "react-redux";

import addIcon from "../../images/add.svg";
import removeIcon from "../../images/remove.svg";

import * as calculations from "./commoditiesCalculations";
import { commoditiesSelectStyle } from "./selectCustomStyle";

const InvoiceCommodities = (props) => {
    useEffect(() => {
        setCommoditySelectOption(props.commoditySelectOptions[0])
    }, [props.commoditySelectOptions])

    const [commoditySelectOption, setCommoditySelectOption] = useState();
    const [vatRate, setVatRate] = useState({});
    const [invoiceSummary, setInvoiceSummary] = useState(
        {
            nettoAmount: "0.00",
            vatAmount: "0.00",
            bruttoAmount: "0.00"
        }
    );

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

    const checkVatExemptions = (vatRateObj) => {

        let newSumaryData = { ...props.summaryData }

        const vatExemptionNp = vatRateObj["NP."];
        const vatExemptionZw = vatRateObj["ZW."];

        if (vatExemptionNp === undefined) {
            newSumaryData.vatExemptionLabelNp = null;
            newSumaryData.vatExemptionValueNp = null;
        } else if (newSumaryData.vatExemptionValueNp === null) {
            newSumaryData.vatExemptionLabelNp = "";
            newSumaryData.vatExemptionValueNp = "";
        }

        if (vatExemptionZw === undefined) {
            newSumaryData.vatExemptionLabelZw = null;
            newSumaryData.vatExemptionValueZw = null;
        }
        else if (newSumaryData.vatExemptionValueZw === null) {
            newSumaryData.vatExemptionLabelZw = "";
            newSumaryData.vatExemptionValueZw = "";
        }

        props.setSummaryData(newSumaryData);
    }

    const recalculateSummary = (commodities) => {

        let rateObj = calculations.recalculateSummary(commodities);

        checkVatExemptions(rateObj.newVatRateObj);
        setVatRate(rateObj.newVatRateObj);

        setInvoiceSummary({
            nettoAmount: rateObj.summary[0].toFormat('0.00'),
            vatAmount: rateObj.summary[1].toFormat('0.00'),
            bruttoAmount: rateObj.summary[2].toFormat('0.00')
        });
        props.setInvoiceCommodities(commodities);
        props.setInvoicePaymentAmount(rateObj.summary[2].toFormat('0.00'));
    }

    const addInvoiceCommodity = (isFromSelector) => {

        let commodity;
        if (isFromSelector && commoditySelectOption !== undefined)
            commodity = props.commodities.find(commodity => commodity.id === commoditySelectOption.value);

        let invoiceCommodity = calculations.addInvoiceCommodity(commodity);

        let newInvoiceCommodities = {};
        newInvoiceCommodities = Object.assign({ ...props.invoiceCommodities }, invoiceCommodity);
        recalculateSummary(newInvoiceCommodities);
    }

    const recalculateForm = (event, id) => {

        let num = 0;
        if (!isNaN(parseFloat(event.target.value)))
            num = parseFloat(event.target.value)

        props.invoiceCommodities[id][event.target.name] = num.toString();

        let newInvoiceCommodities = calculations.moneyCallculations(props.invoiceCommodities, id);
        recalculateSummary(newInvoiceCommodities);
    }

    const inputchangehandler = (event, id) => {

        props.invoiceCommodities[id][event.target.name] = event.target.value

        let newInvoiceCommodities = { ...props.invoiceCommodities };
        props.setInvoiceCommodities(newInvoiceCommodities);
    }

    const removeInvoiceCommodity = (id) => {

        let { [id]: removed, ...newInvoiceCommodities } = props.invoiceCommodities;
        recalculateSummary(newInvoiceCommodities);
    }

    const setMeasure = (data, id) => {

        let newCommodities = { ...props.invoiceCommodities }
        newCommodities[id].measure = data.label;

        props.setInvoiceCommodities(newCommodities);
    }

    const setVatType = (data, id) => {

        props.invoiceCommodities[id].vat = data.label;
        let newInvoiceCommodities = calculations.moneyCallculations(props.invoiceCommodities, id);

        recalculateSummary(newInvoiceCommodities);
    }

    let counter = 0;
    return (
        <Aux>
            <div className="doc-grid-3-container-invoice">
                <div>Dodaj z bazy: </div>
                <Select
                    options={props.commoditySelectOptions}
                    value={commoditySelectOption}
                    onChange={setCommoditySelectOption} />
                <img className="icon-size pointer-on-hover" src={addIcon} alt="add" onClick={() => addInvoiceCommodity(true)} />
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
                    let measureOption = props.measureSelectOptions.find(m => m.label === commodity.formConfig.measure);
                    let vatOption = props.vatSelectOptions.find(v => v.label == commodity.formConfig.vat);
                    counter++;
                    return (
                        <Aux key={counter}>
                            <div>{counter}</div>
                            <img className="icon-size-mini pointer-on-hover" src={removeIcon} alt="remove" onClick={() => removeInvoiceCommodity(commodity.id)} />
                            <input className="input-invoice" type="text" name="name" value={commodity.formConfig.name} onChange={event => inputchangehandler(event, commodity.id)} />
                            <Select
                                styles={commoditiesSelectStyle}
                                options={props.measureSelectOptions}
                                value={measureOption}
                                onChange={data => setMeasure(data, commodity.id)} />
                            <input className="input-invoice" type="number" name="amount" min="0" step="0.05" value={commodity.formConfig.amount} onChange={event => inputchangehandler(event, commodity.id)} onBlur={event => recalculateForm(event, commodity.id)} />
                            <input className="input-invoice" type="number" name="price" min="0" step="0.05" value={commodity.formConfig.price} onChange={event => inputchangehandler(event, commodity.id)} onBlur={event => recalculateForm(event, commodity.id)} />
                            <input className="input-invoice" type="number" name="discount" min="0" step="0.05" value={commodity.formConfig.discount} onChange={event => inputchangehandler(event, commodity.id)} onBlur={event => recalculateForm(event, commodity.id)} />
                            <input className="input-invoice" type="number" name="nettoAmount" value={commodity.formConfig.nettoAmount} readOnly />
                            <Select
                                styles={commoditiesSelectStyle}
                                options={props.vatSelectOptions}
                                value={vatOption}
                                onChange={data => setVatType(data, commodity.id)} />
                            <input className="input-invoice" type="number" name="vatAmount" value={commodity.formConfig.vatAmount} readOnly />
                            <input className="input-invoice" type="number" name="brutto" value={commodity.formConfig.brutto} readOnly />
                        </Aux>
                    )
                })}
                <hr className="hr-margin invoice-sumary" />
                <div className="invoice-add-empty">
                    <img className="icon-size pointer-on-hover" src={addIcon} alt="add" onClick={() => addInvoiceCommodity(false)} />
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
                            <input className="input-invoice" type="text" name="invoiceVatRate" value={vRate.id} readOnly />
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

const mapStateToProps = (state) => {
    return {
        commoditySelectOptions: state.commodityReducer.commoditySelectOpotions,
        commodities: state.commodityReducer.commodities,
        measureSelectOptions: state.commodityReducer.measures,
        vatSelectOptions: state.invoiceReducer.vatTypes
    };
};

export default connect(mapStateToProps)(InvoiceCommodities);