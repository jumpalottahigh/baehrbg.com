import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout/Layout'

class ProductPage extends Component {
  render() {
    return (
      <Layout>
        <section>
          {this.props.data.allContentfulProduct.edges.map(
            ({ node: product }) => (
              <div key={product.id} to={`/products/` + product.slug}>
                <Link to={`/products/` + product.slug}>
                  <h1>{product.title.title}</h1>
                </Link>
                <img src={`https:` + product.featuredImage.file.url} />
                <p>{product.body.childMarkdownRemark.excerpt}</p>
                <Link to={`/products/` + product.slug}>Read more...</Link>
              </div>
            )
          )}
        </section>
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
