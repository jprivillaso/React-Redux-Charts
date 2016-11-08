import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Components
import App from './components/app';
import Features from './components/features';
import Stores from './containers/stores';
import Home from './components/home';

// Reducers
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

render((
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={ browserHistory }>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/stores" component={Stores}/>
        <Route path="/features" component={Features}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))