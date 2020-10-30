import React, { useState } from 'react';
import { connect } from "react-redux";
import Select from "react-select"
import DatePicker from "react-datepicker";
import Aux from "../../hoc/auxiliary";

import { setMessage } from '../../store/alerts/alertsActions';
import {isBankAccountNumberIncorrect} from "../bankAccounts/converters";

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
        comments: false
    });

    const checkboxChange = (event) => {
        let newState = { ...checkboxState };
        newState[event.target.name] = !checkboxState[event.target.name]

        if (event.target.name === "bankAccfromDb" && newState.bankAccfromDb)
            newState.ownBankAcc = false
        if (newState.ownBankAcc)
            newState.bankAccfromDb = false

        setCheckboxState(newState)

        let newSummaryData = { ...props.summaryData }

        if (event.target.name === "bankAccfromDb" || event.target.name === "ownBankAcc") {
            if (!newState.ownBankAcc && !newState.bankAccfromDb)
                newSummaryData.bankAcc = null;
            else
                newSummaryData.bankAcc = "";
        } else
            if (!newState[event.target.name])
                newSummaryData[event.target.name] = null
            else
                newSummaryData[event.target.name] = ""

        props.setSummaryData(newSummaryData);
    }

    const setPaidDay = (data) => {
        let newData = { ...props.summaryData }
        newData.paidDay = data;
        props.setSummaryData(newData);
    }

    const setPaymentDay = (data) => {
        let newData = { ...props.summaryData }
        newData.paymentDay = data;
        props.setSummaryData(newData);
    }

    const inputChange = (event) => {
        let newData = { ...props.summaryData }
        newData[event.target.name] = event.target.value;
        props.setSummaryData(newData);
    }

    const selectChage = (data, name) => {
        let newSummaryData = { ...props.summaryData }

        switch (name.name) {
            case "paymentStatus":
                newSummaryData.statusId = data.value;
                newSummaryData.statusIdValue = data.label;
                let newState = { ...checkboxState };
                if (data.value === 0) {
                    newState.paid = false;
                    newState.paidDay = false;
                    newSummaryData.paid = null;
                    newSummaryData.paidDay = null;
                }
                else {
                    newState.paid = true;
                    newState.paidDay = true;
                    if (newSummaryData.paidDay === null)
                        newSummaryData.paidDay = "";
                    if (newSummaryData.paid === null)
                        newSummaryData.paid = "";
                    if (data.value === 1)
                        newSummaryData.paid = props.invoicePaymentAmount;

                }
                setCheckboxState(newState);
                break;
            case "paymentOption":
                newSummaryData.paidWay = data.value;
                newSummaryData.paymentOptionIdValue = data.label;
                break
            case "bankAcc":
                newSummaryData.bankAcc = data.label;
                break;
        }
        props.setSummaryData(newSummaryData);
    }

    const bankAccountNumberValidation = () => {
        let number = props.summaryData.bankAcc.replaceAll(" ", "");
        
        if(isBankAccountNumberIncorrect(number))
        props.setMessage("Coś jest nie tak z numerem konta", true);
        else{
            let newSummaryData = { ...props.summaryData };
            newSummaryData.bankAcc = number;
            props.setSummaryData(newSummaryData);
        }
    }

    const bankAccSelect = <Select className="margin-top-1"
        name="bankAcc"
        options={props.bankAccountsSelectOptions}
        onChange={(data, name) => selectChage(data, name)} />

    const bankAccInput = <input
        className="text-x-large-input full-width"
        type="text"
        name="bankAcc"
        value={preventNull(props.summaryData.bankAcc)}
        onChange={inputChange}
        onBlur = {bankAccountNumberValidation}
        disabled={!checkboxState.ownBankAcc} />

    let vatExemptionNp = null;
    if (props.summaryData.vatExemptionLabelNp !== null)
        vatExemptionNp = <Aux>
            <div className="margin-all-1">
                <label>{preventNull(props.summaryData.vatExemptionLabelNp)}</label>
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
                <label>{preventNull(props.summaryData.vatExemptionLabelZw)}</label>
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
            <div className="grid-4-invoice-summary">
                <div className="margin-all-1">Status
            <Select
                        className="margin-top-1"
                        options={props.invoicePaymnetStatusOptions}
                        name="paymentStatus"
                        onChange={(data, name) => selectChage(data, name)}
                        defaultValue={props.invoicePaymnetStatusOptions[0]} />
                </div>
                <div className="margin-all-1">
                    <input type="checkbox"
                        name="paid"
                        checked={checkboxState.paid}
                        onChange={checkboxChange} />Zapłacono
            <input className="text-x-large-input"
                        type="number"
                        name="paid"
                        value={preventNull(props.summaryData.paid)}
                        onChange={inputChange}
                        disabled={!checkboxState.paid} />

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
                        disabled={!checkboxState.paidDay}
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
                        defaultValue={props.invoicePaymentOptions[props.summaryData.paidWay]}
                        name="paymentOption"
                        onChange={(data, name) => selectChage(data, name)}
                        isDisabled={!checkboxState.paidWay} />
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
                        disabled={!checkboxState.paymentDay}
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
                    {checkboxState.bankAccfromDb ? bankAccSelect : bankAccInput}
                </div>
                <div className="margin-all-1">
                    <input type="checkbox"
                        name="comments"
                        checked={checkboxState.comments}
                        onChange={checkboxChange} />Uawgi <br />
                    <textarea
                        className="full-width margin-top-1"
                        value={preventNull(props.summaryData.comments)}
                        onChange={inputChange}
                        name="comments"
                        disabled={!checkboxState.comments} />
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

export default connect(mapStateToProps,mapDispatchToProps)(InvoiceSummary);
