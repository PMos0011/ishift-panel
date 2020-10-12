import React, { useEffect } from "react";
import { connect } from "react-redux";
import Aux from '../../hoc/auxiliary';
import deleteIcon from '../../images/delete_icon.svg';
import editIcon from '../../images/edit_icon.svg';
import addIcon from "../../images/add_icon.svg";

import { getBankAccountsData } from "../../store/bankAccounts/bankActions";

import * as converter from './converters';

const Customer = (props) => {
    useEffect(() => {
        props.onLoad(props.match.params.id);
    }, []);

    return (
        <div className="doc-grid-4-container-auto width-80-white app-border-shadow">
            {props.myAccounts.map(acc => {
                return (
                    <Aux key={acc.id}>
                        <div className="doc-det">{converter.accountNumberConverter(acc.accountNumber)}</div>
                        <div className="doc-det">{acc.bankName}</div>
                        <div className="doc-det">{converter.addressConverter(acc)}</div>
                        <div className="doc-det">{acc.zipCode + " " + acc.city}</div>
                        <div className="item-grid-4-full direction-rtl">
                            <img className="icon-size" src={deleteIcon} alt="delete" />
                            <img className="icon-size " src={editIcon} alt="delete" />
                        </div>
                    </Aux>
                );
            })}
            <img className="icon-add" src={addIcon} alt="delete" />
        </div>)
}

const mapStateToProps = (state) => {
    return {
        myAccounts: state.bankReducer.bankAccounts,
        dataAccess: state.authReducer.dataAccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => dispatch(getBankAccountsData(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);