import React from "react";
import { connect } from "react-redux";
import Aux from "../hoc/auxiliary";

import { clearMessage, deleteAlert } from "../store/alerts/alertsActions";

const Modal = (props) => {

    let showModal = false;
    if (props.spinner || props.isErrorAlert || props.isSuccessAlert || props.action !== "")
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

    const onDeleteClick = () => {
        props.action(props.access, props.id);
        props.deleteAlert("", "", "", "");
    }

    const onCancelClick = () => {
        props.deleteAlert("", "", "", "")
    }

    const spinner =
        <Aux>
            <div className="lds-ellipsis"><div /><div /><div /><div /></div>
        </Aux>

    const deleteConfirmation = <Aux>
        <h2>Usunięcie danych {props.message}</h2>
        <h4>Czy na pewno usunąć dane {props.message}?</h4>
        <h6>(cofnięcie operacji nie będzie możliwe)</h6>
        <button className="modal-button" onClick={onDeleteClick}>Oczywiście, usuwam</button>
        <button className="modal-button" onClick={onCancelClick}>Jeszcze się zastanowie</button>
    </Aux>

    return (
        <div className="modal-transition" style={{
            opacity: showModal ? '1' : '0',
            visibility: showModal ? "visible" : "hidden",
            transitionDelay: props.spinner? "0.5s":"0s"
        }}
        >

            <div className="modal-background"> </div>
            <div className={modalStyle.join(" ")} onClick={() => clearMessage()}>
                {props.spinner ? spinner : null}
                {props.isErrorAlert ? props.message : null}
                {props.isSuccessAlert ? props.message : null}
                {props.action !== "" ? deleteConfirmation : null}
            </div>
        </div >
    )

}

const mapStateToProps = (state) => {
    return {
        message: state.alertsReducer.message,
        isErrorAlert: state.alertsReducer.errorAlert,
        isSuccessAlert: state.alertsReducer.successAlert,
        spinner: state.alertsReducer.spinner,
        action: state.alertsReducer.action,
        id: state.alertsReducer.id,
        access: state.alertsReducer.access
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearMessage: () => dispatch(clearMessage()),
        deleteAlert: (access, id, message, action) => dispatch(deleteAlert(access, id, message, action))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);