import React from "react";
import { connect } from "react-redux";
import Aux from "../hoc/auxiliary";

import { clearMessage } from "../store/alerts/alertsActions";

const Modal = (props) => {

    let showModal = false;
    if (props.spinner || props.isErrorAlert || props.isSuccessAlert)
        showModal = true
    else
        showModal = false

    let modalStyle = ["modal-transition", "modal"];

    if (props.isErrorAlert)
        modalStyle.push("shadow-red", "clickable");
    else if (props.isSuccessAlert)
        modalStyle.push("shadow-green", "clickable");
    else
        modalStyle.push("shadow-gray");

    const clearMessage = () => {
        if (props.isErrorAlert || props.isSuccessAlert);
        props.clearMessage()
    }

    const spinner =
        <Aux>
            <div className="lds-ellipsis"><div /><div /><div /><div /></div>
        </Aux>

    return (
        <div className="modal-transition" style={{
            opacity: showModal ? '1' : '0',
            visibility: showModal ? "visible" : "hidden"
        }}>

            <div className="modal-background"> </div>
            <div className={modalStyle.join(" ")} onClick={() => clearMessage()}>
                {props.spinner ? spinner : null}
                {props.isErrorAlert ? props.message : null}
                {props.isSuccessAlert ? props.message : null}
            </div>
        </div >
    )

}

const mapStateToProps = (state) => {
    return {
        message: state.alertsReducer.message,
        isErrorAlert: state.alertsReducer.errorAlert,
        isSuccessAlert: state.alertsReducer.successAlert,
        spinner: state.alertsReducer.spinner
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearMessage: () => dispatch(clearMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);