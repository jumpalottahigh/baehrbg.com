import React from 'react'
import GoogleMapReact from 'google-map-react'

const Pin = ({ text }) => <div>{text}</div>

const ZOOM = 11

class SimpleMap extends React.Component {
  render() {
    // Map coords come in a comma separated string
    const { coords } = this.props
    const lat = coords.split(',')[0] || '42.1441156'
    const lng = coords.split(',')[1] || '24.7058549'

    const newCoords = {
      lat,
      lng,
    }

    console.log(newCoords)

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          // TODO: add API key
          // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          // Set center to provided one if exists, otherwise fallback
          center={{ newCoords }}
          zoom={ZOOM}
        >
          <Pin lat={newCoords.lat} lng={newCoords.lng} text={'Marker'} />
        </GoogleMapReact>
      </div>
    )
  }
}

export default SimpleMap
