import React, { Component } from 'react'
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
                  {training.description != null && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: training.description.childMarkdownRemark.html,
                      }}
                    />
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
          description {
            childMarkdownRemark {
              html
            }
          }
          carouselImages {
            file {
              url
            }
          }
        }
      }
    }
  }
`
