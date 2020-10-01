import React, { useState } from "react";
import Aux from '../../hoc/auxiliary';

import '../../style/doc-style.css';

const Document = (props) => {
    const [isHide, setState] = useState(true)

    const toggle = () => {
        const newState = !isHide;
        setState(newState);
    }

    const details = () => {
        return (
            <Aux>
                <div className="doc-detail-header-item">wartość</div>
                <div className="doc-detail-header-item">opis</div>
                {
                    props.details.map(det => {
                        return (
                            <Aux key={det.id}>
                                <div className="doc-det">{det.value}</div>
                                <div className="doc-det">{det.description}</div>
                            </Aux>
                        )
                    })
                }
                <div className="item-end" onClick={toggle}>ukryj</div>
            </Aux>
        )
    }

    const showToggle = <div className="item-end" onClick={toggle}>szczegóły</div>

    return (
        <div className="doc-grid-2-container">
            {isHide ? showToggle : details()}
        </div>
    )
}

export default Document;