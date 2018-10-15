import React, { Component } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const Training = styled.section`
  margin-bottom: 3rem;

  img {
    max-width: 100%;
    max-height: 500px;
  }

  @media (min-width: 800px) {
    display: grid;
    grid-gap: 20px;
    grid-template-rows: 1fr 2fr;
    grid-template-columns: 3fr 5fr;
  }

  .image-wrapper {
    grid-row: 1/-1;
    grid-column: 1/2;
  }

  h2 {
    grid-column: 2/-1;
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
          {this.props.data.allContentfulTraining.edges.map(
            ({ node: training }) => (
              <Link key={training.id} to={`/trainings/` + training.slug}>
                <Training>
                  <h2>{training.title}</h2>
                  {training.carouselImages != null && (
                    <div className="image-wrapper">
                      <img
                        src={`https:` + training.carouselImages[0].file.url}
                      />
                    </div>
                  )}
                  {training.shortDescription != null && (
                    <div>{training.shortDescription}</div>
                  )}
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
    allContentfulTraining {
      edges {
        node {
          id
          slug
          title
          shortDescription
          carouselImages {
            file {
              url
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
    }
  }
`
