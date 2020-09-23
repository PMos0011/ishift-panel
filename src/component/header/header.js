import React from 'react';

import './header.css';
import '../style.css';

const header = () => {
    return (
        <div className="header-container full-width black-background">
            <div>
                <h1 className="header-text-style margin-block-0">IShift</h1>
                <h4 className="header-text-style margin-block-0 font-italic">beta</h4>
            </div>
        </div>
    )
}

export default header;