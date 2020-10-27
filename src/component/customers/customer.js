import React, { useEffect } from "react";
import { connect } from "react-redux";
import Aux from '../../hoc/auxiliary';

import * as customerActions from '../../store/customers/customersActions';
import { getMeasures } from "../../store/commodity/commodityActions";
import { getInvoiceTypes, getVatTypes } from "../../store/invoice/invoiceAction";

const Customer = (props) => {
    useEffect(() => {
        props.onLoad(props.match.params.id);
            props.getMeasures(props.match.params.id);
            props.getInvoiceTypes(props.match.params.id);
            props.getVatTypes(props.match.params.id);
        
    }, []);

    return (
        <Aux>
            <div className="doc-grid-2-auto-container width-80-white app-border-shadow">
            {props.customer.companyData.map(det => {
                return (
                    <Aux key={det.id}>
                        <div className="doc-det">{det.dataDescription}</div>
                        <div className="doc-det">{det.companyData}</div>
                    </Aux>
                )
            })
            }</div>
        </Aux>)
}

const mapStateToProps = (state) => {
    return {
        customer: state.customersReducer.customer,
        dataAccess:state.authReducer.dataAccess
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => dispatch(customerActions.getCustomerData(id)),
        getMeasures: (id) => dispatch(getMeasures(id)),
        getInvoiceTypes: (id) => dispatch(getInvoiceTypes(id)),
        getVatTypes: (id) => dispatch(getVatTypes(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);