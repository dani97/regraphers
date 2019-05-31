import React from 'react';
import { connect } from "react-redux";
import { buildClientSchema } from 'graphql';
import EndPoint from './EndPoint';
import { DocExplorer } from './DocExplorer';
import QueryTreeBuilder from './QueryTreeBuilder';

const QueryBuilder = (props) => {
    console.log('query builder props ',props);
    console.log('schema ', props.schema.__schema);
    return (
        <div>
            <div className={"title-bar"}>
                <h2>Query Builder</h2>
            </div>
            <EndPoint endPoint = {props.endPoint}/>
            <QueryTreeBuilder schema = {props.schema} />
            <DocExplorer schema = {buildClientSchema(props.schema)} />
        </div>
    )
}

export default connect(
    state => ({
        endPoint: state.project.endPoint,
        schema: state.project.schema
    })
)(QueryBuilder);
