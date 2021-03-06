import React, { useState } from 'react';
import { connect } from "react-redux";
import Select from "react-select"
import DatePicker from "react-datepicker";
import Aux from "../../hoc/auxiliary";

import { setMessage } from '../../store/alerts/alertsActions';
import { isBankAccountNumberIncorrect } from "../bankAccounts/converters";

import { pl } from "date-fns/locale";

const InvoiceSummary = (props) => {

    const preventNull = (data) => {

        return data !== null ? data : ""
    }

    const [checkboxState, setCheckboxState] = useState({
        paid: false,
        paidDay: false,
        paidWay: false,
        paymentDay: false,
        bankAccfromDb: false,
        ownBankAcc: false,
        comments: false,
        vatExemptionValueNp: false,
        vatExemptionValueZw: false
    });

    const [paydWaycurrentSelect, setPaydWaycurrentSelect] = useState(null);
    const [bankAccSelectOption, setBankAccSelectOption] = useState(null);

    const vatExemptionsHandling = (name, checkboxState, summaryData) => {

        const exemption = name.slice(name.length - 2);
        const labelName = "vatExemptionLabel" + exemption;

        if (!checkboxState[name]) {
            summaryData[name] = "";
            summaryData[labelName] = "";
        }
        else {
            let labelValue = "Rodzaj dokonywanej sprzedaży (w związku ze stawką VAT np.)";
            if (exemption === "Zw")
                labelValue = "Podstawa zwolnienia z podatku VAT (w związku ze stawką VAT zw.)";

            summaryData[labelName] = labelValue;
        }

        return summaryData;
    }

    const checkboxChange = (event, fromInput) => {

        let newState = { ...checkboxState };
        newState[event.target.name] = !checkboxState[event.target.name]

        if (fromInput) {
            newState[event.target.name] = true;
        }

        if (event.target.name === "bankAccfromDb" && newState.bankAccfromDb)
            newState.ownBankAcc = false
        if (newState.ownBankAcc)
            newState.bankAccfromDb = false

        setCheckboxState(newState)

        let newSummaryData = { ...props.summaryData }

        if (event.target.name === "bankAccfromDb" || event.target.name === "ownBankAcc") {
            if (!newState.bankAccfromDb) {
                setBankAccSelectOption(null);
                if (!newState.ownBankAcc)
                    newSummaryData.bankAcc = null;
            } else
                newSummaryData.bankAcc = "";
        } else if (event.target.name === "vatExemptionValueNp" || event.target.name === "vatExemptionValueZw") {
            vatExemptionsHandling(event.target.name, newState, newSummaryData);
        } else if (event.target.name === "paid" && newState[event.target.name]) {
            newSummaryData[event.target.name] = props.invoicePaymentAmount;
        } else if (event.target.name === "paidWay" && !newState[event.target.name]) {
            newSummaryData.paymentOptionIdValue = null;
            setPaydWaycurrentSelect(null);
        }
        else
            if (!newState[event.target.name])
                newSummaryData[event.target.name] = null
            else
                newSummaryData[event.target.name] = ""

        if (fromInput)
            newSummaryData[event.target.name] = event.target.value;

        props.setSummaryData(newSummaryData);
    }

    const setPaidDay = (data) => {
        const event = {
            target: {
                name: "paidDay"
            }
        }
        checkboxChange(event, true);
        let newData = { ...props.summaryData }
        newData.paidDay = data;
        props.setSummaryData(newData);
    }

    const setPaymentDay = (data) => {
        const event = {
            target: {
                name: "paymentDay"
            }
        }
        checkboxChange(event, true);
        let newData = { ...props.summaryData }
        newData.paymentDay = data;
        props.setSummaryData(newData);
    }

    const inputChange = (event) => {
        checkboxChange(event, true);
    }

    const selectChage = (data, name) => {
        let newSummaryData = { ...props.summaryData }

        const event = {
            target: {
                name: name.name
            }
        }
        checkboxChange(event, true);

        switch (name.name) {
            case "paidWay":
                newSummaryData.paidWay = data.value;
                newSummaryData.paymentOptionIdValue = data.label;
                setPaydWaycurrentSelect(props.invoicePaymentOptions[data.label]);
                break
            case "bankAccfromDb":
                newSummaryData.bankAcc = data.label;
                setBankAccSelectOption(props.bankAccountsSelectOptions[data.label]);
                break;
        }
        props.setSummaryData(newSummaryData);
    }

    const bankAccountNumberValidation = () => {
        let number = props.summaryData.bankAcc.replaceAll(" ", "");
        if (number > 0) {
            if (isBankAccountNumberIncorrect(number))
                props.setMessage("Coś jest nie tak z numerem konta", true);
            else {
                let newSummaryData = { ...props.summaryData };
                newSummaryData.bankAcc = number;
                props.setSummaryData(newSummaryData);
            }
        }
    }

    const bankAccSelect = <Select className="margin-top-1"
        name="bankAccfromDb"
        options={props.bankAccountsSelectOptions}
        onChange={(data, name) => selectChage(data, name)}
        value={bankAccSelectOption} />

    const bankAccInput = <input
        className="text-x-large-input full-width"
        type="text"
        name="bankAcc"
        value={preventNull(props.summaryData.bankAcc)}
        onChange={inputChange}
        onBlur={bankAccountNumberValidation}
        disabled={!checkboxState.ownBankAcc} />

    let vatExemptionNp = null;
    if (props.summaryData.vatExemptionLabelNp !== null)
        vatExemptionNp = <Aux>
            <div className="margin-all-1">
                <input type="checkbox"
                    name="vatExemptionValueNp"
                    checked={checkboxState.vatExemptionValueNp}
                    onChange={checkboxChange} />
                        Rodzaj dokonywanej sprzedaży (w związku ze stawką VAT np.)
                    <textarea
                    className="full-width margin-top-1"
                    value={preventNull(props.summaryData.vatExemptionValueNp)}
                    onChange={inputChange}
                    name="vatExemptionValueNp" />
            </div>
        </Aux>

    let vatExemptionZw = null;
    if (props.summaryData.vatExemptionLabelZw !== null)
        vatExemptionZw = <Aux>
            <div className="margin-all-1">
                <input type="checkbox"
                    name="vatExemptionValueZw"
                    checked={checkboxState.vatExemptionValueZw}
                    onChange={checkboxChange} />
                   Podstawa zwolnienia z podatku VAT (w związku ze stawką VAT zw.)
                    <textarea
                    className="full-width margin-top-1"
                    value={preventNull(props.summaryData.vatExemptionValueZw)}
                    onChange={inputChange}
                    name="vatExemptionValueZw" />
            </div>
        </Aux>

    return (
        <Aux>
            <div className="grid-2-invoice-summary">
                {vatExemptionNp}
                {vatExemptionZw}
            </div>
            <div className="grid-3-invoice-summary">
                <div className="margin-all-1">
                    <input type="checkbox"
                        name="paid"
                        checked={checkboxState.paid}
                        onChange={checkboxChange} />Zapłacono
            <input className="text-x-large-input"
                        type="number"
                        name="paid"
                        value={preventNull(props.summaryData.paid)}
                        onChange={inputChange} />

                </div>
                <div className="margin-all-1">
                    <input type="checkbox"
                        name="paidDay"
                        checked={checkboxState.paidDay}
                        onChange={checkboxChange}
                    />Data płatności<br />
                    <DatePicker
                        className="text-x-large-input"
                        closeOnScroll={true}
                        selected={preventNull(props.summaryData.paidDay)}
                        onChange={date => setPaidDay(date)}
                        dateFormat="dd.MM.yyyy"
                        locale={pl}
                        name="paidDay" />
                </div>
                <div className="margin-all-1">
                    <input type="checkbox"
                        name="paidWay"
                        checked={checkboxState.paidWay}
                        onChange={checkboxChange} />Sposób płatności
            <Select
                        className="margin-top-1"
                        options={props.invoicePaymentOptions}
                        value={paydWaycurrentSelect}
                        name="paidWay"
                        onChange={(data, name) => selectChage(data, name)} />
                </div></div>
            <div className="grid-3-invoice-summary">
                <div className="margin-all-1">
                    <input type="checkbox"
                        name="paymentDay"
                        checked={checkboxState.paymentDay}
                        onChange={checkboxChange} />Termin płatności
            <DatePicker
                        className="text-x-large-input"
                        closeOnScroll={true}
                        selected={preventNull(props.summaryData.paymentDay)}
                        onChange={date => setPaymentDay(date)}
                        dateFormat="dd.MM.yyyy"
                        locale={pl} />

                </div>
                <div className="margin-all-1">
                    <input type="checkbox"
                        name="bankAccfromDb"
                        checked={checkboxState.bankAccfromDb}
                        onChange={checkboxChange} />Numer konta z bazy danych
                    <input type="checkbox"
                        name="ownBankAcc"
                        checked={checkboxState.ownBankAcc}
                        onChange={checkboxChange} />Własny numer konta<br />
                    {checkboxState.ownBankAcc ? bankAccInput : bankAccSelect}
                </div>
                <div className="margin-all-1">
                    <input type="checkbox"
                        name="comments"
                        checked={checkboxState.comments}
                        onChange={checkboxChange} />Uwagi <br />
                    <textarea
                        className="full-width margin-top-1"
                        value={preventNull(props.summaryData.comments)}
                        onChange={inputChange}
                        name="comments" />
                </div>
            </div>
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        invoicePaymentOptions: state.invoiceReducer.invoicePaymentOptions,
        invoicePaymnetStatusOptions: state.invoiceReducer.invoicePaymnetStatusOptions,
        bankAccountsSelectOptions: state.bankReducer.bankAccountsSelectOptions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setMessage: (message, isError) => dispatch(setMessage(message, isError)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceSummary);
