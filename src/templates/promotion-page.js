import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Slides from '../components/Slides/Slides'

const PromotionBody = styled.div`
  text-align: left;
  padding: 0 30px;

  img {
    max-width: 100%;
    margin-bottom: 15px;
  }
`

class PromotionPageTemplate extends React.Component {
  render() {
    const promotion = this.props.data.contentfulPromotion
    return (
      <Layout location={this.props.location}>
        <Container>
          <h2>{promotion.title}</h2>
          {promotion.images != null && (
            <Slides data={promotion.images} onlyImages />
          )}
          {promotion.longText != null && (
            <PromotionBody
              dangerouslySetInnerHTML={{
                __html: promotion.longText.childMarkdownRemark.html,
              }}
            />
          )}
        </Container>
      </Layout>
    )
  }
}

export default PromotionPageTemplate

export const pageQuery = graphql`
  query promotionQuery($slug: String!) {
    contentfulPromotion(slug: { eq: $slug }) {
      id
      slug
      title
      longText {
        childMarkdownRemark {
          html
        }
      }
      images {
        id
        file {
          url
        }
      }
    }
  }
`
