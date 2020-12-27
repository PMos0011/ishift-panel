import React, { useEffect, useState } from "react";
import Select from "react-select"
import Aux from "../../hoc/auxiliary";
import { connect } from "react-redux";

import addIcon from "../../images/add.svg";
import removeIcon from "../../images/remove.svg";

import { createDate } from "./invoicesConverters";
import * as calculations from "./commoditiesCalculations";
import { commoditiesSelectStyle } from "./selectCustomStyle";
import { getAdvancedInvoices } from "../../store/invoice/invoiceAction";

const InvoiceCommodities = (props) => {
    const summaryBeginState = {
        nettoAmount: "0.00",
        vatAmount: "0.00",
        bruttoAmount: "0.00"
    }

    const [commoditySelectOption, setCommoditySelectOption] = useState();
    const [vatRate, setVatRate] = useState({});
    const [correctionVatRate, setCorrectionVatRate] = useState({});
    const [invoiceCommoditySummary, setInvoiceCommoditySummary] = useState({ ...summaryBeginState });
    const [invoiceCorrectionSummary, setInvoiceCorrectionSummary] = useState({ ...summaryBeginState });
    const [invoiceSummary, setInvoiceSummary] = useState({ ...summaryBeginState });

    let [showAdvancedInvoiceslist, setShowAdvancedInvoiceslist] = useState(false);
    const [advancedInvoiceSelectOption, setAdvancedInvoiceSelectOption] = useState();

    useEffect(() => {
        if (props.newInvoice) {
            setVatRate({});
            setCorrectionVatRate({});
            setInvoiceCommoditySummary({ ...summaryBeginState });
            setInvoiceCorrectionSummary({ ...summaryBeginState });
            setInvoiceSummary({ ...summaryBeginState });
        }
    }, [props.correctionInvoiceCommodities, props.invoiceType]);

    useEffect(() => {
        try {
            let newInvoiceCommodities = {};
            const sortedCommodities = props.invoiceCommodities.sort((a, b) => a.name.localeCompare(b.name));
            sortedCommodities.map((commodity) => {
                let invoiceCommodity = {};
                invoiceCommodity = calculations.commodityToCorrect(commodity);
                newInvoiceCommodities = Object.assign({ ...newInvoiceCommodities }, invoiceCommodity)
            });

            let newCorrectionCommodities = {};

            for (let key in newInvoiceCommodities) {
                let newCorrection = {
                    [key]: {
                        ...newInvoiceCommodities[key]
                    }
                }
                newCorrectionCommodities = Object.assign({ ...newCorrectionCommodities }, newCorrection);
            }

            props.setCorrectionInvoiceCommodities(newCorrectionCommodities);

            recalculateSummary(newInvoiceCommodities);
            calcualteCorrectionSummary(newCorrectionCommodities);
        } catch (error) { }
    }, []);

    useEffect(() => {
        setCommoditySelectOption(props.commoditySelectOptions[0])
    }, [props.commoditySelectOptions]);


    useEffect(() => {
        setInvoiceSummary({
            nettoAmount: calculations.correctionCallculations(invoiceCorrectionSummary.nettoAmount, invoiceCommoditySummary.nettoAmount),
            vatAmount: calculations.correctionCallculations(invoiceCorrectionSummary.vatAmount, invoiceCommoditySummary.vatAmount),
            bruttoAmount: calculations.correctionCallculations(invoiceCorrectionSummary.bruttoAmount, invoiceCommoditySummary.bruttoAmount)
        });
        props.setInvoicePaymentAmount(calculations.correctionCallculations(invoiceCorrectionSummary.bruttoAmount, invoiceCommoditySummary.bruttoAmount));
    }, [invoiceCommoditySummary]);

    const formArray = [];
    for (let key in props.invoiceCommodities) {
        formArray.push({
            id: key,
            formConfig: props.invoiceCommodities[key],
            correctionFormConfig: props.correctionInvoiceCommodities[key]
        });
    };

    let allVatRates = [...Object.keys(vatRate)];

    try {
        allVatRates = [... new Set([...Object.keys(vatRate), ...Object.keys(correctionVatRate)])];
        allVatRates = allVatRates.sort();
    } catch (error) { }

    const formArrayVatRate = [];
    for (let i in allVatRates) {
        formArrayVatRate.push({
            id: allVatRates[i],
            form: vatRate[allVatRates[i]],
            correctionForm: correctionVatRate[allVatRates[i]]
        });
    };

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

    const calcualteCorrectionSummary = (commodities) => {
        let rateObj = calculations.recalculateSummary(commodities);
        setCorrectionVatRate(rateObj.newVatRateObj);

        setInvoiceCorrectionSummary({
            nettoAmount: rateObj.summary[0].toFormat('0.00'),
            vatAmount: rateObj.summary[1].toFormat('0.00'),
            bruttoAmount: rateObj.summary[2].toFormat('0.00')
        });
    }

    const recalculateSummary = (commodities) => {

        let rateObj = calculations.recalculateSummary(commodities);

        checkVatExemptions(rateObj.newVatRateObj);
        setVatRate(rateObj.newVatRateObj);

        setInvoiceCommoditySummary({
            nettoAmount: rateObj.summary[0].toFormat('0.00'),
            vatAmount: rateObj.summary[1].toFormat('0.00'),
            bruttoAmount: rateObj.summary[2].toFormat('0.00')
        });

        props.setInvoiceCommodities(commodities);
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

    const addAdvancedInvoiceCommodity = () => {

        if (advancedInvoiceSelectOption !== undefined && props.usedAdvancedInvoices.indexOf(advancedInvoiceSelectOption.value) === -1) {
            let commodity = advancedInvoiceSelectOption.commodity[0];
            commodity.price = - Math.abs(commodity.price);
            commodity.vatAmount = commodity.vat;
            commodity.name = "Rozliczenie zaliczki " + advancedInvoiceSelectOption.number + " z dn.: " + createDate(advancedInvoiceSelectOption.issueDate);
            commodity.value = advancedInvoiceSelectOption.value;

            let invoiceCommodity = calculations.addInvoiceCommodity(commodity);

            let newInvoiceCommodities = {};
            newInvoiceCommodities = Object.assign({ ...props.invoiceCommodities }, invoiceCommodity);

            const newUsedAdvancedInvoices = [...props.usedAdvancedInvoices];
            newUsedAdvancedInvoices.push(advancedInvoiceSelectOption.value);
            props.setUsedAdvancedInvoices(newUsedAdvancedInvoices);

            recalculateSummary(newInvoiceCommodities);
        }

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

        if (removed.value) {
            let newUsedAdvancedInvoices = [...props.usedAdvancedInvoices];
            newUsedAdvancedInvoices.splice(newUsedAdvancedInvoices.indexOf(removed.value), 1);
            props.setUsedAdvancedInvoices(newUsedAdvancedInvoices);
        }
        recalculateSummary(newInvoiceCommodities);
    }

    const getAdvancedInvoicesList = () => {
        props.getAdvancedInvoices(props.dbId);

        setShowAdvancedInvoiceslist(true);
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

    const commodityRow = (id, commodity, isReadOnly, isCorrection, counter) => {
        let measureOption = props.measureSelectOptions.find(m => m.label === commodity.measure);
        let vatOption = props.vatSelectOptions.find(v => v.label == commodity.vat);

        let tableFirst2Columns = <Aux>
            {counter === undefined ? <div /> : <div>{counter}</div>}
            {isCorrection ? <div /> : <img className="icon-size-mini pointer-on-hover" src={removeIcon} alt="remove" onClick={() => removeInvoiceCommodity(id)} />}
        </Aux>

        if (isCorrection && counter === undefined)
            tableFirst2Columns = <div className="item-grid-2-full flex-center"><h5>po korekcie:</h5></div>


        return (
            <Aux>
                {tableFirst2Columns}
                <input className="input-invoice" type="text" name="name" value={commodity.name} onChange={event => inputchangehandler(event, id)} readOnly={isReadOnly} />
                <Select
                    styles={commoditiesSelectStyle}
                    options={props.measureSelectOptions}
                    value={measureOption}
                    onChange={data => setMeasure(data, id)}
                    isDisabled={isReadOnly} />
                <input className="input-invoice" type="number" name="amount" min="0" step="0.01" value={commodity.amount} onChange={event => inputchangehandler(event, id)} onBlur={event => recalculateForm(event, id)} readOnly={isReadOnly} />
                <input className="input-invoice" type="number" name="price" min="0" step="0.01" value={commodity.price} onChange={event => inputchangehandler(event, id)} onBlur={event => recalculateForm(event, id)} readOnly={isReadOnly} />
                <input className="input-invoice" type="number" name="discount" min="0" step="0.01" value={commodity.discount} onChange={event => inputchangehandler(event, id)} onBlur={event => recalculateForm(event, id)} readOnly={isReadOnly} />
                <input className="input-invoice" type="number" name="nettoAmount" value={commodity.nettoAmount} readOnly />
                <Select
                    styles={commoditiesSelectStyle}
                    options={props.vatSelectOptions}
                    value={vatOption}
                    onChange={data => setVatType(data, id)}
                    isDisabled={isReadOnly} />
                <input className="input-invoice" type="number" name="vatAmount" value={commodity.vatAmount} readOnly />
                <input className="input-invoice" type="number" name="brutto" value={commodity.brutto !== undefined ? commodity.brutto : 0} readOnly />
            </Aux>)
    }

    const correctionRow = (commodityBeforeCorrection, commodityAfterCorrection) => {

        return (
            <Aux>
                <div className="item-grid-4-full flex-center-right"><h5>korekta:</h5></div>
                <input className="input-invoice" type="number" value={calculations.correctionCallculations(commodityBeforeCorrection.amount, commodityAfterCorrection.amount)} readOnly />
                <input className="input-invoice" type="number" value={calculations.correctionCallculations(commodityBeforeCorrection.price, commodityAfterCorrection.price)} readOnly />
                <input className="input-invoice" type="number" value={calculations.correctionCallculations(commodityBeforeCorrection.discount, commodityAfterCorrection.discount)} readOnly />
                <input className="input-invoice" type="number" value={calculations.correctionCallculations(commodityBeforeCorrection.nettoAmount, commodityAfterCorrection.nettoAmount)} readOnly />
                <div />
                <input className="input-invoice" type="number" value={calculations.correctionCallculations(commodityBeforeCorrection.vatAmount, commodityAfterCorrection.vatAmount)} readOnly />
                <input className="input-invoice" type="number" value={calculations.correctionCallculations(commodityBeforeCorrection.brutto, commodityAfterCorrection.brutto)} readOnly />
            </Aux>
        )

    }
    const displayCommodity = (commodity, counter) => {
        if (commodity.correctionFormConfig === undefined)
            if (props.invoiceType === 1)
                return commodityRow(commodity.id, commodity.formConfig, false, false, counter)
            else
                return commodityRow(commodity.id, commodity.formConfig, false, true, counter)
        else {
            return (
                <Aux>
                    {commodityRow(commodity.id, commodity.correctionFormConfig, true, true, counter)}
                    {commodityRow(commodity.id, commodity.formConfig, false, true)}
                    {correctionRow(commodity.correctionFormConfig, commodity.formConfig)}
                    <hr className="hr-margin item-grid-11-full" />
                </Aux>
            )
        }
    }

    const preventUndefined = (object) => {
        let nettoAmount = "0.00";
        let vatAmount = "0.00"
        let bruttoAmount = "0.00";
        if (object !== undefined) {
            nettoAmount = object.nettoAmount;
            vatAmount = object.vatAmount;
            bruttoAmount = object.bruttoAmount;
        }

        return {
            nettoAmount: nettoAmount,
            vatAmount: vatAmount,
            bruttoAmount: bruttoAmount
        }

    }

    const vatRateRow = (id, vRate, rowExplenation) => {
        const newVRate = preventUndefined(vRate);
        return (
            <Aux>
                <div className="invoice-add-empty" />
                <div className="flex-center-right">{rowExplenation}</div>
                <input className="input-invoice" type="number" name="invoiceVatRateNetto" value={newVRate.nettoAmount} readOnly />
                <input className="input-invoice" type="text" name="invoiceVatRate" value={id} readOnly />
                <input className="input-invoice" type="number" name="invoiceVatRateSummary" value={newVRate.vatAmount} readOnly />
                <input className="input-invoice" type="number" name="invoiceVatRateBrutto" value={newVRate.bruttoAmount} readOnly />
            </Aux>
        )
    }

    const correctionVatRow = (before, after) => {
        const newBefore = preventUndefined(before);
        const newAfter = preventUndefined(after);
        return (
            <Aux>
                <div className="invoice-add-empty" />
                <div className="flex-center-right">korekta:</div>
                <input className="input-invoice" type="number" name="invoiceVatRateNetto" value={calculations.correctionCallculations(newBefore.nettoAmount, newAfter.nettoAmount)} readOnly />
                <div />
                <input className="input-invoice" type="number" name="invoiceVatRateSummary" value={calculations.correctionCallculations(newBefore.vatAmount, newAfter.vatAmount)} readOnly />
                <input className="input-invoice" type="number" name="invoiceVatRateBrutto" value={calculations.correctionCallculations(newBefore.bruttoAmount, newAfter.bruttoAmount)} readOnly />
            </Aux>
        )
    }

    const displayVatRate = (id, vRate, invoiceType) => {
        if (invoiceType !== 2)
            return (
                <Aux key={id}> {vatRateRow(id, vRate.form, "")} </Aux>)
        return (
            <Aux key={id}>
                {vatRateRow(id, vRate.correctionForm, "przed:")}
                {vatRateRow(id, vRate.form, "po:")}
                {correctionVatRow(vRate.correctionForm, vRate.form)}
                <hr className="hr-margin item-grid-7-11" />
            </Aux>)
    }

    const summaryRow = (summary, newInvoice, rowDescription) => {
        return (
            <Aux>
                <div className="invoice-add-empty">
                    {newInvoice ? <img className="icon-size pointer-on-hover" src={addIcon} alt="add" onClick={() => addInvoiceCommodity(false)} /> : null}
                </div>
                <div className="flex-center">{rowDescription}</div>
                <input className="input-invoice" type="number" name="invoiceSummaryNetto" value={summary.nettoAmount} readOnly />
                <div />
                <input className="input-invoice" type="number" name="invoiceSummaryVat" value={summary.vatAmount} readOnly />
                <input className="input-invoice" type="number" name="invoiceSummaryBrutto" value={summary.bruttoAmount} readOnly />
            </Aux>
        )

    }

    const displayInvoiceSummary = (commodityiesSummary, correctionSummary, invoiceSummary, invoiceType) => {
        if (invoiceType === 1)
            return summaryRow(invoiceSummary, true, "RAZEM");
        else if (invoiceType === 3)
            return summaryRow(invoiceSummary, false, "RAZEM");
        else
            return (
                <Aux>
                    {summaryRow(correctionSummary, false, "przed:")}
                    {summaryRow(commodityiesSummary, false, "po:")}
                    {summaryRow(invoiceSummary, false, "RAZEM")}
                    <hr className="hr-margin item-grid-7-11" />
                </Aux>)

    }

    const commodityFromDatabase = <div className="doc-grid-3-container-invoice">
        <div>Towary i usł: </div>
        <Select
            options={props.commoditySelectOptions}
            value={commoditySelectOption}
            onChange={setCommoditySelectOption} />
        <img className="icon-size pointer-on-hover" src={addIcon} alt="add" onClick={() => addInvoiceCommodity(true)} />
    </div>

    const advancedInvoices =
        <div className="hr-margin"><h4 className="text-underline" onClick={getAdvancedInvoicesList}>Rozlicz zaliczkę</h4></div>

    const advancedInvoiceSelect =
        <div className="doc-grid-3-container-invoice hr-margin">
            <div>Zaliczki:</div>
            <Select
                options={props.advancedInvoiceList}
                onChange={setAdvancedInvoiceSelectOption} />
            <img className="icon-size pointer-on-hover" src={addIcon} alt="add" onClick={addAdvancedInvoiceCommodity} />
        </div>

    const exchangeValue = (invoiceSummary) => {

        try {
            if (props.currencyData.exchangeRate !== null) {

                let exchangeVal = {
                    nettoAmount: calculations.currencyExchangeCalculations(invoiceSummary.nettoAmount, props.currencyData.exchangeRate),
                    vatAmount: calculations.currencyExchangeCalculations(invoiceSummary.vatAmount, props.currencyData.exchangeRate),
                    bruttoAmount: calculations.currencyExchangeCalculations(invoiceSummary.bruttoAmount, props.currencyData.exchangeRate)
                }

                return (<Aux>
                    <hr className="hr-margin item-grid-7-11" />
                    {summaryRow(exchangeVal, false, "Po przeliczniu (PLN)")}
                </Aux>)
            }
        }
        catch (e) { }
    }

    let counter = 0;
    return (
        <Aux>
            {props.invoiceType === 1 ? commodityFromDatabase : null}
            {props.invoiceType === 1 && !showAdvancedInvoiceslist ? advancedInvoices : null}
            {props.invoiceType === 1 && showAdvancedInvoiceslist ? advancedInvoiceSelect : null}

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
                    counter++;
                    return (
                        <Aux key={counter}>
                            {displayCommodity(commodity, counter)}
                        </Aux>
                    )
                })}
                <hr className="hr-margin invoice-sumary" />

                {displayInvoiceSummary(invoiceCommoditySummary, invoiceCorrectionSummary, invoiceSummary, props.invoiceType)}

                {formArrayVatRate.map(vRate => displayVatRate(vRate.id, vRate, props.invoiceType))}

                <div className="invoice-add-empty" />
                {invoiceSummary.bruttoAmount < 0 ? <h3>Do zwrotu ({props.currencyData.currentCurrency})</h3> : <h3>Do zapłaty ({props.currencyData.currentCurrency})</h3>}

                <input className="margin-all-1 text-x-large-input border-none" type="number" name="SummaryBrutto" value={Math.abs(invoiceSummary.bruttoAmount).toFixed(2)} readOnly />

                {exchangeValue(invoiceSummary)}
            </div>

        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        commoditySelectOptions: state.commodityReducer.commoditySelectOpotions,
        commodities: state.commodityReducer.commodities,
        measureSelectOptions: state.commodityReducer.measures,
        vatSelectOptions: state.invoiceReducer.vatTypes,
        advancedInvoiceList: state.invoiceReducer.advancedInvoiceList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAdvancedInvoices: (id) => dispatch(getAdvancedInvoices(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceCommodities);