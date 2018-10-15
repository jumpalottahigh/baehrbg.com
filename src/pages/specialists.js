import React, { Component } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '../components/Layout/Layout'
import Container from '../components/Container/Container'
import Map from '../components/Map/Map'
import Slides from '../components/Slides/Slides'

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
    grid-template-columns: 6fr 8fr;
  }

  .image-wrapper {
    grid-row: 1/-1;
    grid-column: 1/2;
  }

  .description-wrapper {
    grid-row: 1/2;
    grid-column: 2/-1;
  }

  .map-wrapper {
    grid-row: 2/-1;
    grid-column: 2/-1;
  }

  h2 {
    grid-column: 2/-1;
  }
`

class SpecialistsPage extends Component {
  render() {
    return (
      <Layout>
        {this.props.data.contentfulPageMetadata && (
          <Helmet>
            <title>{this.props.data.contentfulPageMetadata.title}</title>
            {this.props.data.contentfulPageMetadata.metaDescription && (
              <meta
                name="description"
                content={
                  this.props.data.contentfulPageMetadata.metaDescription
                    .metaDescription
                }
              />
            )}
            {this.props.data.contentfulPageMetadata.metaKeywords && (
              <meta
                name="keywords"
                content={
                  this.props.data.contentfulPageMetadata.metaKeywords
                    .metaKeywords
                }
              />
            )}
          </Helmet>
        )}
        <Container>
          {this.props.data.allContentfulSpecialist.edges.map(
            ({ node: specialist }) => {
              return (
                <React.Fragment key={specialist.id}>
                  <h2>{specialist.city}</h2>
                  <Specialist>
                    {specialist.pictures != null && (
                      <div className="image-wrapper">
                        {specialist.pictures.length > 1 ? (
                          <Slides data={specialist.pictures} onlyImages />
                        ) : (
                          <img
                            src={`https:` + specialist.pictures[0].file.url}
                          />
                        )}
                      </div>
                    )}
                    <div className="description-wrapper">
                      <h2>{specialist.name}</h2>
                      <p>{specialist.phone}</p>
                      <p>{specialist.email}</p>
                      <p>{specialist.address}</p>
                    </div>
                    <div className="map-wrapper">
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

    contentfulPageMetadata(slug: { eq: "specialists" }) {
      title
      metaDescription {
        metaDescription
      }
      metaKeywords {
        metaKeywords
      }
    }
  }
`
