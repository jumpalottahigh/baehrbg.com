import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Slides from '../components/Slides/Slides'

const TrainingBody = styled.div`
  text-align: left;
  padding: 0 30px;

  img {
    max-width: 100%;
    margin-bottom: 15px;
  }
`

class TrainingPageTemplate extends React.Component {
  render() {
    const training = this.props.data.contentfulTraining
    return (
      <Layout location={this.props.location}>
        <Helmet>
          {training.title && <title>{`BAEHR - ${training.title}`}</title>}
          {training.metaDescription && (
            <meta
              name="description"
              content={training.metaDescription.metaDescription}
            />
          )}
          {training.metaKeywords && (
            <meta
              name="keywords"
              content={training.metaKeywords.metaKeywords}
            />
          )}
        </Helmet>
        <Container>
          <h2>{training.title}</h2>
          {training.carouselImages != null && (
            <Slides data={training.carouselImages} onlyImages />
          )}
          {training.description != null && (
            <TrainingBody
              dangerouslySetInnerHTML={{
                __html: training.description.childMarkdownRemark.html,
              }}
            />
          )}
        </Container>
      </Layout>
    )
  }
}

export default TrainingPageTemplate

export const pageQuery = graphql`
  query trainingQuery($slug: String!) {
    contentfulTraining(slug: { eq: $slug }) {
      id
      slug
      title
      description {
        childMarkdownRemark {
          html
        }
      }
      carouselImages {
        id
        description
        file {
          url
        }
      }
      metaDescription {
        metaDescription
      }
      metaKeywords {
        metaKeywords
      }
    }
  }
`
