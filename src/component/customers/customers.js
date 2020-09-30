import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as customerActions from '../../store/customers/customersActions';

import './customers-style.css';



const Customers = (props) => {
    useEffect(() => {
        props.onLoad();
    }, []);
    let counter = 0;

    console.log(props.customers);

    return (
        <table className="app-border-shadow">
            <tbody>
                <tr>
                    <th className="th-left">Lp</th>
                    <th className="th-right">nazwa</th>
                </tr>
                {props.customers.map((customer) => {
                    counter++;
                    return (<tr key={customer.id}>
                        <td>{counter}</td>
                        <td>
                            <Link
                                to={'/auth/documents/' + customer.id}>
                                {customer.companyName}
                            </Link>
                        </td>
                    </tr>)
                })}
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => {
    return {
        customers: state.customerReducer.customersList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: () => dispatch(customerActions.getAllCustomers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);