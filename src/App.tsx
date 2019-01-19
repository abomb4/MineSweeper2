import * as React from 'react';
import { FontSizeConsumer } from './component/FontSizeProvider';

import './App.scss';
import './styles/base.scss';
import MineSweeper2, { EnumGameStatus } from './component/routes/MineSweeper2';

class App extends React.Component {
  public render() {
    return (
      <FontSizeConsumer>
        {fontSize =>
          <div className="App">
            <MineSweeper2
              gameSettings={{mineAreaSize: {height: 9, width: 9}, mineCount: 9}}
              gameStartTime={new Date(Date.now())}
              gameStatus={EnumGameStatus.MAIN_MENU}
              mineArea={[]}
              onAreaClicked={() => { }}
              onAreaRightClicked={() => { }}
              onAreaHeightChanged={() => { }}
              onAreaWidthChanged={() => { }}
              onGameStart={() => { }}
              onMineCountChanged={() => { }}
              onRestartImmediately={() => { }}
              onReturn={() => { }}
              totalFlags={0}
            />
          </div>
        }
      </FontSizeConsumer>
    );
  }
}

export default (App);
