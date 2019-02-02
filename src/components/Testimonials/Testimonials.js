import React from 'react'
import styled, { css } from 'styled-components'
import Bounce from 'react-reveal/Bounce'
import makeCarousel from 'react-reveal/makeCarousel'

const Container = styled.div`
  position: relative;
  overflow: hidden;
`
const Children = styled.div`
  position: relative;
  min-height: 300px;
`

const CarouselUI = ({ position, total, handleClick, children }) => (
  <Container>
    <Children>{children}</Children>
  </Container>
)
const Carousel = makeCarousel(CarouselUI)

const Testimonial = styled.div`
  display: flex;
  flex-direction: column;

  img {
    max-height: 100px;
    border-radius: 50%;
  }

  hr {
    max-width: 800px;
  }

  blockquote p:before,
  blockquote p:after {
    content: '“';
    width: 25px;
    height: 25px;
    line-height: 36px;
    font-size: 36px;
    font-family: 'PT Serif', serif;
    position: relative;
    top: 12px;
    left: 0px;
    color: rgb(205, 205, 205);
  }
`

export default class Testimonials extends React.Component {
  render() {
    return (
      <Carousel defaultWait={4000}>
        {this.props.data.map(({ node: t }) => (
          <Bounce key={t.id} right>
            <Testimonial>
              {t.image != null && (
                <div>
                  <img src={t.image.file.url} alt={t.title} />
                </div>
              )}
              {t.title && <h3>{t.title}</h3>}
              {t.description != null && (
                <div>
                  <hr />
                  <blockquote>
                    <p>{t.description.description}</p>
                  </blockquote>
                </div>
              )}
            </Testimonial>
          </Bounce>
        ))}
      </Carousel>
    )
  }
}
