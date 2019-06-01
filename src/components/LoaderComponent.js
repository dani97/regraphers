import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from "react-redux";

const LoaderComponent = (props) => {

    // const toggleLoader = () => { 
    //     props.visibility = (props.visibility === "true") ? "loading-mask" : "hidden";
    // }

    return (
        <div className={(props.loaderVisibility) ? "loading-mask" : "hidden"}>
            <Loader 
                type="ThreeDots"
                color="#FF1E50"
                height="100"	
                width="100"
            /> 
        </div>
    );
}

export default connect(
    state => ({
        loaderVisibility: state.loaderVisibility
    })
)(LoaderComponent);
