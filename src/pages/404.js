import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout/Layout'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;
  text-align: center;
  padding-top: 80px;
  min-height: 35vh !important;
`

const NotFoundPage = () => (
  <Layout>
    <Container>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Container>
  </Layout>
)

export default NotFoundPage
