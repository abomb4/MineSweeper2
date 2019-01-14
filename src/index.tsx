import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import FontSizeProvider from './component/FontSizeProvider';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

// Init history
const history = createBrowserHistory();

// Redux
const reducers = combineReducers({
  router: connectRouter(history)
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(
    sagaMiddleware,
    routerMiddleware(history)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <FontSizeProvider updateRem={true} delay={1000} baseWidth={1280}>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </FontSizeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
