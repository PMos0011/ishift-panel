import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Aux from "../../hoc/auxiliary";
import { withAlert } from 'react-alert'

import { getBankAccountsData } from "../../store/settings/settingsActions";
import form from "../settings/myDataEditBaseBuild";

const MyBankAccounts = (props) => {

    useEffect(() => {
        props.onLoad(props.match.params.id);
    }, []);

    console.log(props.myAccounts);

    return (
        <Aux>
            <div>accounts</div>
        </Aux>
    )
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorReducer.errorMessage,
        isErrorAlert: state.errorReducer.errorAlert,
        myAccounts: state.bankReducer,
        dataAccess:state.authReducer.dataAccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => dispatch(getBankAccountsData(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(MyBankAccounts));