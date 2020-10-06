import React, { useEffect } from "react";
import { connect } from "react-redux";
import Aux from '../../hoc/auxiliary';

import * as filters from "./documentTypeFilter";
import { getDocumentDetails } from '../../store/documents/documentActions';

const FullDocument = (props) => {
    useEffect(() => {
        props.onLoad(props.match.params.dbId,
            props.match.params.id);
    }, []);

    return (
        <div className="doc-grid-2-auto-container width-80-white app-border-shadow">
            <div className="doc-det"><h3>{filters.converDate(props.documentDetails.rokMiesiac)}</h3></div>
            <div className="doc-det"><h3>{filters.translateDocumentType(props.documentDetails.typDeklaracji)}</h3></div>
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