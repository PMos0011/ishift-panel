import React, { useEffect } from "react";
import { connect } from "react-redux";
import Aux from '../../hoc/auxiliary';

import {displayDate} from "./documentConverters";
import supportedDocuments from "./supportedDocuments";
import { getDocumentDetails } from '../../store/documents/documentActions';

const FullDocument = (props) => {
    useEffect(() => {
        props.onLoad(props.match.params.dbId,
            props.match.params.id);
    }, []);

    const document = (doc) => {
        if (doc.rokMiesiac !== "")
            return <div className="doc-det"><h3>{displayDate(doc.rokMiesiac)}</h3></div>
        else
            return <div className="doc-det"></div>
    }

    return (
        <div className="doc-grid-2-auto-container width-80-white app-border-shadow">
            {document(props.documentDetails)}
            <div className="doc-det"><h3>{supportedDocuments.get(props.documentDetails.typDeklaracji)}</h3></div>
            <div className="doc-detail-header-item">wartość</div>
            <div className="doc-detail-header-item">opis</div>
            {
                props.documentDetails.declarationDetails.map(det => {
                    return (
                        <Aux key={det.id}>
                            <div className="doc-det">{det.value}</div>
                            <div className="doc-det">{det.description}</div>
                        </Aux>
                    )
                })
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        documentDetails: state.documentReducer.documentDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (dbId, id) => dispatch(getDocumentDetails(dbId, id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullDocument);