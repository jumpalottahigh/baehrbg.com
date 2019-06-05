import React from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
class SimpleMap extends React.Component {
  state = {
    center: {
      lat: parseFloat(this.props.coords.split(',')[0]) || 42.1441156,
      lng: parseFloat(this.props.coords.split(',')[1]) || 24.7058549,
    },
    zoom: 11,
  }

  render() {
    const { center, zoom } = this.state

    return (
      <div style={{ minHeight: '35vh' }}>
        <div style={{ height: '35vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={center}
            defaultZoom={zoom}
          >
            <Marker lat={center.lat} lng={center.lng} />
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}

export default SimpleMap
