import React from 'react'
import NavLink from './navLink'

export default React.createClass({
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <ul className="nav navbar-nav">
                <li><NavLink to="/">Wallmart Sellings</NavLink></li>
              </ul>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><NavLink to="/features">Features</NavLink></li>
                <li><NavLink to="/stores">Stores</NavLink></li>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
})
