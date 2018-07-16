import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import FaEmail from 'react-icons/lib/fa/at'
import Mobile from 'react-icons/lib/fa/phone'

const ContactsWrapper = styled.div`
  padding: 2rem 0;

  h3 {
    color: #c5112e;
  }
`

const Contacts = () => (
  <StaticQuery
    query={graphql`
      query contactsQuery {
        contentfulContact {
          title
          phone
          email
        }
      }
    `}
    render={data => {
      const { title, phone, email } = data.contentfulContact

      return (
        <ContactsWrapper id="contacts">
          <h3>{title}</h3>
          <p>
            <Mobile style={{ color: '#c5112e', marginRight: '0.5rem' }} />
            <a href={`tel:+${phone}`}>+{phone}</a>
          </p>
          <p>
            <FaEmail style={{ color: '#c5112e', marginRight: '0.5rem' }} />
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </ContactsWrapper>
      )
    }}
  />
)

export default Contacts
