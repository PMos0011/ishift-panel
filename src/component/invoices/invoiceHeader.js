import React from "react";
import { connect } from "react-redux";

import Select from "react-select";
import DatePicker from "react-datepicker";

import {invoiceNumberBuilder} from "./invoiceDataBuilder";

import { pl } from "date-fns/locale";


const InvoiceHeader = (props) => {

    const setDocType = (data) =>{
        let newHeaderData = {...props.headerData};

        newHeaderData.invoiceTypeId = data.value;
        newHeaderData.invoiceTypeName = data.label;
        newHeaderData.invoiceNumber = invoiceNumberBuilder(props.invoiceType,data.value)

        props.setHeaderData(newHeaderData);
    }

    const onChangeHandler = (event) =>{
        let newHeaderData = {...props.headerData};
        newHeaderData[event.target.name]=event.target.value;

        props.setHeaderData(newHeaderData);
    }

    const setIssueDate = (date) =>{
        let newHeaderData = {...props.headerData};
        newHeaderData.issueDate=date;

        props.setHeaderData(newHeaderData);
    }

    const setSellDate = (date) =>{
        let newHeaderData = {...props.headerData};
        newHeaderData.sellDate=date;

        props.setHeaderData(newHeaderData);
    }

    return (
            <div className="doc-grid-3-container-auto">
                <div className="margin-all-1">   
                        <div>dokument</div>
                        <Select
                            className="margin-top-1"
                            placeholder="Wybierz"
                            defaultValue={props.selectOptions[0]}
                            options={props.selectOptions}
                            onChange={setDocType} />
                </div>
                <div className="margin-all-1">
                        <div>numer</div>
                        <input className="text-x-large-input"
                            type="text"
                            name="invoiceNumber"
                            value={props.headerData.invoiceNumber}                    
                            onChange={(event)=>onChangeHandler(event)} />
                </div>
                <div>
                </div>
                <div className="margin-all-1">
                    <div>miejsce sprzedaży</div>
                    <input className="text-x-large-input"
                    type="text"
                    name="placeOfIssue"
                    value={props.headerData.placeOfIssue}                      
                    onChange={event=>onChangeHandler(event)} />
                </div>
                <div className="margin-all-1">
                        <div>data wystawienia</div>
                        <DatePicker
                            className="text-x-large-input"
                            closeOnScroll={true}
                            selected={props.headerData.issueDate}
                            onChange={date => setIssueDate(date)}
                            dateFormat="dd.MM.yyyy"
                            locale={pl}
                        />     
                </div>
                <div className="margin-all-1">
                        <div>data sprzedaży</div>
                        <DatePicker
                            className="text-x-large-input"
                            closeOnScroll={true}
                            selected={props.headerData.sellDate}
                            onChange={date => setSellDate(date)}
                            dateFormat="dd.MM.yyyy"
                            locale={pl}
                        />
                </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectOptions: state.invoiceReducer.invoiceSelectOptions,
        invoiceType: state.invoiceReducer.invoiceType,
    };
};

export default connect(mapStateToProps)(InvoiceHeader);
