import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout/Layout'

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
        <Product>
          <h3>{product.createdAt}</h3>
          <h1>{product.title.title}</h1>
          <ProductBody
            dangerouslySetInnerHTML={{
              __html: product.body.childMarkdownRemark.html,
            }}
          />
        </Product>
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
      featuredImage {
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
