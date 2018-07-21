import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import HamburgerMenu from './HamburgerMenu'
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
      }
    `}
    render={data => (
      <React.Fragment>
        <Helmet />
        <HamburgerMenu allProductPages={data.allContentfulCategory.edges} />
        {children}
        <Footer />
      </React.Fragment>
    )}
  />
)

export default Layout
