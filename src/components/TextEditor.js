import React from 'react'
import styled, { keyframes } from 'styled-components'
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import '../styles/TextEditor.css';
import {connect} from "react-redux";

const Inner = styled.div`
  textarea {
    border: 0;
    font-size: 14px;
    margin: 6px 0;
    min-height: 60px;
    outline: 0;
  }
`

const Button = styled.div`
  background: whitesmoke;
  border: 0;
  box-sizing: border-box;
  color: #363636;
  cursor: pointer;
  font-size: 1rem;
  margin: 0;
  outline: 0;
  padding: 8px 16px;
  text-align: center;
  text-shadow: 0 1px 0 rgba(0,0,0,0.1);
  width: 100%;

  transition: background 0.21s ease-in-out;

  &:focus, &:hover {
    background: #eeeeee;
  }
`

let queryPaths = [];
const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const renderSuggestion = (suggestion, { query }) => {
    let index = 0;
    console.log('into render suggestion ', suggestion);
    const suggestionText = `${suggestion}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
        <span className={'suggestion-content ' + index}>
      <span className="name">
        {
            parts.map((part, index) => {
                const className = part.highlight ? 'highlight' : null;

                return (
                    <span className={className} key={index}>{part.text}</span>
                );
            })
        }
      </span>
    </span>
    );
}

function createJsonPath(pathString, key,parentValue)  {

    pathString =  pathString + '_' + key;

    if(parentValue[key] == true) {
        queryPaths.push(pathString);
        return;
    }
    for(const childKey in parentValue[key]) {
        if(key !== '__args') {
            createJsonPath(pathString, childKey, parentValue[key])
        }
    }
}

let suggestionValue = '';

class TextEditor extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            suggestions: queryPaths
        };
    }

    componentDidMount() {
        if(this.props.annotatedQuery) {
            let queryJson = this.props.annotatedQuery;

            if(queryJson.hasOwnProperty('__variables')) {
                delete(queryJson['__variables']);
            }
            for(let key in queryJson) {
                console.log('key is ', key);
                if(key !== '__args') {
                    createJsonPath('', key, queryJson)
                }
            }

            this.setState({
                suggestions: queryPaths
            });

            console.log('query path is ', queryPaths);
        }
        console.log('annotated query after', this.props.annotatedQuery);
    }

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return queryPaths;
        }

        const regex = new RegExp('\\b' + escapedValue, 'i');

        return queryPaths.filter(queryPath => regex.test(this.getSuggestionValue(queryPath)));
    }

    getSuggestionValue = (suggestion) => {
        suggestionValue = `${suggestion}`;
        return suggestionValue;
    }

    onChange = (event, { newValue, method }) => {
        this.props.onChange(newValue);
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: queryPaths
        });
    };

    render() {
        console.log('in props in textEditor ', this.props);
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Type 'field'",
            value:(this.props.value)
                ? this.props.value
                : '',
            onChange: this.onChange
        };

        return (
            <React.Fragment>
                <Inner>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        alwaysRenderSuggestions={true}
                        onSuggestionSelected={() => {
                            this.props.onSubmit(suggestionValue);
                        }}
                    />
                </Inner>
            </React.Fragment>
        )
    }
}


export default connect(
    state => ({
       annotatedQuery: (state.query) ? JSON.parse(state.query.query_string || '[]') : null
    })
)(TextEditor);