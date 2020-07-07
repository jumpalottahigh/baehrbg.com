import React, { Component } from 'react'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const Training = styled.section`
  margin-bottom: 3.5rem;

  img {
    max-width: 100%;
    max-height: 500px;
  }

  .image-wrapper {
    height: 100%;
  }

  @media (min-width: 800px) {
    display: flex;

    .left,
    .right {
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      padding: 1rem;
    }

    .left {
      width: 35%;
    }

    .right {
      width: 65%;
    }
  }
`

class TrainingsPage extends Component {
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
          {this.props.data.allContentfulTraining.edges.map(
            ({ node: training }) => (
              <Link key={training.id} to={`/trainings/` + training.slug}>
                <Training>
                  <div className="left">
                    {training.carouselImages != null && (
                      <div className="image-wrapper">
                        <Img
                          fluid={training.carouselImages[0].fluid}
                          alt={training.carouselImages[0].description}
                        />
                      </div>
                    )}
                  </div>
                  <div className="right">
                    <h2>{training.title}</h2>
                    {training.shortDescription != null && (
                      <div>{training.shortDescription}</div>
                    )}
                  </div>
                </Training>
              </Link>
            )
          )}
        </Container>
      </Layout>
    )
  }
}

export default TrainingsPage

export const trainingsPageQuery = graphql`
  query trainingsPageQuery {
    allContentfulTraining(sort: { fields: order, order: ASC }) {
      edges {
        node {
          id
          order
          slug
          title
          shortDescription
          carouselImages {
            description
            fluid(maxWidth: 1200, quality: 75) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    contentfulPageMetadata(slug: { eq: "trainings" }) {
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
