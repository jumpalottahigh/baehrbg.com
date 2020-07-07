import React, { Component } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const Blog = styled.section`
  margin-bottom: 3rem;

  img {
    max-width: 100%;
    max-height: 500px;
  }

  @media (min-width: 800px) {
    display: flex;

    .left,
    .right {
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      padding: 1rem;
    }

    .left {
      width: 40%;
    }

    .right {
      width: 60%;
    }
  }
`

class BlogPage extends Component {
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
          {this.props.data.allContentfulBlogPost.edges.map(({ node: blog }) => (
            <Link key={blog.id} to={`/blog/` + blog.slug}>
              <Blog>
                <div className="left">
                  {blog.pictures != null && (
                    <div className="image-wrapper">
                      <img
                        src={`https:` + blog.pictures[0].file.url}
                        alt={blog.title}
                      />
                    </div>
                  )}
                </div>
                <div className="right">
                  <h2>{blog.title}</h2>
                  {blog.shortText != null && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blog.shortText.childMarkdownRemark.html,
                      }}
                    />
                  )}
                </div>
              </Blog>
            </Link>
          ))}
        </Container>
      </Layout>
    )
  }
}

export default BlogPage

export const blogPageQuery = graphql`
  query blogPageQuery {
    allContentfulBlogPost(sort: { fields: order, order: ASC }) {
      edges {
        node {
          id
          order
          slug
          title
          shortText {
            childMarkdownRemark {
              html
            }
          }
          pictures {
            description
            file {
              url
            }
          }
        }
      }
    }

    contentfulPageMetadata(slug: { eq: "blog" }) {
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
