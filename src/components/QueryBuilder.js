import React from 'react';
import { connect } from "react-redux";
import { buildClientSchema } from 'graphql';
import EndPoint from './EndPoint';
import { DocExplorer } from './DocExplorer';
import QueryTreeBuilder from './QueryTreeBuilder';

const QueryBuilder = (props) => {
    console.log('props in queryu builder are ', props);
    return (
        <div>
            <div className={"title-bar"}>
                <h2>Query Builder</h2>
            </div>
            <EndPoint endPoint = {props.endPoint}/>
            <QueryTreeBuilder schema = {props.schema} endPoint = {props.endPoint} queryType = {props.queryType} routerProps={props.routerProps} />
            <input type="checkbox" className={"hidden"} id={"doc-explorer"}/>
            <label className="doc-explorer-toggle" htmlFor={"doc-explorer"}>DOCS</label>
            <DocExplorer schema = {buildClientSchema(props.schema)} />
        </div>
    )
}

export default connect(
    state => ({
        endPoint: state.project.endPoint,
        schema: state.project.schema,
        queryType: state.queryType
    })
)(QueryBuilder);
