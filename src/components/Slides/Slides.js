import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Slide from 'react-reveal/Slide'
import Carousel from '../Carousel/Carousel'

const ImgWrapper = styled.div`
  width: 100%;
  display: flex;

  .gatsby-image-wrapper {
    width: 100%;
  }

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
    const { data } = this.props
    return (
      <Carousel noArrows={data.length < 2 ? true : false}>
        {this.props.onlyImages
          ? data.map((slide, index) => (
              <Slide key={index} right>
                <div
                  style={{
                    display: 'flex',
                    height: '100%',
                  }}
                >
                  <ImgWrapper>
                    <Img fluid={slide.fluid} alt={slide.description} />
                  </ImgWrapper>
                </div>
              </Slide>
            ))
          : data.map(({ node: slide }, index) => (
              <Slide key={index} right>
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
