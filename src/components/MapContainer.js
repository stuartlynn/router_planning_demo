import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import {Map, TileLayer, Marker, Popup, Polyline} from 'react-leaflet';
import {Icon} from 'leaflet';

const MapOuter = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
`;

const originIcon= new Icon({
  iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-orange-small.png',
  shadowUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-orange-small.png',

  iconSize: [50, 50], // size of the icon
  shadowSize: [50, 50], // size of the shadow
  iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
  shadowAnchor: [25, 25], // the same for the shadow
});

const destIcon= new Icon({

  iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red-small.png',
  shadowUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-red-small.png',

  iconSize: [50, 50], // size of the icon
  shadowSize: [50, 50], // size of the shadow
  iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
  shadowAnchor: [25, 25], // the same for the shadow
});

class MapContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    origins: PropTypes.array,
    destinations: PropTypes.array,
  };

  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MapOuter>
        <Map
          onClick={this.props.onAddMarker}
          style={{width: '100%', height: '100%'}}
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          {this.props.destinations.map((dest, index) => (
            <Marker
              icon = {destIcon}
              key={`dest_${index}`}
              style={{zIndex: 21}}
              position={[dest.lat, dest.lng]}
            />
          ))}

          {this.props.origins.map((origin, index) => (
            <Marker
              icon = {originIcon}
              key={`origin_${index}`}
              style={{zIndex: 21}}
              position={[origin.lat, origin.lng]}
            />
          ))}

          {this.props.lines.map((line, index) => (
            <Polyline
              key={`poly_line_${index}`}
              positions={line}
              stroke
              color='red'
              weight={2}
            />
          ))}
        </Map>
      </MapOuter>
    );
  }
}

export default MapContainer;
