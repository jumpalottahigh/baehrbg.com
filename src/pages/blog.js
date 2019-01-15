import React, { Component } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const Blog = styled.section`
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
          {this.props.data.allContentfulBlogPost.edges.map(({ node: blog }) => (
            <Link key={blog.id} to={`/blog/` + blog.slug}>
              <Blog>
                <h2>{blog.title}</h2>
                {blog.pictures != null && (
                  <div className="image-wrapper">
                    <img
                      src={`https:` + blog.pictures[0].file.url}
                      alt={blog.title}
                    />
                  </div>
                )}
                {blog.shortText != null && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blog.shortText.childMarkdownRemark.html,
                    }}
                  />
                )}
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
    }
  }
`