import * as React from 'react';
import { Area, Coordination, EnumGameStatus, Settings } from './common';
import GameOver from './GameOver';
import GameStarted from './GameStarted';
import MainMenu from './MainMenu';
import './MineSweeper.scss';

/**
 * The props for MineSweeper component, defines the game states.
 */
export declare interface Props {

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

  // Events on main menu
  onAreaWidthChanged: (value: number) => any;
  onAreaHeightChanged: (value: number) => any;
  onMineCountChanged: (value: number) => any;
  onGameStart: () => any;

  // Events on game over
  onRestartImmediately: () => any;
  onReturn: () => any;

  // Events during game
  onAreaClicked(point: Coordination): any;
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
export default class MineSweeper extends React.Component<Props> {

  /**
   * Main render method
   */
  public render() {
    const props = this.props;

    return (
      <div className="minesweeper-game">
        <div className="ms-logo-container">
          <div className="ms-logo">
            (FakeLogo)
          </div>
          <span>The Mine Sweeper Game</span>
        </div>
        <div className="ms-body">
          {this.renderBody(props)}
        </div>
      </div>
    );
  }

  /**
   * Detect what main component should render
   *
   * @param props Props
   */
  private renderBody(props: Props): JSX.Element {
    switch (props.gameStatus) {
      case EnumGameStatus.MAIN_MENU:
        // Render Main menu
        return (<MainMenu
          gameSettings={props.gameSettings}
          onAreaWidthChanged={props.onAreaWidthChanged}
          onAreaHeightChanged={props.onAreaHeightChanged}
          onMineCountChanged={props.onMineCountChanged}
          onGameStart={props.onGameStart}
        />);

      case EnumGameStatus.STARTED:
        // Render game started
        return (<GameStarted {...props} />);

      case EnumGameStatus.GAME_OVER_SUCCEED:
      case EnumGameStatus.GAME_OVER_FAILED:
        // Render game over
        return (<GameOver {...props} />);

      default:
        throw new Error('Invalid props of MineSweeper2');
    }
  }
}
