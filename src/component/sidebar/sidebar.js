import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import links from "./sidebarLinkBuilder";

const Sidebar = (props) => {

    return (
        <div className="sidebar-container app-border-shadow">
            {links(props).map(elem => {
                return (
                    <Link key={elem.id}
                        id={elem.id}
                        {...elem.elemconf}>
                        {elem.label}
                    </Link>
                )
            })}
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

export default connect(mapStateToProps)(Sidebar);