import React from 'react';
import { connect } from "react-redux";
import { logoutUser } from '../../store/authorization/authAction';

const Header = (props) => {

    let logoutHeading = null;
    if (props.isAuth)
        logoutHeading = <h3 onClick={props.logout} className="header-text-style margin-block-0 color-gray-on-hover-white pointer-on-hover">Wyloguj</h3>

    return (
        <div className="full-width black-background header-container">
            <div>
                {logoutHeading}
            </div>
            <div className="logo-container">
                <div>
                    <h1 className="header-text-style margin-block-0">IShift</h1>
                    <h4 className="header-text-style margin-block-0 font-italic">v 0.1.2</h4>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);