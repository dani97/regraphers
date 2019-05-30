import React from 'react'
import styled, { keyframes } from 'styled-components'
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import '../styles/TextEditor.css';

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
const people = [
    {
        first: 'Charlie',
        last: 'Brown',
        twitter: 'dancounsell'
    },
    {
        first: 'Charlotte',
        last: 'White',
        twitter: 'mtnmissy'
    },
    {
        first: 'Chloe',
        last: 'Jones',
        twitter: 'ladylexy'
    },
    {
        first: 'Cooper',
        last: 'King',
        twitter: 'steveodom'
    }
];

const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const renderSuggestion = (suggestion, { query }) => {
    console.log('into render suggestion ', suggestion);
    const suggestionText = `${suggestion.first} ${suggestion.last}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
        <span className={'suggestion-content ' + suggestion.twitter}>
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

let suggestionValue = '';

class TextEditor extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            suggestions: people
        };
    }

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return people;
        }

        const regex = new RegExp('\\b' + escapedValue, 'i');

        return people.filter(person => regex.test(this.getSuggestionValue(person)));
    }

    getSuggestionValue = (suggestion) => {
        suggestionValue = `${suggestion.first} ${suggestion.last}`;
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
            suggestions: people
        });
    };

    render() {
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
                        highlightFirstSuggestion={true}
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

export default TextEditor
