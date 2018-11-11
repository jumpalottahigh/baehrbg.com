import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import HamburgerMenu from './HamburgerMenu'
import Contacts from '../Contacts/Contacts'
import Footer from './Footer'

import 'normalize.css'
import './layout.css'

function checkCookieStatus() {
  if (
    document.cookie.includes('cookieconsent_status=dismiss') ||
    document.cookie.includes('cookieconsent_status=allow') ||
    document.cookie.includes('cookieconsent_status=deny')
  ) {
    return true
  } else {
    return false
  }
}

const cookieIsSet = checkCookieStatus()

function hydrateCookieConsent({ message, dismiss, deny, moreText, moreLink }) {
  window.addEventListener(`load`, function() {
    window.cookieconsent.initialise({
      palette: {
        popup: {
          background: `#474747`,
        },
        button: {
          background: `#c5102e`,
        },
      },
      content: {
        message: message.message,
        dismiss,
        deny,
        link: moreText,
        href: moreLink,
        target: '_blank',
      },
      type: `opt-out`,
      onInitialise: function(status) {
        var type = this.options.type
        var didConsent = this.hasConsented()
        if (type == `opt-out` && !didConsent) {
          // disable cookies
          // TODO: uncomment once we add google analytics
          // self.gaOptout()
        }
      },

      onStatusChange: function(status, chosenBefore) {
        var type = this.options.type
        var didConsent = this.hasConsented()
        if (type == `opt-out` && !didConsent) {
          // disable cookies
          // self.gaOptout()
        }
      },

      onRevokeChoice: function() {
        var type = this.options.type
        if (type == `opt-out`) {
          // enable cookies
          document.cookie = `ga-disable-` + self.gaProperty + `=false`
        }
      },
    })
  })
}

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query menuEntriesQuery {
        allContentfulCategory {
          edges {
            node {
              id
              slug
              title
            }
          }
        }

        contentfulHomePage {
          metaKeywords {
            metaKeywords
          }
          metaDescription {
            metaDescription
          }
          metaTitle
        }

        contentfulCookieConsent {
          message {
            message
          }
          dismiss
          deny
          moreText
          moreLink
        }
      }
    `}
    render={data => {
      // Run the cookie consent if the user has not concented yet
      if (!cookieIsSet) {
        hydrateCookieConsent(data.contentfulCookieConsent)
      }

      return (
        <React.Fragment>
          <Helmet
            title={data.contentfulHomePage.metaTitle}
            meta={[
              {
                name: 'description',
                content:
                  data.contentfulHomePage.metaDescription.metaDescription,
              },
              {
                name: 'keywords',
                content: data.contentfulHomePage.metaKeywords.metaKeywords,
              },
            ]}
          />
          <HamburgerMenu allProductPages={data.allContentfulCategory.edges} />
          {children}
          <Contacts />
          <Footer />
        </React.Fragment>
      )
    }}
  />
)

export default Layout
