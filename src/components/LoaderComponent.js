import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class LoaderComponent extends Component {

    toggleLoader() {
        this.props.visibility = (this.props.visibility === "hidden") ? "loading-mask" : "hidden";
    }

    render () {
        return (
            <div className={this.props.visibility}>
                <Loader 
                    type="ThreeDots"
                    color="#FF1E50"
                    height="100"	
                    width="100"
                /> 
            </div>
        );
    }
}

export default LoaderComponent;
