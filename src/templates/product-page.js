import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Slides from '../components/Slides/Slides'

const ProductBody = styled.div`
  img {
    max-width: 100%;
    margin-bottom: 15px;
  }
`

class ProductPageTemplate extends React.Component {
  render() {
    const product = this.props.data.contentfulProduct
    return (
      <Layout location={this.props.location}>
        <Container>
          <h2>{product.title.title}</h2>
          <Slides data={product.carouselImages} onlyImages />
          <ProductBody
            dangerouslySetInnerHTML={{
              __html: product.body.childMarkdownRemark.html,
            }}
          />
        </Container>
      </Layout>
    )
  }
}

export default ProductPageTemplate

export const pageQuery = graphql`
  query productQuery($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      id
      slug
      title {
        title
      }
      body {
        childMarkdownRemark {
          html
          excerpt
        }
      }
      carouselImages {
        id
        file {
          url
          details {
            image {
              width
              height
            }
          }
        }
      }
    }
  }
`
