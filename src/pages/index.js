import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Fade from 'react-reveal/Fade'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Slides from '../components/Slides/Slides'

import logo from '../../static/BAEHR_Logo_Skala-800px.jpg'

const Logo = styled.img`
  padding: 0 0 3rem 0;
  width: 400px;
  max-width: 100%;
`

const Text = styled.div`
  padding: 1rem 0;
`

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Container>
        <Logo src={logo} />
        <Slides data={data.contentfulHomePage.carouselImages} onlyImages />
        <Fade bottom>
          <Text
            dangerouslySetInnerHTML={{
              __html: data.contentfulHomePage.text.childMarkdownRemark.html,
            }}
          />
        </Fade>
      </Container>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query indexQuery {
    contentfulHomePage {
      text {
        childMarkdownRemark {
          html
        }
      }
      carouselImages {
        id
        description
        fluid(maxWidth: 1200, quality: 75) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`
