import * as React from 'react';

import { settings } from 'cluster';
import { Area, Coordination, EnumAreaState, Settings } from './minesweeper/common';
import { EnumGameStatus } from './minesweeper/common';
import MineSweeper from './minesweeper/MineSweeper';

interface State {

  /** Settings of this game */
  gameSettings: Settings;

  /** Total flags pointeed in this game */
  totalFlags?: number;

  /** Start time of this game */
  gameStartTime?: Date;

  /** Current status of this game */
  gameStatus: EnumGameStatus;

  /** Current mine area info */
  mineArea?: Area[][];

  /** The area was not inited before first clicked */
  areaInited: boolean;
}

const MIN_AREA_WIDTH = 8;
const MIN_AREA_HEIGHT = 8;
const MIN_MINE_COUNT = 1;

/**
 * Controller component of MineSweeper game.
 *
 * This component uses privare component level state, not Redux.
 */
export default class MineSweeperController extends React.Component<any, State> {

  constructor(props: void) {
    super(props);
    this.createMineAreaArray.bind(this);
    this.state = {
      gameSettings: {
        mineAreaSize: {
          height: 9,
          width: 9
        },
        mineCount: 9
      },
      gameStatus: EnumGameStatus.MAIN_MENU,
      totalFlags: 0,
      areaInited: false
    };
  }

  public render() {
    return (
      <MineSweeper {...this.state}
        onAreaClicked={this.onAreaClicked}
        onAreaHeightChanged={this.onAreaHeightChanged}
        onAreaRightClicked={this.onAreaRightClicked}
        onAreaWidthChanged={this.onAreaWidthChanged}
        onGameStart={this.onGameStart}
        onMineCountChanged={this.onMineCountChanged}
        onRestartImmediately={this.onRestartImmediately}
        onReturn={this.onReturn}
      />
    );
  }

  // =-=-=-=-=-=-=-=-=-=- Event Bindings -=-=-=-=-=-=-=-=-=-=-=
  // Events on main menu
  private onAreaWidthChanged: (value: number) => any = (value: number) => {
    if (value >= MIN_AREA_WIDTH) {
      const gameSettings = Object.assign({}, this.state.gameSettings);
      gameSettings.mineAreaSize.width = value;
      this.setState({
        gameSettings
      });
    }
  }
  private onAreaHeightChanged: (value: number) => any = (value: number) => {
    if (value >= MIN_AREA_HEIGHT) {
      const gameSettings = Object.assign({}, this.state.gameSettings);
      gameSettings.mineAreaSize.height = value;
      this.setState({
        gameSettings
      });
    }
  }
  private onMineCountChanged: (value: number) => any = (value: number) => {
    if (value >= MIN_MINE_COUNT) {
      const gameSettings = Object.assign({}, this.state.gameSettings);
      gameSettings.mineCount = value;
      this.setState({
        gameSettings
      });
    }
  }

  private onGameStart: () => any = () => {
    // Check game settings
    const gameSettings = this.state.gameSettings;
    const { width, height } = gameSettings.mineAreaSize;
    const { mineCount } = gameSettings;
    if (mineCount >= width * height) {
      // Too may mine
      this.showWarning('Too may mines');
      return;
    }

    this.setState({
      gameStatus: EnumGameStatus.STARTED,
      areaInited: false,
      mineArea: this.createMineAreaArray(this.state)
    });
  }

  // Events on game over
  private onRestartImmediately: () => any = () => {
    this.onGameStart();
  }

  private onReturn: () => any = () => {
    this.setState({
      gameStatus: EnumGameStatus.MAIN_MENU,
      gameStartTime: undefined,
      totalFlags: 0,
      mineArea: undefined
    });
  }

  // Events during game
  private onAreaClicked: (point: Coordination) => any = (point: Coordination) => {
    const { x, y } = point;
    if (x <= 0 || x >= this.state.gameSettings.mineAreaSize.width) {
      console.log(`Coordinate ${point} x is invalid`);
      return;
    }
    if (y <= 0 || y >= this.state.gameSettings.mineAreaSize.height) {
      console.log(`Coordinate ${point} y is invalid`);
      return;
    }
    if (this.state.areaInited) {
    } else {
      const areaArray = this.createFilledMineAreaArray(this.state, point);
      areaArray[point.y - 1][point.x - 1].state = EnumAreaState.OPEN;
      this.setState({
        areaInited: true,
        mineArea: areaArray
      });
    }
  }

  private onAreaRightClicked: (point: Coordination) => any = (point: Coordination) => {
  }

  // =-=-=-=-=-=-=-=-=-=-=- Functions -=-=-=-=-=-=-=-=-=-=-=-=
  private showWarning = (text: string) => {
    alert(text);
  }


  private createEmptyArea = () => {
    return {
      isBomb: false,
      state: EnumAreaState.NOT_OPEN
    };
  }

  /**
   * width * height
   * (x, y)
   * +-+-+-+-+-+-+-+-+-+-+-> width
   * | (1,1) (1,2) (1.3)
   * | (2,1) (2,2) (2.3)
   * v
   * height
   */
  private createMineAreaArray = (state: Readonly<State>) => {

    const { height, width } = state.gameSettings.mineAreaSize;

    const areaArray = new Array<Area[]>(height);
    for (let column = 0; column < areaArray.length; column++) {
      areaArray[column] = new Array(width);
      areaArray[column].fill(this.createEmptyArea());
    }

    return areaArray;
  }

  private createFilledMineAreaArray = (state: Readonly<State>, clicked: Coordination) => {

    const { height, width } = state.gameSettings.mineAreaSize;

    const areaArray = this.createMineAreaArray(state);
    areaArray[clicked.y - 1][clicked.x - 1].isBomb = true;

    let tmpMineCount = state.gameSettings.mineCount;
    while (tmpMineCount--) {
      let index1: number;
      let index2: number;
      do {
        index1 = Math.round(Math.random() * height);
        index2 = Math.round(Math.random() * width);
      } while (areaArray[index1][index2].isBomb);
      areaArray[index1][index2].isBomb = true;
    }

    areaArray[clicked.y][clicked.x].isBomb = false;
    return areaArray;
  }
}
