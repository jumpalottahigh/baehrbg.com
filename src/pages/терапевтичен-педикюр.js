import React, { Component } from 'react'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Slides from '../components/Slides/Slides'

const Partners = styled.section`
  margin-bottom: 3rem;

  .image-wrapper {
    grid-row: 1/-1;
    grid-column: 1/2;

    .image-container {
      max-width: 100%;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
    }
  }

  .description-wrapper {
    grid-row: 1/2;
    grid-column: 2/-1;
  }

  .map-wrapper {
    grid-row: 2/-1;
    grid-column: 2/-1;
  }

  h2 {
    grid-column: 2/-1;
  }

  @media (min-width: 800px) {
    display: flex;

    .left,
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
    }

    .left {
      width: 35%;
    }

    .right {
      display: flex;
      flex-wrap: nowrap;
      width: 65%;
    }
  }
`

class PartnerTypesPage extends Component {
  render() {
    return (
      <Layout>
        {this.props.data.contentfulPageMetadata && (
          <Helmet>
            <title>{this.props.data.contentfulPageMetadata.title}</title>
            {this.props.data.contentfulPageMetadata.metaDescription && (
              <meta
                name="description"
                content={
                  this.props.data.contentfulPageMetadata.metaDescription
                    .metaDescription
                }
              />
            )}
            {this.props.data.contentfulPageMetadata.metaKeywords && (
              <meta
                name="keywords"
                content={
                  this.props.data.contentfulPageMetadata.metaKeywords
                    .metaKeywords
                }
              />
            )}
          </Helmet>
        )}
        <Container>
          {this.props.data.contentfulPageMetadata.heroImage && (
            <Img
              fluid={this.props.data.contentfulPageMetadata.heroImage.fluid}
            />
          )}
          {this.props.data.allContentfulPartnerTypes.edges.map(
            ({ node: partner }) => (
              <Link
                key={partner.id}
                to={`/терапевтичен-педикюр/` + partner.slug}
              >
                <Partners>
                  <div className="left">
                    {partner.pictures != null && (
                      <div className="image-wrapper">
                        <div className="image-container">
                          {partner.pictures.length > 1 ? (
                            <Slides data={partner.pictures} onlyImages />
                          ) : (
                            <Img
                              fluid={partner.pictures[0].fluid}
                              alt={partner.pictures[0].title}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="right">
                    <h2>{partner.name}</h2>
                    {partner.description != null && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: partner.description.childMarkdownRemark.html,
                        }}
                      />
                    )}
                  </div>
                  <div className="description-wrapper" />
                </Partners>
              </Link>
            )
          )}
        </Container>
      </Layout>
    )
  }
}

export default PartnerTypesPage

export const partnerTypesPageQuery = graphql`
  query partnerTypesPageQuery {
    allContentfulPartnerTypes(sort: { fields: order, order: ASC }) {
      edges {
        node {
          id
          slug
          name
          description {
            childMarkdownRemark {
              html
            }
          }
          pictures {
            title
            fluid(maxWidth: 700, quality: 75) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }

    contentfulPageMetadata(slug: { eq: "терапевтичен-педикюр" }) {
      title
      metaDescription {
        metaDescription
      }
      metaKeywords {
        metaKeywords
      }
      heroImage {
        fluid(maxWidth: 1200, quality: 75) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`
