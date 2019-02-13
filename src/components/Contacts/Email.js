import React from 'react'
import styled from 'styled-components'
import { FaEnvelope } from 'react-icons/fa'

const Button = styled.button`
  color: #fff;
  border: 0;
  margin: 0;
  cursor: pointer;
  padding: 8px 16px;
  font-size: 0.875rem;
  min-width: 64px;
  min-height: 36px;
  font-weight: 500;
  line-height: 1.5;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  background: #c5112e;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`

export default class Email extends React.Component {
  state = {
    open: false,
  }

  render() {
    const { address } = this.props
    const { open } = this.state
    return (
      <div style={{ marginBottom: '1rem' }}>
        <FaEnvelope style={{ color: '#c5112e', marginRight: '0.5rem' }} />
        {open ? (
          <a href={`mailto:${address}`}>{address}</a>
        ) : (
          <Button
            onClick={() => {
              this.setState({ open: !open })
            }}
          >
            Покажи имайл
          </Button>
        )}
      </div>
    )
  }
}
