import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import styled from 'styled-components';

const ResultsOuter = styled.div`
  position: absolute;
  right: 20px;
  top: 200px;
  z-index: 100;
  width: 500px;
  height: 400px;
  overflow-y: scroll;
  background-color: white;
`;

class ResultsContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ResultsOuter>
        <ReactJson src={this.props.results} />
      </ResultsOuter>
    );
  }
}

export default ResultsContainer;
