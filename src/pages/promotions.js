import React, { Component } from 'react'
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
                  <h2>{promotion.title}</h2>
                  {promotion.images != null && (
                    <div className="image-wrapper">
                      <img src={`https:` + promotion.images[0].file.url} />
                    </div>
                  )}
                  {promotion.shortText != null && (
                    <div>{promotion.shortText}</div>
                  )}
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
    allContentfulPromotion {
      edges {
        node {
          id
          slug
          title
          shortText
          images {
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
