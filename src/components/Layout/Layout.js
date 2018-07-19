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
        allContentfulProduct {
          edges {
            node {
              id
              slug
              title {
                title
              }
              category {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        <Helmet />
        <HamburgerMenu allProductPages={data.allContentfulProduct.edges} />
        {children}
        <Footer />
      </React.Fragment>
    )}
  />
)

export default Layout
