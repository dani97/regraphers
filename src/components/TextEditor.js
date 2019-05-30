import React from 'react'
import styled, { keyframes } from 'styled-components'

const Inner = styled.div`
  padding: 8px 16px;

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

function TextEditor (props) {
    let querypath = props.queryPath,
        index = 0;
  return (
    <React.Fragment>
      <Inner>
        <div>
            {props.queryPath.map(query => (
                <h3 key={index++}>{query}</h3>
            ))}
        </div>

      </Inner>
      {props.value && (
        <Button
          onClick={props.onSubmit}
        >
          Submit
        </Button>
      )}
    </React.Fragment>
  )
}

export default TextEditor
