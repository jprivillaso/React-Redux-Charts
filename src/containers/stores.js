import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Highcharts from 'highcharts';

class Stores extends Component {

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

  getStoresData() {

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

  getCategoriesAndData(features) {

    let uniqueCategories = new Set();
    let data = new Map();
    
    let result = new Array();
    let categories = new Array();

    features.map((featureItem) => {
      
      var category = 'Store ' + featureItem['Store'];
      uniqueCategories.add(category);
      
      if (!data[category]) data[category] = [];
      data[category].push(featureItem['Fuel_Price']);

    });

    let categoryValues = uniqueCategories.values();

    for (let store in data) {

      let currentSum = data[store].reduce((prev, next) => {
        return prev + next;
      });

      categories.push(categoryValues.next().value);
      result.push(currentSum / data[store].length);

    }

    return {
      categories: categories,
      data: result
    };

  }

  getSalesData() {

    let data = this.getCategoriesAndData(this.props.features);

    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Sales Average By Store'
        },
        xAxis: {
            categories: data.categories
        },
        tooltip: {
          pointFormat: 'Value: <b>{point.y:,.2f}</b>',
          shared: true
        },
        credits: {
            enabled: false
        },
        series: [{
          name: 'Average Data',
          data: data.data
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
    this.storesChart = new Highcharts[this.props.type || "Chart"](
        'storesChart-container', 
        this.getStoresData()
    );

    this.salesChart = new Highcharts[this.props.type || "Chart"](
        'salesChart-container', 
        this.getSalesData()
    );

  }
  
  componentWillUnmount() {
    this.storesChart.destroy();
    this.salesChart.destroy();
  }

  render() {
    return (
      <div>
        <div id='storesChart-container'></div>
        <div id='salesChart-container'></div>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return {
    stores: state.stores,
    features: state.features
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stores);