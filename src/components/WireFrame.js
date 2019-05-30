import React, { Component } from 'react';
import Annotation from 'react-image-annotation';
import WireFrameEditor from './WireFrameEditor';

class WireFrame extends Component {

    state = {
        annotations: [],
        annotation: {}
    }

    onChange = (annotation) => {
        this.setState({ annotation })
    }

    onSubmit = (annotation) => {
        const { geometry, data } = annotation

        this.setState({
            annotation: {},
            activeAnnotations: this.state.annotations.concat({
                geometry,
                data: {
                    ...data,
                    id: Math.random()
                }
            })
        })
    }

    queryPath = ['nithya', '20'];

    render () {
        console.log('props in app ', this.state);
        return (
            <Annotation
                src='https://wi-images.condecdn.net/image/d91Wlky6Pw3/crop/810/f/googleandroidfine.jpg'
                alt='Two pebbles anthropomorphized holding hands'
                annotations={this.state.annotations}
                type={this.state.type}
                value={this.state.annotation}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                renderEditor={() => (<WireFrameEditor annotation={this.state.annotation}
                                                    onChange={this.onChange}
                                                    onSubmit={this.onSubmit}
                                                    queryPath={this.queryPath}/>
                )}/>
        )
    }
}

export default WireFrame;
