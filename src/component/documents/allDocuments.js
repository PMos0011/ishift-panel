import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getAllDocuments } from '../../store/documents/documentActions';
import Aux from "../../hoc/auxiliary";

import Document from "./documentDetails";

import '../../style/doc-style.css';

const AllDocuments = (props) => {
    useEffect(() => {
        props.onLoad(props.match.params.id);
    }, []);

    let counter = 0;

    const converDate = (date) => {
        return date.toString().slice(4, 6) + "." + date.toString().slice(0, 4)
    }

    const convertAmount = (amount) => {


        let stringAmount = amount.toString();
        let minus = "";

        if (amount < 0) {
            stringAmount = stringAmount.slice(1);
            minus = "- ";
        }
        let length = stringAmount.length;
        let i = parseInt(length / 3);
        let counter = 0;

        while (i > 0) {
            let point = length - (i * 3) + counter;
            if (point > 0) {
                stringAmount = stringAmount.slice(0, point) + " " + stringAmount.slice(point);
                counter++;
            }
            i--;
        }
        return minus + stringAmount;
    }

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
                            <div className="doc-item">{convertAmount(doc.kwota)} zł</div>
                            <div className="doc-item">nie wiem</div>
                            <div className="doc-item">{converDate(doc.rokMiesiac)}</div>
                            <div className="item-grid-2 doc-margin-right"><Document details={doc.declarationDetails} /></div>
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