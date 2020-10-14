import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Aux from '../../hoc/auxiliary';

import deleteIcon from '../../images/delete_icon.svg';
import editIcon from '../../images/edit_icon.svg';
import infoIcon from "../../images/info_icon.svg";

import { deleteContractor } from "../../store/contractors/contractorsActions";
import deleteAction from "../deleteConfirmation";

const Contractor = (props) => {
    const [isHide, setState] = useState(true)

    const toggle = () => {
        const newState = !isHide;
        setState(newState);
    }

    const contractor = props.contractor;

    let localNumber = ""
    if (contractor.localNumber !== "")
        localNumber = "/" + contractor.localNumber

    const address = contractor.zipCode + " " + contractor.city + " " + contractor.street + " " + contractor.streetNumber + localNumber;

    const details = () => {
        return (
            <Aux>
                <div>NIP</div>
                <div>{contractor.nip}</div>
                <div>REGON</div>
                <div>{contractor.regon}</div>
                <div>Adres</div>
                <div>{address}</div>
                <div>e-mail</div>
                <div><a href={"mailto:" + contractor.email}>
                    {contractor.email}</a>
                </div>
            </Aux>
        )
    }

    const showToggle =
        <div className="item-grid-2-full direction-rtl">
            <img onClick={() =>
                deleteAction(props.dataAccess, contractor.id, "kontrahenta", props.deleteContractor)}
                className="icon-size pointer-on-hover"
                src={deleteIcon} alt="delete" />
            <Link to={"/auth/contractors/edit/" + props.dataAccess + "/" + contractor.id}>
                <img className="icon-size " src={editIcon} alt="delete" />
            </Link>
            <img onClick={toggle} className="icon-size pointer-on-hover" src={infoIcon} alt="info" />

        </div>


    return (
        <div className="doc-grid-2-auto-container">
            {isHide ? null : details()}
            {showToggle}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dataAccess: state.authReducer.dataAccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteContractor: (access, id) => dispatch(deleteContractor(access, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contractor);