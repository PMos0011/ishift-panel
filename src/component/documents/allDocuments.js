import React, {useEffect} from "react";
import { connect } from "react-redux";

import {getAllDocuments} from '../../store/documents/documentActions';

const AllDocuments = (props) =>{
    useEffect(() => {
        props.onLoad(props.match.params.id);
    }, []);

    return(
        <div>doki</div>
    )
}

const mapStateToProps = (state) => {
    return {
        documents: state.documentReducer.documents,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => dispatch(getAllDocuments(id)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (AllDocuments);