import React from 'react';
import { connect } from "react-redux";
import { createTypesObject } from "../services/project";
import { saveQueryType } from "../actions/queryType";
import { Link } from 'react-router-dom';

const ExploreGrid = (props) => {

    let queryTypes = [],
        typesObject = createTypesObject(props.schema);

    if(typesObject && typesObject.Query) {
        let fields = typesObject.Query.fields;
        fields.forEach((field) => {
            queryTypes.push((field.name) ? field.name : '');
        })
    }

    return (
        <div>
            <div className={"title-bar"}>
                <h2>Select Query Type</h2>
            </div>
        <div>
        {queryTypes.map((type, index) => (
                <div className = {"query-type secondary-card"} key={index} onClick={() => {
                    props.saveQueryType(type);
                }}>
                    <h3>{type}</h3>
                </div>
            )
        )}
        </div>
        <h3>
            <Link to="/queryBuilder"><span className={"btn-primary"}>Proceed</span></Link>
        </h3>
        </div>
)}

export default connect(
    state => ({
        schema: state.project.schema
    }),
    {saveQueryType}
)(ExploreGrid);
