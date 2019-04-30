import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Slides from '../components/Slides/Slides'

const SpecialistBody = styled.div`
  text-align: left;
  padding: 0 30px;

  img {
    max-width: 100%;
    margin-bottom: 15px;
  }
`

class SpecialistPageTemplate extends React.Component {
  render() {
    const specialist = this.props.data.contentfulSpecialist
    return (
      <Layout location={this.props.location}>
        <Helmet>
          {specialist.name && <title>{`BAEHR - ${specialist.name}`}</title>}
          {specialist.metaDescription && (
            <meta
              name="description"
              content={specialist.metaDescription.metaDescription}
            />
          )}
          {specialist.metaKeywords && (
            <meta
              name="keywords"
              content={specialist.metaKeywords.metaKeywords}
            />
          )}
        </Helmet>
        <Container>
          <h1>{specialist.name}</h1>
          {specialist.pictures != null && (
            <Slides data={specialist.pictures} onlyImages />
          )}
          {specialist.textCV != null && (
            <SpecialistBody
              dangerouslySetInnerHTML={{
                __html: specialist.textCV.textCV,
              }}
            />
          )}
        </Container>
      </Layout>
    )
  }
}

export default SpecialistPageTemplate

export const pageQuery = graphql`
  query specialistQuery($slug: String!) {
    contentfulSpecialist(slug: { eq: $slug }) {
      id
      slug
      name
      textCV {
        textCV
      }
      pictures {
        id
        description
        fluid(maxWidth: 1200, quality: 75) {
          ...GatsbyContentfulFluid_withWebp
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
