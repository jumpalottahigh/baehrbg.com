import React from 'react'
import styled from 'styled-components'

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 0 10px;
  text-align: center;
  min-height: calc(100vh - 320px);
  margin-top: 2rem;
`

export default class Container extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Inner>{this.props.children}</Inner>
      </React.Fragment>
    )
  }
}
