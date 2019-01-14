import * as React from 'react';
import { FontSizeConsumer } from './component/FontSizeProvider';

import './App.scss';
import logo from './logo.svg';
import './reset.scss';

class App extends React.Component {
  public render() {
    return (
      <FontSizeConsumer>
        {fontSize =>
          <div className="App" style={{ zoom: fontSize.fontScale }}>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
          </div>
        }
      </FontSizeConsumer>
    );
  }
}

export default (App);
