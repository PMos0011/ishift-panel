import React from 'react';
import { Link } from "react-router-dom";

import '../style.css';
import './sidebar-style.css';

const sidebar = () =>{
    return (
        <div className="sidebar-container app-border-shadow">
            <Link to='/auth/customers'>Klienci</Link>
        </div>
    )
}

export default sidebar;