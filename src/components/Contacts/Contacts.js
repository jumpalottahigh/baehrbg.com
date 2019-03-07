import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { FaMobile, FaFacebook, FaTwitter } from 'react-icons/fa'
import Email from './Email'
import Button from './Button'

const ContactsWrapper = styled.div`
  padding: 2rem 0;
  text-align: center;

  .share {
    display: flex;
    justify-content: center;
    padding-bottom: 3rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid #fafafa;

    a {
      margin: 0 1.5rem;
      text-decoration: none;

      button {
        display: flex;
        justify-items: center;
        align-items: center;
        font-size: 18px;
      }

      svg {
        padding-right: 0.3rem;
      }
    }
  }

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
          phone1
          phone2
          email1
          email2
        }
      }
    `}
    render={data => {
      const { title, phone1, phone2, email1, email2 } = data.contentfulContact

      let shareURL

      if (typeof window !== 'undefined') {
        shareURL = window.location.href
      }

      return (
        <ContactsWrapper id="contacts">
          {shareURL && (
            <div className="share">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareURL}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button>
                  <FaFacebook /> Share
                </Button>
              </a>
              <a
                href={`https://twitter.com/home?status=${shareURL}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button>
                  <FaTwitter /> Tweet
                </Button>
              </a>
            </div>
          )}
          <h3>{title}</h3>
          <p>
            <FaMobile style={{ color: '#c5112e', marginRight: '0.5rem' }} />
            <a href={`tel:+${phone1}`}>+{phone1}</a>
          </p>
          <p>
            <FaMobile style={{ color: '#c5112e', marginRight: '0.5rem' }} />
            <a href={`tel:+${phone2}`}>+{phone2}</a>
          </p>
          <Email address={email1} />
          <Email address={email2} />
        </ContactsWrapper>
      )
    }}
  />
)

export default Contacts
