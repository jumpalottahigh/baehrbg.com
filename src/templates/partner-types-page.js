import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const Partner = styled.section`
  margin-bottom: 3rem;

  img {
    max-width: 100%;
  }

  .img-container {
    grid-row: 1/-1;
    grid-column: 1/2;
  }

  h2 {
    grid-column: 2/-1;
  }

  .description {
    text-decoration: none !important;
    color: #000;
  }

  @media (min-width: 800px) {
    display: grid;
    grid-gap: 20px;
    grid-template-rows: 1fr 2fr;
    grid-template-columns: 3fr 5fr;
  }
`

class PartnerTypePageTemplate extends React.Component {
  render() {
    const partnerType = this.props.data.contentfulPartnerTypes
    const allPartnersOfType = this.props.data.allContentfulPartner
    return (
      <Layout location={this.props.location}>
        <Helmet>
          {partnerType.name && <title>{`BAEHR - ${partnerType.name}`}</title>}
          {/* OG Image */}
          {partnerType.pictures[0] && (
            <meta name="og:image" content={partnerType.pictures[0].file.url} />
          )}
        </Helmet>
        <Container>
          <h1>{partnerType.name}</h1>

          {allPartnersOfType != null &&
            allPartnersOfType.edges.map(({ node: partner }) => {
              return (
                <Partner key={partner.id}>
                  <Link
                    to={`/терапевтичен-педикюр/${partnerType.slug}/${
                      partner.slug
                    }`}
                  >
                    <h1>{partner.name}</h1>
                  </Link>
                  {partner.map != null && (
                    <Link
                      className="img-container"
                      to={`/терапевтичен-педикюр/${partnerType.slug}/${
                        partner.slug
                      }`}
                    >
                      <Img
                        fluid={partner.map[0].fluid}
                        alt={partner.map[0].description}
                      />
                    </Link>
                  )}
                  <div>
                    <p>{partner.phone}</p>
                    <p>{partner.site}</p>
                    <p>{partner.address}</p>
                  </div>
                </Partner>
              )
            })}
        </Container>
      </Layout>
    )
  }
}

export default PartnerTypePageTemplate

export const pageQuery = graphql`
  query partnerTypeQuery($slug: String!) {
    contentfulPartnerTypes(slug: { eq: $slug }) {
      id
      slug
      name
      description {
        childMarkdownRemark {
          html
        }
      }
      pictures {
        description
        id
        file {
          url
        }
      }
    }

    allContentfulPartner(
      sort: { fields: order, order: ASC }
      filter: { partnerType: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          id
          slug
          name
          phone
          site
          address
          map {
            description
            fluid(maxWidth: 1200, quality: 75) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`
