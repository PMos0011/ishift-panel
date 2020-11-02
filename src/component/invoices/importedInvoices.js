import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/auxiliary";
import DatePicker from "../documents/datePicker";

import { convertAmount } from "../documents/documentConverters";
import * as converters from "./invoicesConverters";
import { getImportedInvoices } from "../../store/invoice/invoiceAction";

const ImpoerdetInvoice = (props) => {
    useEffect(() => {
        props.getImportedInvoices(props.match.params.id, converters.getFirstDayOfMonth(new Date()), converters.getLastDayOfMonth(new Date()));
    }, []);

    const [beginDate, setBeginDate] = useState(converters.getFirstDayOfMonth(new Date()));
    const [endDate, setEndDate] = useState(converters.getLastDayOfMonth(new Date()));

    const setFirstDayOfMonth = (date) => {
        setBeginDate(converters.getFirstDayOfMonth(date));
    }

    const setLasDayOfmonth = (date) => {
        setEndDate(converters.getLastDayOfMonth(date));
    }

    const onButtonClick = () => {
        props.getImportedInvoices(props.match.params.id, beginDate, endDate);
    }

    const noInvoices = <h2>Brak faktur w wybranym okresie</h2>

    const showInvoices = () => {
        let counter = 0;
        return (
            <div className="grid-6-container-invoice">
                <div className="doc-detail-header-item">Lp</div>
                <div className="doc-detail-header-item">Brutto</div>
                <div className="doc-detail-header-item">VAT</div>
                <div className="doc-detail-header-item">Numer</div>
                <div className="doc-detail-header-item">Nabywca</div>
                <div className="doc-detail-header-item">Data</div>

                {props.importedInvoices.map(invoice => {
                    counter++;
                    return (
                        <Aux key={invoice.id}>
                            <div className="doc-det">{counter}</div>
                            <div className="doc-det">{convertAmount(invoice.brutto)}</div>
                            <div className="doc-det">{convertAmount(invoice.vat)}</div>
                            <div className="doc-det">{invoice.docName}</div>
                            <div className="doc-det">{converters.createName(invoice)}</div>
                            <div className="doc-det">{converters.createDate(invoice.issueDate)}</div>
                        </Aux>
                    )
                })}
            </div>)
    }

    return (
        <div className="width-80-white app-border-shadow">
            <div className="doc-grid-5-container-auto">
                <DatePicker
                    startDate={beginDate}
                    endDate={endDate}
                    setStartDate={setFirstDayOfMonth}
                    setEndDate={setLasDayOfmonth}
                />
            </div>
            <input style={{
                marginTop: '2vh',
                marginBottom: '2vh',
                width: '20%'
            }}
                type="submit" value="Pobierz" onClick={onButtonClick} />

            {props.importedInvoices.length > 0 ? showInvoices() : noInvoices}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        importedInvoices: state.invoiceReducer.importedInvoices
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getImportedInvoices: (id, beginDate, endDate) => dispatch(getImportedInvoices(id, beginDate, endDate))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImpoerdetInvoice);