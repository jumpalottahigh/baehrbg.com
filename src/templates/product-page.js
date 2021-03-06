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
          {/* OG Image */}
          {product.carouselImages[0] && (
            <meta
              name="og:image"
              content={product.carouselImages[0].file.url}
            />
          )}
        </Helmet>
        <Container>
          <h1>{product.title.title}</h1>
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
        description
        file {
          url
        }
        fluid(maxWidth: 1200, quality: 75) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`
