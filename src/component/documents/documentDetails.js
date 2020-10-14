import React, { useState } from "react";
import { Link } from "react-router-dom";

import infoIcon from "../../images/info_icon.svg";
import docIcon from "../../images/fullDoc_icon.svg";

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
            </Aux>
        )
    }

    const showToggle =  <div className="item-end doc-grid-2-auto-container">
    <img onClick={toggle} className="icon-size pointer-on-hover" src={infoIcon} alt="info" />
        <Link to={fullDocLink}><img className="icon-size " src={docIcon} alt="full document" /></Link>          
    </div>

    return (
        <div className="doc-grid-2-container">
            {isHide ? null : details()}
            {showToggle}
        </div>
    )
}

export default Document;