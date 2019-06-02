import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Slides from '../components/Slides/Slides'

const PartnerBody = styled.div`
  text-align: left;
  padding: 0 30px;

  img {
    max-width: 100%;
    margin-bottom: 15px;
  }
`

class PartnerPageTemplate extends React.Component {
  render() {
    const partner = this.props.data.contentfulPartner
    return (
      <Layout location={this.props.location}>
        <Helmet>
          {partner.name && <title>{`BAEHR - ${partner.name}`}</title>}
          {/* OG Image */}
          {partner.map[0] && (
            <meta name="og:image" content={partner.map[0].file.url} />
          )}
        </Helmet>
        <Container>
          <h1>{partner.name}</h1>
          {partner.map != null && <Slides data={partner.map} onlyImages />}
          <div>
            <p>{partner.phone}</p>
            <p>{partner.site}</p>
            <p>{partner.address}</p>
          </div>
        </Container>
      </Layout>
    )
  }
}

export default PartnerPageTemplate

export const pageQuery = graphql`
  query partnerQuery($slug: String!) {
    contentfulPartner(slug: { eq: $slug }) {
      id
      slug
      name
      phone
      site
      address
      map {
        id
        description
        file {
          url
        }
        fluid(maxWidth: 1200, quality: 75) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`
