import React from 'react'
import GoogleMapReact from 'google-map-react'

const Pin = ({ text }) => <div>{text}</div>

class SimpleMap extends React.Component {
  state = {
    center: {
      lat: 33.749, // Helsinki: 60.16
      lng: 84.388, // Helsinki: 24.93
    },
    center: {
      lat: this.props.coords.split(',')[0] || 42.1441156,
      lng: this.props.coords.split(',')[1] || 24.7058549,
    },
    zoom: 11,
    markers: this.props.markers,
  }

  render() {
    const { center, markers, zoom } = this.state

    return (
      // Important! Always set the container height explicitly
      <div style={{ minHeight: '50vh' }}>
        <div style={{ height: '50vh', width: '100%' }}>
          <GoogleMapReact
            // TODO: add API key
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            <Pin lat={center.lat} lng={center.lng} text={'Marker'} />
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}

export default SimpleMap
