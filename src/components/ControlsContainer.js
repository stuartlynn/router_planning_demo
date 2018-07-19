import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, RadioButton} from '@carto/airship';
import styled from 'styled-components'

const ControlsOuter = styled.div`
  position:absolute;
  top: 20px;
  right: 20px;
  background-color: white;
  box-sizing: broder-box;
  padding: 20px
  width: 200px;
  height: 100px;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-items: space-between;
`

class ControlsContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ControlsOuter>
        <RadioButton.Group
          onChange={selected => this.props.onAddTypeChange(selected)}
          name="addType">
          <RadioButton value="origin">Add Origin</RadioButton>
          <RadioButton value="destination">Add Destination</RadioButton>
        </RadioButton.Group>
        <Button onClick={this.props.onRun}>Run</Button>
      </ControlsOuter>
    );
  }
}

export default ControlsContainer;
