import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Slide from 'react-reveal/Slide'
import Carousel from '../Carousel/Carousel'

const ImgWrapper = styled.div`
  img {
    max-width: 100%;
  }

  @media (min-width: 650px) {
    img {
      min-height: 400px;
    }
  }
`

export default class Slides extends React.Component {
  render() {
    return (
      <Carousel>
        {this.props.onlyImages
          ? this.props.data.map(slide => (
              <Slide key={slide.id} right>
                <div>
                  <ImgWrapper>
                    <Img fluid={slide.fluid} alt={slide.description} />
                  </ImgWrapper>
                </div>
              </Slide>
            ))
          : this.props.data.map(({ node: slide }) => (
              <Slide key={slide.id} right>
                <div>
                  <h1>{slide.title.title}</h1>
                  {slide.featuredImage != null && (
                    <ImgWrapper>
                      <Img fluid={slide.fluid} alt={slide.description} />
                    </ImgWrapper>
                  )}
                  {slide.shortDescription != null && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: slide.shortDescription.childMarkdownRemark.html,
                      }}
                    />
                  )}
                </div>
              </Slide>
            ))}
      </Carousel>
    )
  }
}
