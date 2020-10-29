import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Aux from '../../hoc/auxiliary';

import deleteIcon from '../../images/delete_icon.svg';
import editIcon from '../../images/edit_icon.svg';
import addIcon from "../../images/add_icon.svg";

import { getBankAccountsData, deleteBankAccount } from "../../store/bankAccounts/bankActions";
import {deleteAlert} from "../../store/alerts/alertsActions";

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
                        <div className="doc-item-thin">{converter.accountNumberConverter(acc.accountNumber)}</div>
                        <div className="doc-item-thin">{acc.bankName}</div>
                        <div className="doc-item-thin">{converter.addressConverter(acc)}</div>
                        <div className="doc-item-thin">{acc.zipCode + " " + acc.city}</div>
                        <div className="item-grid-4-full direction-rtl">
                            <img onClick={() =>
                                props.deleteAlert(props.match.params.id, acc.id, "konta", props.deleteAccoount)}
                                className="icon-size pointer-on-hover"
                                src={deleteIcon} alt="delete" />
                            <Link to={"/auth/bankAccounts/edit/" + props.match.params.id + "/" + acc.id}>
                                <img className="icon-size " src={editIcon} alt="edit" />
                            </Link>
                        </div>
                        <hr className="item-grid-4-full" />
                    </Aux>
                );
            })}
            <Link to={"/auth/bankAccounts/edit/" + props.match.params.id + "/0"}>
                <img className="icon-add" src={addIcon} alt="add" />
            </Link>
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
        deleteAccoount: (access, id) => dispatch(deleteBankAccount(access, id)),
        deleteAlert: (access, id, message, action) => dispatch(deleteAlert(access, id, message, action))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);