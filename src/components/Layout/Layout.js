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
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        <Helmet title={data.site.siteMetadata.title} />
        <HamburgerMenu />
        {children}
        <Footer />
      </React.Fragment>
    )}
  />
)

export default Layout
