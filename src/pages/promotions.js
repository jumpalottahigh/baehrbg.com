import React, { Component } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const Promotion = styled.section`
  margin-bottom: 3rem;

  img {
    max-width: 100%;
    max-height: 500px;
  }

  .image-wrapper {
    grid-row: 1/-1;
    grid-column: 1/2;
  }

  h2 {
    grid-column: 2/-1;
  }

  @media (min-width: 800px) {
    display: flex;

    .left,
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
    }

    .left {
      width: 35%;
    }

    .right {
      display: flex;
      flex-wrap: nowrap;
      width: 65%;
    }
  }
`

class PromotionsPage extends Component {
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
          {this.props.data.allContentfulPromotion.edges.map(
            ({ node: promotion }) => (
              <Link key={promotion.id} to={`/promotions/` + promotion.slug}>
                <Promotion>
                  <div className="left">
                    {promotion.images != null && (
                      <div className="image-wrapper">
                        <img
                          src={`https:` + promotion.images[0].file.url}
                          alt={promotion.images[0].description}
                        />
                      </div>
                    )}
                  </div>
                  <div className="right">
                    <h2>{promotion.title}</h2>
                    {promotion.shortText != null && (
                      <div>{promotion.shortText}</div>
                    )}
                  </div>
                </Promotion>
              </Link>
            )
          )}
        </Container>
      </Layout>
    )
  }
}

export default PromotionsPage

export const promotionsPageQuery = graphql`
  query promotionsPageQuery {
    allContentfulPromotion(sort: { fields: order, order: ASC }) {
      edges {
        node {
          id
          order
          slug
          title
          shortText
          images {
            description
            file {
              url
            }
          }
        }
      }
    }

    contentfulPageMetadata(slug: { eq: "promotions" }) {
      title
      metaDescription {
        metaDescription
      }
      metaKeywords {
        metaKeywords
      }
    }
  }
`
