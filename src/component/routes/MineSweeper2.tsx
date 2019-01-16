import * as React from 'react';

/**
 * Defines all game status
 */
export enum EnumGameStatus {
  /** In main menu */
  MAIN_MENU,
  /** Game started */
  STARTED,
  /** Game over by failed */
  GAME_OVER_FAILED,
  /** Game over by succeed */
  GAME_OVER_SUCCEED
}

interface Coordination {
  x: number;
  y: number;
}

/**
 * The props for MineSweeper component, defines the game states.
 */
export interface Props {
  /** The size of mine area, contains width and height */
  mineAreaSize: {
    width: number,
    height: number
  };

  /** Total mines in that area, cannot greeter than mineAreaSize.width * mineAreaSize.height */
  totalMines: number;

  /** Total flags pointeed in this game */
  totalFlags: number;

  /** Start time of this game */
  gameStartTime: Date;

  /** Current status of this game */
  gameStatus: EnumGameStatus;

  /** Current mine area info */
  mineArea: number[][];

  /** On area clicked */
  onAreaClicked(point: Coordination): any;

  /** On area right clicked */
  onAreaRightClicked(point: Coordination): any;
}

/**
 * The Game ui layout.
 * This component doesn't manage game state, so a 'controller component' is required to use this compoent.
 *
 * This component contains multiple screens:
 * 1. Main menu
 * 2. In game
 * 3. Game over
 */
export default class MineSweeper2 extends React.Component<Props> {

  /**
   * Main render method
   */
  public render() {
    const props = this.props;

    const p: JSX.Element = (() => {
      let e: JSX.Element;
      switch (props.gameStatus) {
        case EnumGameStatus.MAIN_MENU:
          e = this.renderMainMenu(props);
          break;

        case EnumGameStatus.STARTED:
          e = this.renderGameStarted(props);
          break;

        case EnumGameStatus.GAME_OVER_SUCCEED:
        case EnumGameStatus.GAME_OVER_FAILED:
          e = this.renderGameOver(props);
          break;
        default:
          throw 'Invalid props of MineSweeper2';
      }
      return e;
    })();

    return (
      <div className="minesweeper-game">{p}</div>
    );
  }

  /**
   * Render the Main menu component
   *
   * @param props Props
   */
  renderMainMenu(props: Props): JSX.Element {
    return (<div />);
  }

  /**
   * Render the Game started component
   *
   * @param props Props
   */
  renderGameStarted(props: Props): JSX.Element {
    return (<div />);
  }

  /**
   * Render the Game over component
   *
   * @param props Props
   */
  renderGameOver(props: Props): JSX.Element {
    return (<div />);
  }
}
