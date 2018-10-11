import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Slides from '../components/Slides/Slides'

const ProductBody = styled.div`
  text-align: left;
  padding: 0 30px;

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
        <Helmet>
          {product.title && <title>{`BAEHR - ${product.title.title}`}</title>}
          {product.metaDescription && (
            <meta
              name="description"
              content={product.metaDescription.metaDescription}
            />
          )}
          {product.metaKeywords && (
            <meta name="keywords" content={product.metaKeywords.metaKeywords} />
          )}
        </Helmet>
        <Container>
          <h2>{product.title.title}</h2>
          {product.carouselImages != null && (
            <Slides data={product.carouselImages} onlyImages />
          )}
          {product.body != null && (
            <ProductBody
              dangerouslySetInnerHTML={{
                __html: product.body.childMarkdownRemark.html,
              }}
            />
          )}
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
      metaDescription {
        metaDescription
      }
      metaKeywords {
        metaKeywords
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
