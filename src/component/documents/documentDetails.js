import React, { useState } from "react";
import { Link } from "react-router-dom";

import Aux from '../../hoc/auxiliary';

const Document = (props) => {
    const [isHide, setState] = useState(true)

    const toggle = () => {
        const newState = !isHide;
        setState(newState);
    }

    const fullDocLink = "/auth/documents/" + props.dbId + "/" + props.docId;

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
                <div className="item-end doc-grid-2-auto-container">
                    <Link to={fullDocLink}>pełny</Link>
                    <div onClick={toggle}>ukryj</div>
                </div>
            </Aux>
        )
    }

    const showToggle = <div className="item-end doc-grid-2-auto-container">
        <Link to={fullDocLink}>pełny</Link>
        <div onClick={toggle}>szczegóły</div>
    </div>

    return (
        <div className="doc-grid-2-container">
            {isHide ? showToggle : details()}
        </div>
    )
}

export default Document;