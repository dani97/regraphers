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
            <div className={"flex-display explore-section"}>
                {queryTypes.map((type, index) => (
                        <label className = {"query-type secondary-card"} htmlFor={type} key={index} onClick={() => {
                            props.saveQueryType(type);
                            props.routerProps.history.push('/queryBuilder');
                        }}>
                            <input type="radio" className={"hidden"} id={type} name={"query"}/>
                            <span className="radio-mark"/>
                            <h3>{type}</h3>
                        </label>
                    )
                )}
            </div>
        </div>
)}

export default connect(
    state => ({
        schema: state.project.schema
    }),
    {saveQueryType}
)(ExploreGrid);
