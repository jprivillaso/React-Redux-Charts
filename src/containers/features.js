import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Features extends Component{
  
  constructor(props) {
    super(props);
  }

  getTableContent() {

    var itemNo = 0;

    return this.props.features.map((feature) => {

      return (
        <tr key={itemNo}>
          <th scope="row">{++itemNo}</th>
          <td>{feature['Store']}</td>
          <td>{feature['Date']}</td>
          <td>{feature['Temperature']}</td>
          <td>{feature['Fuel_Price']}</td>
          <td>{feature['CPI']}</td>
          <td>{feature['Unemployment']}</td>
          <td>{feature['IsHoliday']}</td>
        </tr>
      );

    });

  };

  render() {
    return (
      <div>
        <h1>Visualize all the features</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Store</th>
              <th>Date</th>
              <th>Temperature</th>
              <th>Fuel Price</th>
              <th>CPI</th>
              <th>Unemployment</th>
              <th>IsHoliday</th>
            </tr>
          </thead>
          <tbody>
            {this.getTableContent()}
          </tbody>
        </table>
      </div>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return {
    features: state.features
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Features);