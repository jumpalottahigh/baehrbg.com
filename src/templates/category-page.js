import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const CategoryBody = styled.div`
  img {
    max-width: 100%;
    margin-bottom: 15px;
  }
`

class CategoryPageTemplate extends React.Component {
  render() {
    const category = this.props.data.contentfulCategory
    return (
      <Layout location={this.props.location}>
        <Container>
          <h2>{category.title}</h2>
          {category.image != null && (
            <img src={category.image} alt={category.title} />
          )}
          {category.description != null && (
            <CategoryBody
              dangerouslySetInnerHTML={{
                __html: category.description,
              }}
            />
          )}
        </Container>
      </Layout>
    )
  }
}

export default CategoryPageTemplate

export const pageQuery = graphql`
  query categoryQuery($slug: String!) {
    contentfulCategory(slug: { eq: $slug }) {
      id
      slug
      title
      description
      image {
        id
        file {
          url
        }
      }
    }
  }
`
