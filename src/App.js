import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ControlsContainer from './components/ControlsContainer';
import MapContainer from './components/MapContainer';
import ResultsContainer from './components/ResultsContainer';

class App extends Component {
  state = {
    origins: [],
    destinations: [],
    processing: false,
    result:{},
    addType: 'origin ',
    apiKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjUwOTcxMGY2YmUxOTFiZjYwN2FkNWEiLCJpYXQiOjE1MzIwMDgyMDh9.lMGLJuMTzN2conBHEUWABmKUKm0bbzG5uc_KqAKOcvk',
  };

  setAddType(type) {
    console.log('changing type ', type);
    this.setState({
      addType: type,
    });
  }
  destinationsToOrders() {
    return this.state.destinations.reduce((r, d, i) => {
      const name = `order_${i}`;
      const location = {
        location: {
          name,
          lat: d.lat,
          lng: d.lng,
        },
        duration: 5 + Math.floor(Math.random() * 10),
      };
      return {
        ...r,
        [name]: location,
      };
    }, {});
  }

  originsToFleet() {
    return this.state.origins.reduce((r, o, i) => {
      const name = `vehicle_${i}`;
      const location = {
        start_location: {
          id: `depot_${i}`,
          name,
          lat: o.lat,
          lng: o.lng,
        },
        duration: 5 + Math.floor(Math.random() * 10),
      };
      return {
        ...r,
        [name]: location,
      };
    }, {});
  }

  runOpt() {
    this.setState({processing: true});

    const data = {
      visits: this.destinationsToOrders(),
      fleet: this.originsToFleet(),
    };
    console.log('payload is ', data);

    fetch('https://api.routific.com/v1/vrp', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${this.state.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(r => r.json())
      .then(result => this.setState({result: result}));
  }
  addMarker(location) {
    console.log('adding marker');
    if (this.state.addType == 'origin') {
      this.setState({origins: [...this.state.origins, location.latlng]});
    } else if (this.state.addType == 'destination') {
      this.setState({
        destinations: [...this.state.destinations, location.latlng],
      });
    }
  }

  render() {
    return (
      <div className="App">
        <MapContainer
          onAddMarker={this.addMarker.bind(this)}
          origins={this.state.origins}
          destinations={this.state.destinations}
        />
        <ControlsContainer
          onAddTypeChange={this.setAddType.bind(this)}
          addType={this.state.addType}
          onRun={this.runOpt.bind(this)}
        />
        <ResultsContainer results={this.state.result} />
      </div>
    );
  }
}

export default App;
