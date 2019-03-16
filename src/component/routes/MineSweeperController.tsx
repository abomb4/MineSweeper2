import * as React from 'react';

import { settings } from 'cluster';
import { Area, Coordination, EnumAreaState, Settings } from './minesweeper/common';
import { EnumGameStatus } from './minesweeper/common';
import MineSweeper from './minesweeper/MineSweeper';
import { safeGet, safeDoubleGet } from '../../utils/array';
import { Optional, empty, of } from '../../utils/optional';

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
  mineArea: Area[][];

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
      areaInited: false,
      mineArea: []
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
  // =-=-=-=-=-=- Events on main menu -=-=-=-=-=-=

  /** Called when Area Width changed */
  private onAreaWidthChanged: (value: number) => any = (value: number) => {
    if (value >= MIN_AREA_WIDTH) {
      const gameSettings = Object.assign({}, this.state.gameSettings);
      gameSettings.mineAreaSize.width = value;
      this.setState({
        gameSettings
      });
    }
  }

  /** Called when Area height changed */
  private onAreaHeightChanged: (value: number) => any = (value: number) => {
    if (value >= MIN_AREA_HEIGHT) {
      const gameSettings = Object.assign({}, this.state.gameSettings);
      gameSettings.mineAreaSize.height = value;
      this.setState({
        gameSettings
      });
    }
  }
  /** Called when Area mine count changed */
  private onMineCountChanged: (value: number) => any = (value: number) => {
    if (value >= MIN_MINE_COUNT) {
      const gameSettings = Object.assign({}, this.state.gameSettings);
      gameSettings.mineCount = value;
      this.setState({
        gameSettings
      });
    }
  }

  /** Called on game start */
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

  // =-=-=-=-=-=- Events on game over -=-=-=-=-=-=
  /** Restart the game immediately, clear every state */
  private onRestartImmediately: () => any = () => {
    this.onGameStart();
  }

  /** Back to main menu */
  private onReturn: () => any = () => {
    this.setState({
      gameStatus: EnumGameStatus.MAIN_MENU,
      gameStartTime: undefined,
      totalFlags: 0,
      mineArea: []
    });
  }

  // =-=-=-=-=-=- Events during game -=-=-=-=-=-=
  /** Area clicked */
  private onAreaClicked: (point: Coordination) => void = (point: Coordination) => {
    if (!this.checkPointValid(point)) {
      return;
    }
    let areaArray: Area[][] = Object.assign([], this.state.mineArea);

    // If flagged or opened, do nothing
    switch (this.getAreaElement(areaArray, point).state) {
      case EnumAreaState.FLAGGED:
      case EnumAreaState.OPEN:
        return;
      default: break;
    }

    // Init first
    if (!this.state.areaInited) {
      areaArray = this.createFilledMineAreaArray(this.state, point);
      this.getAreaElement(areaArray, point).state = EnumAreaState.OPEN;
      this.setState({
        areaInited: true,
        mineArea: areaArray
      });
      return;
    }

    // Active
    const areaPoint = this.getAreaElement(areaArray, point);
    areaPoint.state = EnumAreaState.OPEN;
    if (areaPoint.isBomb) {
      this.setState({
        gameStatus: EnumGameStatus.GAME_OVER_FAILED,
        mineArea: areaArray
      });
    } else {
      // TODO Check we won

      const surrondingCount = areaPoint.surrounding;
      if (surrondingCount === 0) {
        // TODO Click surrounded areas
      }
      this.setState({
        mineArea: areaArray
      });
    }
  }

  /** Area right clicked */
  private onAreaRightClicked: (point: Coordination) => any = (point: Coordination) => {
    if (!this.checkPointValid(point)) {
      return;
    }
    const { x, y } = point;
  }

  // =-=-=-=-=-=-=-=-=-=-=- Private Functions -=-=-=-=-=-=-=-=-=-=-=-=
  private checkPointValid(point: Coordination): boolean {
    const { x, y } = point;
    if (x <= 0 || x > this.state.gameSettings.mineAreaSize.width) {
      console.log(`Coordinate ${point} x is invalid`);
      return false;
    }
    if (y <= 0 || y > this.state.gameSettings.mineAreaSize.height) {
      console.log(`Coordinate ${point} y is invalid`);
      return true;
    }
    return true;
  }

  /**
   * Get specific area element by coordination
   *
   * @param areaArray Area array
   * @param point     The coordination of point, x and y starts with 1
   */
  private getAreaElement(areaArray: Area[][], point: Coordination): Area {
    const { x, y } = point;
    if (!this.checkPointValid(point)) {
      throw new Error(`point ${point} is invalid`);
    }
    return areaArray[y - 1][x - 1];
  }

  private showWarning = (text: string) => {
    alert(text);
  }

  private createEmptyArea = () => {
    return {
      isBomb: false,
      surrounding: 0,
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
      for (let row = 0; row < width; ++row) {
        areaArray[column][row] = this.createEmptyArea();
      }
    }

    return areaArray;
  }

  /**
   * Create mine-filled area array.
   *
   * How much mines suurrounding also provided.
   */
  private createFilledMineAreaArray = (state: Readonly<State>, clicked: Coordination) => {

    const { height, width } = state.gameSettings.mineAreaSize;

    const areaArray = this.createMineAreaArray(state);
    const index1 = clicked.y - 1;
    const index2 = clicked.x - 1;
    areaArray[index1][index2].isBomb = true;

    let tmpMineCount = state.gameSettings.mineCount;
    while (tmpMineCount > 0) {
      tmpMineCount = tmpMineCount - 1;
      let i1: number;
      let i2: number;
      do {
        i1 = Math.round(Math.random() * (height - 1));
        i2 = Math.round(Math.random() * (width - 1));
      } while (areaArray[i1][i2].isBomb);

      areaArray[i1][i2].isBomb = true;
      safeDoubleGet(areaArray, i1 - 1, i2 - 1).ifPresent(area => area.surrounding += 1);
      safeDoubleGet(areaArray, i1 - 1, i2    ).ifPresent(area => area.surrounding += 1);
      safeDoubleGet(areaArray, i1 - 1, i2 + 1).ifPresent(area => area.surrounding += 1);
      safeDoubleGet(areaArray, i1 + 1, i2 - 1).ifPresent(area => area.surrounding += 1);
      safeDoubleGet(areaArray, i1 + 1, i2    ).ifPresent(area => area.surrounding += 1);
      safeDoubleGet(areaArray, i1 + 1, i2 + 1).ifPresent(area => area.surrounding += 1);
      safeDoubleGet(areaArray, i1, i2 - 1).ifPresent(area => area.surrounding += 1);
      safeDoubleGet(areaArray, i1, i2 + 1).ifPresent(area => area.surrounding += 1);
    }

    areaArray[index1][index2].isBomb = false;
    return areaArray;
  }
}
