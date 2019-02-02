import React from 'react'
import styled from 'styled-components'
import Slide from 'react-reveal/Slide'
import Carousel from '../Carousel/Carousel'

const Img = styled.img`
  max-width: 100%;

  @media (min-width: 650px) {
    min-height: 400px;
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
                  <Img src={slide.file.url} alt={slide.description} />
                </div>
              </Slide>
            ))
          : this.props.data.map(({ node: slide }) => (
              <Slide key={slide.id} right>
                <div>
                  <h1>{slide.title.title}</h1>
                  {slide.featuredImage != null && (
                    <Img
                      src={slide.featuredImage.file.url}
                      alt={slide.description}
                    />
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
