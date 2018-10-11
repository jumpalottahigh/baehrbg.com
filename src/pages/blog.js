import React, { Component } from 'react'
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
        <Container>
          {this.props.data.allContentfulBlogPost.edges.map(({ node: blog }) => (
            <Link key={blog.id} to={`/blog/` + blog.slug}>
              <Blog>
                <h2>{blog.title}</h2>
                {blog.pictures != null && (
                  <div className="image-wrapper">
                    <img src={`https:` + blog.pictures[0].file.url} />
                  </div>
                )}
                {blog.shortText != null && <div>{blog.shortText}</div>}
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
    allContentfulBlogPost {
      edges {
        node {
          id
          slug
          title
          shortText
          pictures {
            file {
              url
            }
          }
        }
      }
    }
  }
`
