import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Aux from "../../hoc/auxiliary";
import DatePicker from "../documents/datePicker";

import { convertAmount } from "../documents/documentConverters";
import * as converters from "./invoicesConverters";

import { getInvoices, invoicePreviewFromDataBase } from "../../store/invoice/invoiceAction";

import downloadIcon from "../../images/download_icon.svg";
import editIcon from "../../images/edit_icon.svg";

const Invoice = (props) => {
    useEffect(() => {
        props.getInvoices(props.match.params.id, converters.getFirstDayOfMonth(new Date()), converters.getLastDayOfMonth(new Date()));
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
        props.getInvoices(props.match.params.id, beginDate, endDate);
    }

    const noInvoices = <h2>Brak faktur w wybranym okresie</h2>

    const showInvoices = () => {
        let counter = 0;
        try {
            return (
                <div className="grid-6-container-invoice">
                    <div className="doc-detail-header-item">Lp</div>
                    <div className="doc-detail-header-item">Brutto</div>
                    <div className="doc-detail-header-item">VAT</div>
                    <div className="doc-detail-header-item">Numer</div>
                    <div className="doc-detail-header-item">Nabywca</div>
                    <div className="doc-detail-header-item">Data</div>

                    {
                        props.invoices.map(invoice => {
                            const buyer = invoice.partiesData.find(data => data.partyId === 1)
                            counter++;
                            return (
                                <Aux key={invoice.id}>
                                    <div className="doc-item-thin">{counter}</div>
                                    <div className="doc-item-thin">{convertAmount(invoice.summaryData.bruttoAmount)}</div>
                                    <div className="doc-item-thin">{convertAmount(invoice.summaryData.vatAmount)}</div>
                                    <div className="doc-item-thin">{invoice.invoiceNumber}</div>
                                    <div className="doc-item-thin">{buyer.name}</div>
                                    <div className="doc-item-thint">{converters.createDate(invoice.issueDate)}</div>
                                    <div className="item-grid-6-full direction-rtl">
                                    <Link to={"/auth/invoice/edit/" + props.match.params.id + "/" + invoice.id}>
                                        <img className="icon-size " src={editIcon} alt="edit" />
                                    </Link>
                                    <img onClick={() =>
                                        props.invoicePreview(props.match.params.id, invoice.id)}
                                        className="icon-size pointer-on-hover"
                                        src={downloadIcon} alt="preview" />
                                        </div>
                                        <hr className="hr-margin item-grid-6-full" />
                                </Aux>
                            )
                        })}
                </div>)
        }
        catch (error) {
            return null
        }
    }

    return (
        <Aux>
            <h3>Faktury</h3>
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

                {props.invoices.length > 0 ? showInvoices() : noInvoices}

            </div>
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        invoices: state.invoiceReducer.invoices
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getInvoices: (id, beginDate, endDate) => dispatch(getInvoices(id, beginDate, endDate)),
        invoicePreview: (dbId, id) => dispatch(invoicePreviewFromDataBase(dbId, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);