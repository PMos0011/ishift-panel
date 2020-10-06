import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getAllDocuments } from '../../store/documents/documentActions';
import Aux from "../../hoc/auxiliary";
import * as filters from "./documentTypeFilter";

import Document from "./documentDetails";


const AllDocuments = (props) => {
    useEffect(() => {
        props.onLoad(props.match.params.id);
    }, []);

    
    let counter = 0;
    return (
        <div className="doc-grid-4-container app-border-shadow">
            <div className="table-header-item table-header-item-top-left">Lp</div>
            <div className="table-header-item">kwota</div>
            <div className="table-header-item">typ dokumentu</div>
            <div className="table-header-item table-header-item-top-right">data</div>
            {
                props.docs.map(doc => {
                    counter++;
                    return (
                        <Aux key={doc.id}>
                            <div className="doc-item">{counter}</div>
                            <div className="doc-item">{filters.convertAmount(doc.kwota)} zł</div>
                            <div className="doc-item">{filters.translateDocumentType(doc.typDeklaracji)}</div>
                            <div className="doc-item">{filters.converDate(doc.rokMiesiac)}</div>
                            <div className="item-grid-2 doc-margin-right"><Document
                                dbId={props.match.params.id}
                                docId={doc.id}
                                details={doc.declarationDetails} /></div>
                            <hr className="item-grid-4-full" />
                        </Aux>
                    )
                })
            }</div>
    )
}

const mapStateToProps = (state) => {
    return {
        docs: state.documentReducer.documents
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => dispatch(getAllDocuments(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDocuments);