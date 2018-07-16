import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Fade from 'react-reveal/Fade'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Slides from '../components/Slides/Slides'
import Contacts from '../components/Contacts/Contacts'

import logo from '../../static/BAEHR_Logo_Skala-800px.jpg'

const Logo = styled.img`
  padding: 0 0 3rem 0;
  width: 400px;
`

const Text = styled.p`
  padding: 1rem 0;
`

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Container>
        <Logo src={logo} />
        <Slides />
        <Fade bottom>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod hendrerit feugiat. Quisque rutrum posuere leo,
            sed condimentum leo viverra id. Praesent sit amet diam ac ipsum
            posuere sagittis. Nullam in congue sem, ut tempus nisl. Sed
            efficitur eu ante ac lacinia.
          </Text>
          <Text>
            Vestibulum iaculis mi a ligula lobortis elementum. Nam sit amet
            metus orci. Nulla facilisi. Interdum et malesuada fames ac ante
            ipsum primis in faucibus. Quisque et dignissim dui.
          </Text>
          <Contacts />
        </Fade>
      </Container>
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
