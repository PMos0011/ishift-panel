import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Aux from "../../hoc/auxiliary";
import { pl } from "date-fns/locale";
import { formatISO } from 'date-fns'

import DatePicker from "react-datepicker";
import Select from "react-select";

import { getExchangeRate } from "../../store/currency/currencyAction";

const Currency = (props) => {

    const [NBPExchangeRate, setNBPExchangeRate] = useState({});

    useEffect(() => {
        try {
            let newCurrencyData = { ...props.currencyData };
            newCurrencyData.exchangeRate = NBPExchangeRate.rates[0].mid;
            newCurrencyData.exchangeBasis = NBPExchangeRate.rates[0].no;
            props.setCurrencyData(newCurrencyData)
        } catch (e) { }

    }, [NBPExchangeRate])


    let enableCurrencyExchangeBoolean = false;
    let enableNBPExchangeBoolean = true;

        if (props.currencyData.exchangeRate) {
            enableCurrencyExchangeBoolean = true;
            if (props.currencyData.exchangeBasis === "własny kurs")
                enableNBPExchangeBoolean = false;
        }

    let [currencyExchangeProps, setCurrencyExchangeProps] = useState(
        {
            enableCurrencyExchange: enableCurrencyExchangeBoolean,
            enableNBPExchange: enableNBPExchangeBoolean
        }
    );


    const setCurrency = (data) => {
        let newCurrencyData = { ...props.currencyData };
        newCurrencyData.currentCurrency = data.code;
        props.setCurrencyData(newCurrencyData);
    }

    const setExchangeDay = (date) => {
        let newCurrencyData = { ...props.currencyData };
        newCurrencyData.exchangeDate = date;
        props.setCurrencyData(newCurrencyData);
    }

    const checkboxChange = (event) => {
        let newCurrencyExchangeProps = { ...currencyExchangeProps };
        newCurrencyExchangeProps[event.target.name] = !currencyExchangeProps[event.target.name];
        setCurrencyExchangeProps(newCurrencyExchangeProps);
    }

    const enableCurrencyExchangeChange = (event) => {
        if (!currencyExchangeProps.enableCurrencyExchange) {
            let yesterday = new Date(props.headerData.sellDate);
            yesterday.setDate(yesterday.getDate() - 1)
            setExchangeDay(yesterday);
        }
        else {
            setExchangeDay(null);

            let newCurrencyData = { ...props.currencyData };
            newCurrencyData.exchangeDate = null;
            newCurrencyData.exchangeRate = null;
            newCurrencyData.exchangeBasis = null;

            props.setCurrencyData(newCurrencyData);

            setNBPExchangeRate({});
        }

        checkboxChange(event);
    }

    const enableNBPExchangeChange = (event) => {
        let newCurrencyData = { ...props.currencyData };
        if (currencyExchangeProps.enableNBPExchange) {
            newCurrencyData.exchangeBasis = "własny kurs";
            setNBPExchangeRate({});
        }
        else {
            newCurrencyData.exchangeRate = null;
            newCurrencyData.exchangeBasis = null;
        }

        props.setCurrencyData(newCurrencyData);


        checkboxChange(event);
    }

    const getExchange = () => {
        const date = formatISO(props.currencyData.exchangeDate, { representation: 'date' });
        const code = props.currencyData.currentCurrency;

        props.getExchangeRate(code, date, setNBPExchangeRate);

    }

    const ownExhcangeRateChange = (event) => {
        let newCurrencyData = { ...props.currencyData };
        newCurrencyData.exchangeRate = event.target.value;
        props.setCurrencyData(newCurrencyData)
    }

    const preventNull = (number) => {
        return number ? number : ""
    }

    const NBPTable = () => {
        try {
            return (
                <Aux>
                    <div> <div>tabela: </div>
                        <input type="text" value={props.currencyData.exchangeBasis} readOnly /></div>
                    <div><div>kurs:</div>
                        <input type="text" value={props.currencyData.exchangeRate} readOnly /></div>
                </Aux>)
        } catch (e) { };
    }

    const changeCurrencyMessage = <h3>Wybierz walute inną niż PLN</h3>;

    const exchangeDatePicker =
        <DatePicker
            className="text-x-large-input margin-all-1"
            closeOnScroll={true}
            selected={props.currencyData.exchangeDate}
            onChange={date => setExchangeDay(date)}
            dateFormat="dd.MM.yyyy"
            locale={pl}
        />


    const customExchangeForm =
        <div className="doc-grid-2-50-container">
            <div className="margin-all-1">własny kurs z dnia:
            {exchangeDatePicker}</div>
            <div className="margin-all-1">własny kurs:
            <input
                    type="number"
                    name="exchangeRateInput"
                    className="text-x-large-input margin-all-1"
                    value={preventNull(props.currencyData.exchangeRate)}
                    onChange={ownExhcangeRateChange} />
            </div>
        </div>;

    const autoExchangeForm =
        <div className="doc-grid-5-container-currency">
            <div className="flex-center">
                pobierz kurs z dnia:
            </div>
            {exchangeDatePicker}
            <input className="margin-all-1" style={{ width: "auto" }} type="submit" value="Pobierz" onClick={getExchange} />
            {NBPTable()}
        </div>;

    const exchangeForm =
        <Aux>
            <input type="checkbox"
                name="enableNBPExchange"
                checked={currencyExchangeProps.enableNBPExchange}
                onChange={enableNBPExchangeChange} />
            Średni kurs NBP
          {currencyExchangeProps.enableNBPExchange ? autoExchangeForm : customExchangeForm}
        </Aux>;

    const currencyExchangeForm =
        props.currencyData.currentCurrency === "PLN" ? changeCurrencyMessage : exchangeForm


    return (
        <Aux>
            <div className="doc-grid-3-container-currency"><div className="flex-center">Waluta:</div>
                <Select
                    className="margin-top-1"
                    placeholder="Wybierz"
                    value={props.avaibleCurrency.find(currency => currency.code === props.currencyData.currentCurrency)}
                    options={props.avaibleCurrency}
                    onChange={setCurrency}
                />
                <div className="flex-center">
                    <input
                        type="checkbox"
                        name="enableCurrencyExchange"
                        checked={currencyExchangeProps.enableCurrencyExchange}
                        onChange={enableCurrencyExchangeChange} />
                 Przelicz na PLN</div>
            </div>
            <br />
            {currencyExchangeProps.enableCurrencyExchange ? currencyExchangeForm : null}
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        avaibleCurrency: state.currencyReducer.avaibleCurrency
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getExchangeRate: (code, date, action) => dispatch(getExchangeRate(code, date, action)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Currency);
