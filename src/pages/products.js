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

class ProductPage extends Component {
  render() {
    return (
      <Layout>
        <Container>
          {this.props.data.allContentfulProduct.edges.map(
            ({ node: product }) => (
              <Link key={product.id} to={`/products/` + product.slug}>
                <Product>
                  <h2>{product.title.title}</h2>
                  <img src={`https:` + product.featuredImage.file.url} />
                  <p>{product.body.childMarkdownRemark.excerpt}</p>
                </Product>
              </Link>
            )
          )}
        </Container>
      </Layout>
    )
  }
}

export default ProductPage

export const ProductPageQuery = graphql`
  query blogQuery {
    allContentfulProduct {
      edges {
        node {
          id
          slug
          title {
            title
          }
          body {
            childMarkdownRemark {
              html
              excerpt
              timeToRead
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
    }
  }
`
