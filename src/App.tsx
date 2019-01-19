import * as React from 'react';
import { FontSizeConsumer } from './component/FontSizeProvider';

import MineSweeper from './component/routes/MineSweeperController';

import './App.scss';
import './styles/base.scss';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <MineSweeper />
      </div>
    );
  }
}

export default (App);
