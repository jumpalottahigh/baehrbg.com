import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const Person = styled.section`
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

const AboutPage = ({ data }) => {
  return (
    <Layout>
      {data.contentfulPageMetadata && (
        <Helmet>
          <title>{data.contentfulPageMetadata.title}</title>
          {data.contentfulPageMetadata.metaDescription && (
            <meta
              name="description"
              content={
                data.contentfulPageMetadata.metaDescription.metaDescription
              }
            />
          )}
          {data.contentfulPageMetadata.metaKeywords && (
            <meta
              name="keywords"
              content={data.contentfulPageMetadata.metaKeywords.metaKeywords}
            />
          )}
        </Helmet>
      )}
      <Container>
        {data.contentfulPageMetadata.heroImage && (
          <Img fluid={data.contentfulPageMetadata.heroImage.fluid} />
        )}
        {data.allContentfulZaNas.edges.map(({ node: person }) => (
          <Person key={person.id}>
            <div className="left">
              {person.carouselImages != null && (
                <div className="image-wrapper">
                  <img
                    src={`https:` + person.carouselImages[0].file.url}
                    alt={person.titlename}
                  />
                </div>
              )}
            </div>
            <div className="right">
              <h2>{person.titlename}</h2>
              {person.body != null && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: person.body.childMarkdownRemark.html,
                  }}
                />
              )}
            </div>
          </Person>
        ))}
      </Container>
    </Layout>
  )
}

export default AboutPage

export const aboutPageQuery = graphql`
  query aboutPageQuery {
    allContentfulZaNas(sort: { fields: order, order: ASC }) {
      edges {
        node {
          titlename
          id
          order
          slug
          body {
            childMarkdownRemark {
              html
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

    contentfulPageMetadata(slug: { eq: "about" }) {
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
