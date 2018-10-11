import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import HamburgerMenu from './HamburgerMenu'
import Contacts from '../Contacts/Contacts'
import Footer from './Footer'

import 'normalize.css'
import './layout.css'

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
      }
    `}
    render={data => (
      <React.Fragment>
        <Helmet
          title={data.contentfulHomePage.metaTitle}
          meta={[
            {
              name: 'description',
              content: data.contentfulHomePage.metaDescription.metaDescription,
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
    )}
  />
)

export default Layout
