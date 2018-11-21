import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const Product = styled.section`
  margin-bottom: 3rem;

  img {
    max-width: 100%;
  }

  .img-container {
    grid-row: 1/-1;
    grid-column: 1/2;
  }

  h2 {
    grid-column: 2/-1;
  }

  .description {
    text-decoration: none !important;
    color: #000;
  }

  @media (min-width: 800px) {
    display: grid;
    grid-gap: 20px;
    grid-template-rows: 1fr 2fr;
    grid-template-columns: 3fr 5fr;
  }
`

class CategoryPageTemplate extends React.Component {
  render() {
    const category = this.props.data.contentfulCategory
    const allProductsOfCategory = this.props.data.allContentfulProduct
    return (
      <Layout location={this.props.location}>
        <Helmet>
          {category.title && <title>{`BAEHR - ${category.title}`}</title>}
          {category.metaDescription && (
            <meta
              name="description"
              content={category.metaDescription.metaDescription}
            />
          )}
          {category.metaKeywords && (
            <meta
              name="keywords"
              content={category.metaKeywords.metaKeywords}
            />
          )}
        </Helmet>
        <Container>
          <h1>{category.title}</h1>

          {allProductsOfCategory != null &&
            allProductsOfCategory.edges.map(({ node: product }) => {
              return (
                <Product key={product.id}>
                  <Link to={`/categories/${category.slug}/${product.slug}`}>
                    <h2>{product.title.title}</h2>
                  </Link>
                  {product.carouselImages != null && (
                    <Link
                      className="img-container"
                      to={`/categories/${category.slug}/${product.slug}`}
                    >
                      <img
                        src={`https:` + product.carouselImages[0].file.url}
                        alt={product.carouselImages[0].description}
                      />
                    </Link>
                  )}
                  {product.shortDescription != null && (
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html:
                          product.shortDescription.childMarkdownRemark.html,
                      }}
                    />
                  )}
                </Product>
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
      metaDescription {
        metaDescription
      }
      metaKeywords {
        metaKeywords
      }
      description {
        childMarkdownRemark {
          html
        }
      }
      image {
        description
        id
        file {
          url
        }
      }
    }

    allContentfulProduct(
      sort: { fields: order, order: ASC }
      filter: { category: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          id
          order
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
            description
            file {
              url
            }
          }
        }
      }
    }
  }
`
