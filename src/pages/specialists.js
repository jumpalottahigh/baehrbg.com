import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Map from '../components/Map/Map'

const Specialist = styled.section`
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

  .description-wrapper {
    grid-row: 1/-1;
    grid-column: 2/-1;
  }

  h2 {
    grid-column: 2/-1;
  }
`

class SpecialistsPage extends Component {
  render() {
    console.log(this.props.data.allContentfulSpecialist.edges)
    // let previousCity = this.props.data.allContentfulSpecialist.edges[0].node.city
    // let newCity = true

    return (
      <Layout>
        <Container>
          {this.props.data.allContentfulSpecialist.edges.map(
            ({ node: specialist }) => {
              console.log(specialist)
              return (
                <React.Fragment key={specialist.id}>
                  <h2>{specialist.city}</h2>
                  <Specialist>
                    {specialist.pictures != null && (
                      <div className="image-wrapper">
                        <img src={`https:` + specialist.pictures[0].file.url} />
                        <h2>{specialist.name}</h2>
                        <p>{specialist.phone}</p>
                        <p>{specialist.email}</p>
                        <p>{specialist.address}</p>
                      </div>
                    )}
                    <div className="description-wrapper">
                      <Map coords={specialist.mapCoords} />
                    </div>
                  </Specialist>
                </React.Fragment>
              )
            }
          )}
        </Container>
      </Layout>
    )
  }
}

export default SpecialistsPage

export const specialistsPageQuery = graphql`
  query specialistsPageQuery {
    allContentfulSpecialist(sort: { fields: city }) {
      edges {
        node {
          id
          name
          city
          phone
          email
          address
          mapCoords
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
