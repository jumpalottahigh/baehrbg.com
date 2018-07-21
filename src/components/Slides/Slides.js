import React from 'react'
import makeCarousel from 'react-reveal/makeCarousel'
// we'll need the Slide component for sliding animations
// but you can use any other effect
import Slide from 'react-reveal/Slide'
// we'll use styled components for this tutorial
// but you can use any other styling options ( like plain old css )
import styled, { css } from 'styled-components'

const width = '100%',
  height = '700px'

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: ${width};
`
const Children = styled.div`
  width: ${width};
  position: relative;
  height: ${height};
`
const Arrow = styled.div`
  font-family: monospace;
  text-shadow: 1px 1px 1px #fff;
  z-index: 100;
  line-height: ${height};
  text-align: center;
  position: absolute;
  top: 0;
  width: 10%;
  font-size: 3em;
  cursor: pointer;
  user-select: none;
  ${props =>
    props.right
      ? css`
          left: 90%;
        `
      : css`
          left: 0%;
        `};
`
const Dot = styled.span`
  font-size: 1.5em;
  cursor: pointer;
  text-shadow: 1px 1px 1px #fff;
  user-select: none;
`
const Dots = styled.span`
  text-align: center;
  width: ${width};
  z-index: 100;
`
const CarouselUI = ({ position, total, handleClick, children }) => (
  <Container>
    <Children>
      {children}
      <Arrow onClick={handleClick} data-position={position - 1}>
        {'<'}
      </Arrow>
      <Arrow right onClick={handleClick} data-position={position + 1}>
        {'>'}
      </Arrow>
    </Children>
    {/* <Dots>
      {Array(...Array(total)).map((val, index) => (
        <Dot key={index} onClick={handleClick} data-position={index}>
          {index === position ? '● ' : '○ '}
        </Dot>
      ))}
    </Dots> */}
  </Container>
)
const Carousel = makeCarousel(CarouselUI)

export default class Slides extends React.Component {
  render() {
    return (
      <Carousel>
        {this.props.onlyImages
          ? this.props.data.map(slide => (
              <Slide key={slide.id} right>
                <div>
                  <img src={slide.file.url} />
                </div>
              </Slide>
            ))
          : this.props.data.map(({ node: slide }) => (
              <Slide key={slide.id} right>
                <div>
                  <h1>{slide.title.title}</h1>
                  {slide.featuredImage != null && (
                    <img src={slide.featuredImage.file.url} />
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
