import React, { useState } from "react";
import Aux from '../../hoc/auxiliary';
import './doc-style.css';

const Document = (props) => {
    const [isHide, setState] = useState (true)

    const toggle = () =>{
        const newState = !isHide;
        setState(newState);
    }
   
    const details = () => {
        return (
            <Aux>
                <div>wartość</div>
                <div>opis</div>
                {
                    props.details.map(det => {
                        return (
                            <Aux key={det.id}>
                                <div>{det.value}</div>
                                <div>{det.description}</div>
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
            {isHide?showToggle:details()}
        </div>
    )
}

export default Document;