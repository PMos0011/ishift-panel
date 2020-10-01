import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getAllDocuments } from '../../store/documents/documentActions';
import Aux from "../../hoc/auxiliary";

import Document from "./documentDetails";

import './doc-style.css';

const AllDocuments = (props) => {
    useEffect(() => {
        props.onLoad(props.match.params.id);
    }, []);

    let counter = 0;

    const converDate = (date) => {
        return date.toString().slice(4, 6) + "." + date.toString().slice(0, 4)
    }

    const convertAmount = (amount) => {

        let length = amount.toString().length;
        let stringAmount = amount.toString();
        let i = parseInt(length / 3);
        let counter = 0;

        while (i > 0) {
            let point = length - (i * 3) + counter;
            if (point > 0) {
                stringAmount = stringAmount.slice(0, point) + "," + stringAmount.slice(point);
                counter++;
            }
            i--;
        }
        return stringAmount;
    }

    return (
        <div className="doc-grid-4-container">
            <div>Lp</div>
            <div>kwota</div>
            <div>typ dokumentu</div>
            <div>data</div>
            {
                props.docs.map(doc => {
                    counter++;
                    return (
                        <Aux key={doc.id}>
                            <div>{counter}</div>
                            <div>{convertAmount(doc.kwota)} zł</div>
                            <div>nie wiem</div>
                            <div>{converDate(doc.rokMiesiac)}</div>
                            <div className="item-grid-2"><Document details={doc.declarationDetails} /></div>
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