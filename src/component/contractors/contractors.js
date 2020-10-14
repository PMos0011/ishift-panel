import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Aux from '../../hoc/auxiliary';

import Contractor from './contractor';

import addIcon from "../../images/add_icon.svg";

import { getContractors } from "../../store/contractors/contractorsActions";

const Contractors = (props) => {
    useEffect(() => {
        props.onLoad(props.match.params.id);
    }, []);

    return (
        <div className="doc-grid-2-auto-container width-80-white app-border-shadow">
            {props.contractors.map(contractor => {
                return (
                    <Aux key={contractor.id}>
                        <div className="doc-item-thin">{contractor.name}</div>
                        <div className="doc-item-thin"><a href={"tel:" + contractor.phoneNumber}>
                            {"tel. " + contractor.phoneNumber}</a>
                        </div>
                        <div className="item-grid-2-full">
                            <Contractor contractor={contractor} />
                        </div>
                        <hr className="item-grid-2-full" />
                    </Aux>
                );
            })}
            <Link to={"/auth/contractors/edit/" + props.match.params.id + "/0"}>
                <img className="icon-add" src={addIcon} alt="delete" />
            </Link>
        </div>)
};

const mapStateToProps = (state) => {
    return {
        contractors: state.contractorsReducer.contractors,
        dataAccess: state.authReducer.dataAccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => dispatch(getContractors(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contractors);