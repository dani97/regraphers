import React, { Component } from 'react';
import Annotation from 'react-image-annotation';
import WireFrameEditor from './WireFrameEditor';
import { createAnnotatedQueries } from "../services/project";
import {connect} from "react-redux";

class WireFrame extends Component {

    state = {
        annotations: [],
        annotation: {}
    }

    onChange = (annotation) => {
        console.log('on change value is ', annotation);
        this.setState({ annotation })
    }

    onSubmit = (annotation) => {
        console.log('annotation ', annotation);
        const { geometry, data } = annotation

        this.setState({
            annotation: {},
            annotations: this.state.annotations.concat({
                geometry,
                data: {
                    ...data,
                    id: Math.random()
                }
            })
        })
    }

    render () {
        console.log('props in wireFrame ', this.props);
        return (
            <div>
                <Annotation
                    src='https://wi-images.condecdn.net/image/d91Wlky6Pw3/crop/810/f/googleandroidfine.jpg'
                    alt='Two pebbles anthropomorphized holding hands'
                    annotations={this.state.annotations}
                    type={this.state.type}
                    value={this.state.annotation}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    renderEditor={() => (<WireFrameEditor annotation={this.state.annotation}
                                                          annotatedQuery={this.props.annotatedQuery}
                                                          onChange={this.onChange}
                                                          onSubmit={this.onSubmit}/>
                    )}/>
                <button type={'submit'} className={"btn-primary"} value={'Save'} onClick={() => {
                    let payload = {
                        "input": {
                            "query_id": (this.props.annotatedQuery) ? this.props.annotatedQuery.id : '',
                            "image_url": "https://wi-images.condecdn.net/image/d91Wlky6Pw3/crop/810/f/googleandroidfine.jpg",
                            "annotation": (this.state.annotations) ? JSON.stringify(this.state.annotations) : '[]'
                        }
                    }
                    console.log('payload ', payload);
                    createAnnotatedQueries(payload).then((result) =>  {
                        console.log('result is ', result);
                    })
                }}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        annotatedQuery: (state.query) ? state.query : null
    })
)(WireFrame);
