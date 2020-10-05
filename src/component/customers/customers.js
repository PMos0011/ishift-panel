import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Aux from "../../hoc/auxiliary";

import * as customerActions from '../../store/customers/customersActions';

import '../../style/link-style.css';
import '../../style/doc-style.css';



const Customers = (props) => {
    useEffect(() => {
        props.onLoad(props.match.params.id);
    }, []);
    let counter = 0;

    return (
        <div className="doc-grid-2-container doc-container app-border-shadow">

            <div className="table-header-item table-header-item-top-left">Lp</div>
            <div className="table-header-item table-header-item-top-right">nazwa</div>

            {props.customers.map((customer) => {
                counter++;
                return (
                    <Aux key={customer.id}>
                        <Link
                            className="doc-grid-2-container link-item item-grid-2-full"
                            to={'/auth/documents/' + customer.id}>
                            <div>{counter}</div>
                            <div>{customer.companyName} </div>

                        </Link><hr className="item-grid-2-full" /></Aux>
                )
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        customers: state.customerReducer.customersList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => dispatch(customerActions.getAllCustomers(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);