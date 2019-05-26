import React, {Fragment} from 'react';

const QueryArguments = (props) => {
    const args = props.args?props.args:[];
    function getInput(arg) {
        console.log(arg);
        if(arg.type.kind == 'SCALAR') {
            return <input name={arg.name}></input>
        }
        else {
            return <textarea name={arg.name}></textarea>
        }
    }
    return (
        <form>{
            args.map((arg, index) =>
                <Fragment key={index}>
                    <label>{arg.name}</label>
                    {getInput(arg)}
                    <br/>
                </Fragment>
            )
        }
        </form>
)
}
export default QueryArguments;