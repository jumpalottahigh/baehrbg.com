import React from 'react'
import MapMarker from 'react-icons/lib/fa/map-marker'

export default class Marker extends React.Component {
  render() {
    const { $hover } = this.props

    // Set up hover styles
    const clearHoverStyle = {}
    const hoverStyle = {}
    const style = $hover ? hoverStyle : clearHoverStyle

    return <MapMarker style={{ fontSize: '2rem' }} />
  }
}
