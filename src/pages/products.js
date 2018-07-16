import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const Product = styled.section`
  margin-bottom: 3rem;

  img {
    max-width: 100%;
  }

  @media (min-width: 800px) {
    display: grid;
    grid-gap: 20px;
    grid-template-rows: 1fr 2fr;
    grid-template-columns: 3fr 5fr;
  }

  img {
    grid-row: 1/-1;
    grid-column: 1/2;
  }

  h2 {
    grid-column: 2/-1;
  }
`

class ProductsPage extends Component {
  render() {
    return (
      <Layout>
        <Container>
          {this.props.data.allContentfulProduct.edges.map(
            ({ node: product }) => (
              <Link key={product.id} to={`/products/` + product.slug}>
                <Product>
                  <h2>{product.title.title}</h2>
                  {product.productsListingImage != null && (
                    <img
                      src={`https:` + product.productsListingImage.file.url}
                    />
                  )}
                  {product.shortDescription != null && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          product.shortDescription.childMarkdownRemark.html,
                      }}
                    />
                  )}
                </Product>
              </Link>
            )
          )}
        </Container>
      </Layout>
    )
  }
}

export default ProductsPage

export const ProductsPageQuery = graphql`
  query productsPageQuery {
    allContentfulProduct {
      edges {
        node {
          id
          slug
          title {
            title
          }
          shortDescription {
            childMarkdownRemark {
              html
              excerpt
            }
          }
          productsListingImage {
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
    }
  }
`
