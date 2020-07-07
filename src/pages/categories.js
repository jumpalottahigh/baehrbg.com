import React, { Component } from 'react'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const Category = styled.section`
  margin-bottom: 3rem;

  img {
    max-width: 100%;
    max-height: 500px;
  }

  @media (min-width: 800px) {
    display: grid;
    grid-gap: 20px;
    grid-template-rows: 1fr 2fr;
    grid-template-columns: 3fr 5fr;
  }

  .image-wrapper {
    grid-row: 1/-1;
    grid-column: 1/2;
  }

  h2 {
    grid-column: 2/-1;
  }
`

class CategoriesPage extends Component {
  render() {
    return (
      <Layout>
        {this.props.data.contentfulPageMetadata && (
          <Helmet>
            <title>{this.props.data.contentfulPageMetadata.title}</title>
            {this.props.data.contentfulPageMetadata.metaDescription && (
              <meta
                name="description"
                content={
                  this.props.data.contentfulPageMetadata.metaDescription
                    .metaDescription
                }
              />
            )}
            {this.props.data.contentfulPageMetadata.metaKeywords && (
              <meta
                name="keywords"
                content={
                  this.props.data.contentfulPageMetadata.metaKeywords
                    .metaKeywords
                }
              />
            )}
          </Helmet>
        )}
        <Container>
          {this.props.data.contentfulPageMetadata.heroImage && (
            <Img
              fluid={this.props.data.contentfulPageMetadata.heroImage.fluid}
            />
          )}
          {this.props.data.allContentfulCategory.edges.map(
            ({ node: category }) => (
              <Link key={category.id} to={`/categories/` + category.slug}>
                <Category>
                  <h2>{category.title}</h2>
                  {category.image != null && (
                    <div className="image-wrapper">
                      <Img
                        fluid={category.image.fluid}
                        alt={category.image.description}
                      />
                    </div>
                  )}
                  {category.description != null && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: category.description.childMarkdownRemark.html,
                      }}
                    />
                  )}
                </Category>
              </Link>
            )
          )}
        </Container>
      </Layout>
    )
  }
}

export default CategoriesPage

export const categoryPageQuery = graphql`
  query categoryPageQuery {
    allContentfulCategory(sort: { fields: order, order: ASC }) {
      edges {
        node {
          id
          order
          slug
          title
          description {
            childMarkdownRemark {
              html
            }
          }
          image {
            description
            fluid(maxWidth: 1200, quality: 75) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    contentfulPageMetadata(slug: { eq: "categories" }) {
      title
      metaDescription {
        metaDescription
      }
      metaKeywords {
        metaKeywords
      }
      heroImage {
        fluid(maxWidth: 1200, quality: 75) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`
