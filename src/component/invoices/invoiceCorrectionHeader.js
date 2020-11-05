import React from "react";
import Aux from "../../hoc/auxiliary"
import {createDate} from "./invoicesConverters";

const CorrectionHeader = (props) => {

    const changeReasonValue = (event) =>{
        let newCorrectionData = {...props.correctionData};
        newCorrectionData.correctionReason = event.target.value;
        props.setCorrectionData(newCorrectionData);

    }
    return (
        <Aux>
            <hr className="hr-margin" />
            <div className="grid-2-invoice-correction">
                <div className="margin-all-1">
                    korygowany dokument <br />
                    <input className="text-x-large-input full-width" type="text" readOnly value={props.correctionData.correctedInvoiceNumber} />
                </div>
                <div className="margin-all-1">
                    z dnia <br />
                    <input className="text-x-large-input" type="text" readOnly value={createDate(props.correctionData.correctedInvoiceDate)} />
                </div>
            </div>
            <div className="margin-all-1">
                przyczyna korekty <br />
                <input className="text-x-large-input full-width" type="text" value={props.correctionData.correctionReason} onChange={changeReasonValue} />
            </div>
        </Aux>
    )

}

export default CorrectionHeader;