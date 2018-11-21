import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Slides from '../components/Slides/Slides'

const BlogBody = styled.div`
  text-align: left;
  padding: 0 30px;

  img {
    max-width: 100%;
    margin-bottom: 15px;
  }
`

class BlogPageTemplate extends React.Component {
  render() {
    const blog = this.props.data.contentfulBlogPost
    return (
      <Layout location={this.props.location}>
        <Helmet>
          {blog.title && <title>{`BAEHR - ${blog.title}`}</title>}
          {blog.metaDescription && (
            <meta
              name="description"
              content={blog.metaDescription.metaDescription}
            />
          )}
          {blog.metaKeywords && (
            <meta name="keywords" content={blog.metaKeywords.metaKeywords} />
          )}
        </Helmet>
        <Container>
          <h2>{blog.title}</h2>
          {blog.pictures != null && <Slides data={blog.pictures} onlyImages />}
          {blog.article != null && (
            <BlogBody
              dangerouslySetInnerHTML={{
                __html: blog.article.childMarkdownRemark.html,
              }}
            />
          )}
        </Container>
      </Layout>
    )
  }
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query blogQuery($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      article {
        childMarkdownRemark {
          html
        }
      }
      pictures {
        id
        description
        file {
          url
        }
      }
      metaDescription {
        metaDescription
      }
      metaKeywords {
        metaKeywords
      }
    }
  }
`
