import React from 'react'
import { FaEnvelope } from 'react-icons/fa'
import Button from './Button'

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
            Покажи имейл
          </Button>
        )}
      </div>
    )
  }
}
