import React, { Component } from 'react';
import Annotation from 'react-image-annotation';
import WireFrameEditor from './WireFrameEditor';
import {listWireFrame, listAnnotations, updateAnnotationsList} from "../services/project";
import {connect} from "react-redux";

const S3_BASE_URL = 'https://s3.amazonaws.com/';

class EditWireFrame extends Component {

    state = {
        annotations: [],
        annotation: {},
        id: '',
        image_url: null
    };

        componentDidMount() {
        const { match: { params } } = this.props.routerProps;
        try {
            listWireFrame(params['queryId']).then(
                (result) => {
                    console.log(result);
                    const image_url =  S3_BASE_URL + result['items'][0]['file']['bucket'] + '/' +  result['items']['file']['key'];
                    this.setState({
                        image_url
                    });
                }
            );
            listAnnotations(params['queryId']).then(
                (result) => {
                    console.log(result);
                    this.setState({
                        annotations: JSON.parse(result["items"][0]["annotationsList"])
                    });
                    this.setState({
                        id: result['id']
                    });
                    console.log("list of annotations", this.state.annotations);

                }
            );

        }
        catch (e) {
            console.log("error",e);
            this.setState({
                annotations: []
            })
        }
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
                    src={this.state.image_url}
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
                <button type={'submit'} className={"btn-primary mt-15 ml-30"} value={'Save'} onClick={() => {
                    let payload = {
                        id: this.state.id,
                        query_id: (this.props.annotatedQuery) ? this.props.annotatedQuery.id : '',
                        annotationsList: (this.state.annotations) ? JSON.stringify(this.state.annotations) : '[]'
                    }
                    console.log('payload ', payload);
                    updateAnnotationsList(payload).then((result) =>  {
                        console.log('result is ', result);
                        console.log('props are ', this.props);
                        this.props.routerProps.history.push('/queries');
                    })
                }}>Save</button>
            </div>
        )
    }
}

export default connect(
    state => ({
        annotatedQuery : (state.wireFrame && state.wireFrame.query) ? state.wireFrame.query : {}

    })
)(EditWireFrame);
