import React, { useState } from 'react';
import { connect } from "react-redux";
import Select from "react-select"
import DatePicker from "react-datepicker";
import Aux from "../../hoc/auxiliary";

import { pl } from "date-fns/locale";

const InvoiceSummary = (props) => {

    const [checkoboxState, setCheckboxstate] = useState({
        paid: false,
        paidDay: false,
        paidWay: true,
        paymentDay: true,
        bankAccfromDb: true,
        ownBankAcc: false,
        comments: false
    });

    const preventNull = (data) => {

        return data !== null ? data : ""
    }

    const checkboxChange = (event) => {
        let newSate = { ...checkoboxState };
        newSate[event.target.name] = !checkoboxState[event.target.name]

        if (event.target.name === "bankAccfromDb" && newSate.bankAccfromDb)
            newSate.ownBankAcc = false
        if (newSate.ownBankAcc)
            newSate.bankAccfromDb = false

        setCheckboxstate(newSate)

        let newSummaryData = { ...props.summaryData }

        if (event.target.name === "bankAccfromDb" || event.target.name === "ownBankAcc") {
            if (!newSate.ownBankAcc && !newSate.bankAccfromDb)
                newSummaryData.bankAcc = null;
        } else
            if (!newSate[event.target.name])
                newSummaryData[event.target.name] = null

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

        let newData = { ...props.summaryData }

        switch (name.name) {
            case "paymentStatus":
                newData.statusId = data.value;
                newData.statusIdValue = data.label;
                break;
            case "paymentOption":
                newData.paidWay = data.value;
                newData.paymentOptionIdValue = data.label;
                break
            case "bankAcc":
                newData.bankAcc = data.label;
                break;
        }
        props.setSummaryData(newData);
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
        disabled={!checkoboxState.ownBankAcc} />

    return (
        <Aux>
            <div className="grid-3-invoice-summary">
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
                        checked={checkoboxState.paid}
                        onChange={checkboxChange} />Zapłacono
            <input className="text-x-large-input"
                        type="number"
                        name="paid"
                        value={preventNull(props.summaryData.paid)}
                        onChange={inputChange}
                        disabled={!checkoboxState.paid} />

                </div>
                <div className="margin-all-1">
                    <input type="checkbox"
                        name="paidDay"
                        checked={checkoboxState.paidDay}
                        onChange={checkboxChange}
                    />Data płatności<br />
                    <DatePicker
                        className="text-x-large-input"
                        closeOnScroll={true}
                        selected={preventNull(props.summaryData.paidDay)}
                        disabled={!checkoboxState.paidDay}
                        onChange={date => setPaidDay(date)}
                        dateFormat="dd.MM.yyyy"
                        locale={pl}
                        name="paidDay" />
                </div>
                <div className="margin-all-1">
                    <input type="checkbox"
                        name="paidWay"
                        checked={checkoboxState.paidWay}
                        onChange={checkboxChange} />Sposób płatności
            <Select
                        className="margin-top-1"
                        options={props.invoicePaymentOptions}
                        defaultValue={props.invoicePaymentOptions[props.summaryData.paidWay]}
                        name="paymentOption"
                        onChange={(data, name) => selectChage(data, name)}
                        isDisabled={!checkoboxState.paidWay} />
                </div>
                <div className="margin-all-1">
                    <input type="checkbox"
                        name="paymentDay"
                        checked={checkoboxState.paymentDay}
                        onChange={checkboxChange} />Termin płatności
            <DatePicker
                        className="text-x-large-input"
                        closeOnScroll={true}
                        selected={preventNull(props.summaryData.paymentDay)}
                        onChange={date => setPaymentDay(date)}
                        disabled={!checkoboxState.paymentDay}
                        dateFormat="dd.MM.yyyy"
                        locale={pl} />

                </div>
                <div className="margin-all-1">
                    <input type="checkbox"
                        name="bankAccfromDb"
                        checked={checkoboxState.bankAccfromDb}
                        onChange={checkboxChange} />Numer konta z bazy danych
                    <input type="checkbox"
                        name="ownBankAcc"
                        checked={checkoboxState.ownBankAcc}
                        onChange={checkboxChange} />Własny numer konta<br />
                    {checkoboxState.bankAccfromDb ? bankAccSelect : bankAccInput}
                </div>
            </div>
            <div className="margin-all-1">
                <input type="checkbox"
                    name="comments"
                    checked={checkoboxState.comments}
                    onChange={checkboxChange} />Uawgi <br />
                <textarea
                    className="full-width margin-top-1"
                    value={preventNull(props.summaryData.comments)}
                    onChange={inputChange}
                    name="comments"
                    disabled={!checkoboxState.comments} />
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

export default connect(mapStateToProps)(InvoiceSummary);
