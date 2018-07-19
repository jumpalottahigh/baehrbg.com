import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const CategoryBody = styled.div`
  img {
    max-width: 100%;
    margin-bottom: 15px;
  }
`

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

class CategoryPageTemplate extends React.Component {
  render() {
    const category = this.props.data.contentfulCategory
    const allProductsOfCategory = this.props.data.allContentfulProduct
    return (
      <Layout location={this.props.location}>
        <Container>
          <h2>{category.title}</h2>

          {allProductsOfCategory != null &&
            allProductsOfCategory.edges.map(({ node: product }) => {
              return (
                <Link
                  key={product.id}
                  to={`/categories/${category.slug}/${product.slug}`}
                >
                  <Product>
                    <h2>{product.title.title}</h2>
                    {product.carouselImages != null && (
                      <img
                        src={`https:` + product.carouselImages[0].file.url}
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
            })}
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
      description {
        childMarkdownRemark {
          html
        }
      }
      image {
        id
        file {
          url
        }
      }
    }

    allContentfulProduct(filter: { category: { slug: { eq: $slug } } }) {
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
          carouselImages {
            file {
              url
            }
          }
        }
      }
    }
  }
`
