import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Highcharts from 'highcharts';

class StoresChart extends Component {

  constructor(props) {
    super(props);
  }

  getStoresByType(stores) {

    let storesByTypes = {};
    let flattenedStores = [];

    stores.map( (actualItem) => {
      
      let type = actualItem.type;
      storesByTypes[type] = storesByTypes[type] === undefined ? 1 : storesByTypes[type] + 1;
      return actualItem; 

    });

    // Need to convert the object into array because of the structure
    // that highcharts expects
    for(let store in storesByTypes) {
      flattenedStores.push([store, storesByTypes[store]]);
    }

    return flattenedStores;

  }

  getOptions() {

    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Wallmart stores by type',
            align: 'center'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: 0,
                endAngle: 360,
                center: ['50%', '50%']
            }
        },
        exporting: {enabled: false},
        credits: {enabled: false},
        series: [{
            type: 'pie',
            name: 'Percentage of stores',
            innerSize: '50%',
            data: this.getStoresByType(this.props.stores)
        }]
    };

  }

  componentDidMount() {

    // Extend Highcharts with modules
    if (this.props.modules) {
        this.props.modules.forEach(function (module) {
            module(Highcharts);
        });
    }

    // Set container which the chart should render to.
    this.chart = new Highcharts[this.props.type || "Chart"](
        this.props.container, 
        this.getOptions()
    );

  }
  
  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
      <div id={this.props.container}></div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return {
    stores: state.stores
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoresChart);