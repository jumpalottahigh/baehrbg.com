import React from 'react'
import { FaMapMarker } from 'react-icons/fa'

export default class Marker extends React.Component {
  render() {
    const { $hover } = this.props

    // Set up hover styles
    const clearHoverStyle = {}
    const hoverStyle = {}
    const style = $hover ? hoverStyle : clearHoverStyle

    return <FaMapMarker style={{ fontSize: '2rem' }} />
  }
}
