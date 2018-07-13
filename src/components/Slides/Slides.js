import React from 'react'

export default class Slides extends React.Component {
  render() {
    const slides = [
      'https://source.unsplash.com/random/800x600',
      // 'https://source.unsplash.com/random/800x600',
      // 'https://source.unsplash.com/random/800x600',
      // 'https://source.unsplash.com/random/800x600',
      // 'https://source.unsplash.com/random/800x600',
    ]
    return (
      <React.Fragment>
        {slides.map((img, i) => (
          <div key={i}>
            <img src={img} />
          </div>
        ))}
      </React.Fragment>
    )
  }
}
