import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Sidebar = (props) =>{


    const customersSidebarLink = () =>{
        return (<Link to='/auth/customers'>Klienci</Link>)
    };

    const myDataSidebarLink = () => {
        return (<Link to='/auth/customers'>Klienci</Link>)
    }

    const documentsSidebaruLink = () =>{
        const documentsLink = '/auth/documents/' + props.companyId;
        return(<Link to={documentsLink}>Dokumenty</Link>)
    };

    return (
        <div className="sidebar-container app-border-shadow">
            {props.isAdmin?customersSidebarLink(): myDataSidebarLink()}
            <br/>
            {props.companyId!==""?documentsSidebaruLink():null}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        companyId: state.customerReducer.customer.companyId,
        isAdmin: state.authReducer.isAdmin
    };
};

export default connect(mapStateToProps) (Sidebar);