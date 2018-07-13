import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import FaEmail from 'react-icons/lib/fa/at'
import Mobile from 'react-icons/lib/fa/phone'
import Zoom from 'react-reveal/Zoom'
import Fade from 'react-reveal/Fade'

import Layout from '../components/Layout/Layout'
import Slides from '../components/Slides/Slides'
import Container from '../components/Container/Container'

import logo from '../../static/BAEHR_Logo_Skala-800px.jpg'

const Logo = styled.img`
  padding: 0 0 3rem 0;
  width: 400px;
`

const Text = styled.p`
  padding: 1rem 0;
`

const Contacts = styled.div`
  padding: 2rem 0;

  h3 {
    color: #c5112e;
  }

  p {
  }
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

          <Contacts>
            <h3>Контакт</h3>
            <p>
              <Mobile style={{ color: '#c5112e', marginRight: '0.5rem' }} />
              <a href="tel:+555555555">+555 555 555</a>
            </p>
            <p>
              <FaEmail style={{ color: '#c5112e', marginRight: '0.5rem' }} />
              <a href="mailto:test@test.com">test@test.com</a>
            </p>
          </Contacts>
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
