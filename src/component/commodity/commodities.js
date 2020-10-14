import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Aux from '../../hoc/auxiliary';

import deleteIcon from '../../images/delete_icon.svg';
import editIcon from '../../images/edit_icon.svg';
import addIcon from "../../images/add_icon.svg";

import { getCommoditiesData, deleteCommodity } from "../../store/commodity/commodityActions";
import {priceConverter, percentConverter} from "./converters";
import deleteAction from "../deleteConfirmation";

const Customer = (props) => {
    useEffect(() => {
        props.onLoad(props.match.params.id);
    }, []);

    return (
        <div className="doc-grid-4-container-commomdity width-80-white app-border-shadow">
            {props.commodities.map(comm => {
                return (
                    <Aux key={comm.id}>
                        <div className="doc-item-thin">towar/ usługa:</div>
                        <div className="doc-item-thin">{comm.name}</div>
                        <div className="doc-item-thin">miara:</div>
                        <div className="doc-item-thin">{comm.measure}</div>
                        <div className="doc-item-thin">cena netto:</div>
                        <div className="doc-item-thin">{priceConverter(comm.price)}</div>
                        <div className="doc-item-thin">stawka VAT:</div>
                        <div className="doc-item-thin">{percentConverter(comm.vatAmount)}</div>
                        <div className="item-grid-4-full direction-rtl">
                            <img onClick={() =>
                                deleteAction(props.match.params.id, comm.id, "towar", props.deleteCommodity)}
                                className="icon-size pointer-on-hover"
                                src={deleteIcon} alt="delete" />
                            <Link to={"/auth/commodity/edit/" + props.match.params.id + "/" + comm.id}>
                                <img className="icon-size " src={editIcon} alt="edit" />
                            </Link>
                        </div>
                        <hr className="item-grid-4-full" />
                    </Aux>
                );
            })}
            <Link to={"/auth/commodity/edit/" + props.match.params.id + "/0"}>
                <img className="icon-add" src={addIcon} alt="add" />
            </Link>
        </div>)
}

const mapStateToProps = (state) => {
    return {
        commodities: state.commodityReducer.commodities,
        dataAccess: state.authReducer.dataAccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => dispatch(getCommoditiesData(id)),
        deleteCommodity: (access, id) => dispatch(deleteCommodity(access, id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);