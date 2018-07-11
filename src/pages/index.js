import React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout/Layout'
import { graphql } from 'gatsby'

const Section = styled.section`
  padding: 3rem 0;
`

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Section style={{ backgroundColor: '#cecece' }}>
        <h1>Test</h1>
      </Section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query indexQuery {
    allContentfulProduct {
      edges {
        node {
          slug
          title {
            title
          }
          featuredImage {
            file {
              url
            }
          }
        }
      }
    }
  }
`
