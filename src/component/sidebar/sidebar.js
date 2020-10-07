import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Sidebar = (props) =>{


    const customersSidebarLink = () =>{
        return (<Link to='/auth/customers'>Klienci</Link>)
    };

    const myDataSidebarLink = () => {
        const myLink = '/auth/customer/' + props.dataAccess;
        return (<Link to={myLink}>Moje dane</Link>)
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
            <br/>
            <Link to="/auth/settings/pass">Ustawienia</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        companyId: state.customersReducer.customer.companyId,
        isAdmin: state.authReducer.isAdmin,
        dataAccess: state.authReducer.dataAccess,
    };
};

export default connect(mapStateToProps) (Sidebar);