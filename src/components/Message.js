import React from 'react';
import { connect } from "react-redux";

const Message = (props) => {
    console.log('props in message ', props);
    return (
        <div>
            {props.messages.map(message =>
                <div key={message.id}>
                    <h3 className={"message " + message.type}>{message.value}</h3>
                </div>
            )}
        </div>
    )
}

export default connect(
    (state) => ({messages: state.messages})
)(Message);
