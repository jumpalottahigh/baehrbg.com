import React, { Component } from 'react'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Slides from '../components/Slides/Slides'

const Specialist = styled.section`
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

    .image-wrapper,
    .map-wrapper {
      height: 100%;
    }

    .map-wrapper {
      max-height: 220px;

      .gatsby-image-wrapper {
        height: 100%;
      }
    }

    .left,
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
    }

    .left {
      width: 40%;
    }

    .right {
      display: flex;
      flex-wrap: nowrap;
      width: 60%;
    }
  }
`

class SpecialistsPage extends Component {
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
          {this.props.data.allContentfulSpecialist.edges.map(
            ({ node: specialist }) => (
              <Link key={specialist.id} to={`/specialists/` + specialist.slug}>
                <h2>{specialist.city}</h2>
                <Specialist>
                  <div className="left">
                    {specialist.pictures != null && (
                      <div className="image-wrapper">
                        <div className="image-container">
                          {specialist.pictures.length > 1 ? (
                            <Slides data={specialist.pictures} onlyImages />
                          ) : (
                            <Img
                              fluid={specialist.pictures[0].fluid}
                              alt={specialist.pictures[0].description}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="right">
                    <div className="description-wrapper">
                      <h2>{specialist.name}</h2>
                      <p>{specialist.phone}</p>
                      <p>{specialist.email}</p>
                      <p>{specialist.address}</p>
                    </div>
                    <div className="map-wrapper">
                      {specialist && specialist.map && (
                        <Img
                          fluid={specialist.map.fluid}
                          alt={specialist.map.title}
                        />
                      )}
                    </div>
                  </div>
                </Specialist>
              </Link>
            )
          )}
        </Container>
      </Layout>
    )
  }
}

export default SpecialistsPage

export const specialistsPageQuery = graphql`
  query specialistsPageQuery {
    allContentfulSpecialist(sort: { fields: order, order: ASC }) {
      edges {
        node {
          id
          slug
          name
          city
          phone
          email
          address
          map {
            title
            fluid(maxWidth: 700, quality: 75) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          pictures {
            description
            fluid(maxWidth: 700, quality: 75) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    contentfulPageMetadata(slug: { eq: "specialists" }) {
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
