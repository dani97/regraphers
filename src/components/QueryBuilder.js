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
            <h2>Query Builder</h2>
            <EndPoint endPoint = {props.endPoint}/>
            <br />
            <DocExplorer schema = {buildClientSchema(props.schema)} />
            <br />
            <QueryTreeBuilder schema = {props.schema} />
        </div>
    )
}

export default connect(
    state => ({
        endPoint: state.project.endPoint,
        schema: state.project.schema
    })
)(QueryBuilder);
