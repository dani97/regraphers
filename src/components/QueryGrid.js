import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { listEndPointOperations } from "../services/project";
import { saveAnnotatedQuery } from "../actions/query";

const QueryGrid = (props) => {

    let [queries, setQueries] = useState([]);

    console.log('in query gris props ', props);
    useEffect(() => {
        console.log('endpoint in grid ', props.endPoint);
        if(props.endPoint.trim().length) {
            console.log('endpoint has length');
            listEndPointOperations(props.endPoint).then((result) => {
                console.log(result);
                if(result.data && result.data.listEndPointOperations) {
                    let endPointOperations = result.data.listEndPointOperations;
                    if(endPointOperations && endPointOperations.items && endPointOperations.items.length) {
                        console.log('before setting to query  ', endPointOperations.items);
                        setQueries(endPointOperations.items);
                    }
                }
            });
        }
    },[]);

    return (<div>
        {queries.map((query, index) => (
                <div key={index}>
                    <pre dangerouslySetInnerHTML={{__html: query.graphql_query}}></pre>
                    <button onClick={() => {
                        props.saveAnnotatedQuery(query);
                    }}>Annotate</button>
                </div>
            )
        )}
        <Link to={'/wireFrame'}>
            <h3>Proceed to Annotate</h3>
        </Link>
    </div>);
}

export default connect(
    state => ({
        endPoint: state.project.endPoint
    }),
    {saveAnnotatedQuery}
)(QueryGrid);