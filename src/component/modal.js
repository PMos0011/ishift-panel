import React from "react";
import { connect } from "react-redux";

import { clearMessage } from "../store/alerts/alertsActions";

const Modal = (props) => {

    let showModal = false;
    if (props.spinner || props.isErrorAlert || props.isSuccessAlert)
        showModal = true
    else
        showModal = false


    const spinner =
        <div className="modal app-border-shadow">
            <div id="fountainG">
                <div id="fountainG_1" className="fountainG"></div>
                <div id="fountainG_2" className="fountainG"></div>
                <div id="fountainG_3" className="fountainG"></div>
                <div id="fountainG_4" className="fountainG"></div>
                <div id="fountainG_5" className="fountainG"></div>
                <div id="fountainG_6" className="fountainG"></div>
                <div id="fountainG_7" className="fountainG"></div>
                <div id="fountainG_8" className="fountainG"></div>
            </div></div>

    const ErrorAlert = <div className="modal app-border-shadow clickable" onClick={()=>props.clearMessage()}>
        <h1>ERROR</h1>
        {props.message}
    </div>

    const SuccessAlert = <div className="modal app-border-shadow clickable" onClick={()=>props.clearMessage()}>
        <h1>Success</h1>
        {props.message}
    </div>

    return (
        <div className="modal-transition" style={{
            opacity: showModal ? '1' : '0',
            visibility: showModal ? "visible" : "hidden"
        }}>
            <div className="modal-background" />

            {props.spinner ? spinner : null}
            {props.isErrorAlert? ErrorAlert: null}
             {props.isSuccessAlert? SuccessAlert: null}

        </div>
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