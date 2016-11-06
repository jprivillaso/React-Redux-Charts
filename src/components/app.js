import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StoresChart from '../containers/stores-chart';
import Highcharts from 'highcharts';

export default class App extends Component {
  render() {
    return (
      <StoresChart container='.chart-container'/>
    );
  }
}
