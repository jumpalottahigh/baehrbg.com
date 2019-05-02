import React from 'react'
import styled, { css } from 'styled-components'
import makeCarousel from 'react-reveal/makeCarousel'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

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
  height: 300px;

  @media (min-width: 500px) {
    height: 380px;
  }

  @media (min-width: 700px) {
    height: 510px;
  }

  @media (min-width: 1000px) {
    height: 650px;
  }
`
const Arrow = styled.div`
  font-family: monospace;
  text-shadow: 1px 1px 1px #fff;
  z-index: 100;
  line-height: 200px;
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
  @media (min-width: 550px) {
    line-height: 400px;
  }
  @media (min-width: 1000px) {
    line-height: ${height};
  }
`
const CarouselUI = ({ position, total, handleClick, children, noArrows }) => (
  <Container>
    <Children>
      {children}
      {!noArrows && (
        <React.Fragment>
          <Arrow onClick={handleClick} data-position={position - 1}>
            <FaAngleLeft />
          </Arrow>
          <Arrow right onClick={handleClick} data-position={position + 1}>
            <FaAngleRight />
          </Arrow>
        </React.Fragment>
      )}
    </Children>
  </Container>
)
const Carousel = makeCarousel(CarouselUI)

export default Carousel
