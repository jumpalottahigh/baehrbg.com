import React from 'react'
import styled from 'styled-components'

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
  text-align: center;
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
