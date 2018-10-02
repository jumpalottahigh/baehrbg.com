import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Fade from 'react-reveal/Fade'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'

import logo from '../../static/BAEHR_Logo_Skala-800px.jpg'

const Logo = styled.img`
  padding: 0 0 3rem 0;
  width: 400px;
  max-width: 100%;
`

const Text = styled.p`
  padding: 1rem 0;
`

const AboutPage = ({ data }) => {
  return (
    <Layout>
      <Container>
        <Logo src={logo} />
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

export default AboutPage

export const aboutPageQuery = graphql`
  query aboutPageQuery {
    contentfulHomePage {
      text {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
