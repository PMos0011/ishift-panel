import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/auxiliary";
import Select from 'react-select';
import Document from "./documentDetails";
import Picker from "./datePicker";

import { getAllDocuments } from '../../store/documents/documentActions';
import * as converters from "./documentConverters";
import supportedDocuments from "./supportedDocuments";
import { documentFilter } from './filters';


const AllDocuments = (props) => {
    useEffect(() => {
        props.onLoad(props.match.params.id);
    }, []);

    useEffect(() => {
        setSelectorOptions(props.options);
    }, [props.options]);

    var dateYearBeforeToday = new Date();
    dateYearBeforeToday.setMonth(dateYearBeforeToday.getMonth()- 12);

    const [startDate, setStartDate] = useState(dateYearBeforeToday);
    const [endDate, setEndDate] = useState(new Date());
    const [selectedValue, setSelectedValue] = useState(null);

    const setSelectorOptions = (data) => {
        if (data == null || data.length === 0)
            data = props.options;
        setSelectedValue(data);
    }

    let counter = 0;
    const document = (doc) => {
        let jpk = "";
        if(doc.version===21)
        jpk = " (JPK)";
        counter++;
        return (
            <Aux key={doc.id}>
                <div className="doc-item">{counter}</div>
                <div className="doc-item">{converters.convertAmount(doc.kwota)}</div>
                <div className="doc-item">{supportedDocuments.get(doc.typDeklaracji)+ jpk}</div>
                <div className="doc-item">{converters.displayDate(doc.rokMiesiac)}</div>
                <div className="item-grid-2 doc-margin-right"><Document
                    dbId={props.match.params.id}
                    docId={doc.id}
                    details={doc.declarationDetails} /></div>
                <hr className="item-grid-4-full" />
            </Aux>
        )
    }

    return (
        <Aux>
            <hr className="doc-hr" />
            <h3>Pokaż dokumenty:</h3>
            <div className="filter-container">
                <div className="doc-grid-5-container-auto">
                    <Picker
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    /></div>
                <Select
                    placeholder="Wszystkie"
                    options={props.options}
                    isMulti
                    onChange={setSelectorOptions} />
            </div>
            <div className="doc-grid-4-container app-border-shadow">
                <div className="table-header-item table-header-item-top-left">Lp</div>
                <div className="table-header-item">kwota</div>
                <div className="table-header-item">typ deklaracji</div>
                <div className="table-header-item table-header-item-top-right">data</div>
                {
                    props.docs.map(doc => {
                        return documentFilter(startDate, endDate, doc.rokMiesiac, selectedValue, doc.typDeklaracji) ?
                            document(doc) : null
                    })
                }</div></Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        docs: state.documentReducer.documents,
        options: state.documentReducer.options
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => dispatch(getAllDocuments(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDocuments);