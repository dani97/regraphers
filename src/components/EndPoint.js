import React from 'react';

const EndPoint = (props) => (
    <div className={'endpoint-wrapper'}>
        EndPoint :<input type={'text'} className={'endpoint-box'} defaultValue={props.endPoint}/>
    </div>
);

export default EndPoint;