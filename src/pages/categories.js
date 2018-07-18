import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

const Category = styled.section`
  margin-bottom: 3rem;

  img {
    max-width: 100%;
  }

  @media (min-width: 800px) {
    display: grid;
    grid-gap: 20px;
    grid-template-rows: 1fr 2fr;
    grid-template-columns: 3fr 5fr;
  }

  img {
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
        <Container>
          {this.props.data.allContentfulCategory.edges.map(
            ({ node: category }) => (
              <Link key={category.id} to={`/categories/` + category.slug}>
                <Category>
                  <h2>{category.title}</h2>
                  {category.image != null && (
                    <img src={`https:` + category.image.file.url} />
                  )}
                  {category.desctiption != null && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: category.desctiption.childMarkdownRemark.html,
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
    allContentfulCategory {
      edges {
        node {
          id
          slug
          title
          description
          image {
            file {
              url
            }
          }
        }
      }
    }
  }
`
