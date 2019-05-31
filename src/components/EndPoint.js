import React from 'react';

const EndPoint = (props) => (
    <div className={'endpoint-wrapper'}>
        <h3>EndPoint</h3><input type={'text'} className={'endpoint-box'} readOnly={true} defaultValue={props.endPoint}/>
    </div>
);

export default EndPoint;