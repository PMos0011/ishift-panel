import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import '../../style/style.css';
import '../../style/sidebar-style.css';

const Sidebar = (props) =>{
    const link = '/auth/customers/' + props.dataAccess
    return (
        <div className="sidebar-container app-border-shadow">
            <Link to={link}>Klienci</Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dataAccess: state.authReducer.dataAccess
    };
};

export default connect(mapStateToProps) (Sidebar);