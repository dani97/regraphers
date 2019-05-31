import React, {Fragment} from 'react';
import { Formik } from 'formik';

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.

const QueryTester = (props) => {
    let initialValues = {};
    props.args.forEach(arg => {
        initialValues[arg.name] = '';
    });

    function getInput(arg, handleChange) {
        console.log(arg);
        if(arg.type.kind == 'SCALAR') {
            return <input name={arg.name} onChange={handleChange}></input>
        }
        else {
            return <textarea name={arg.name} onChange={handleChange}></textarea>
        }
    }

    const closeModal = (event) => {
        props.closeModal();
    }

    return (
        <div className={"modal-container"}>
            <h2 className={"modal-header"}>Args List</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={values =>
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                    }, 500)
                }>
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        {
                            props.args.map((arg,index) => (
                                <Fragment key={index}>
                                    <label>{arg.name}</label>
                                    {getInput(arg, handleChange)}
                                    <br></br>
                                </Fragment>
                            ))
                        }
                        <p>{JSON.stringify(values)}</p>


                        <button className={"btn-play"} type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                        <button className={"btn-close-modal"} type={'button'} onClick={closeModal}>X</button>
                    </form>
                )

                }
            </Formik>
        </div>
    );
}

export default QueryTester;