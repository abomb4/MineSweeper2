import * as React from 'react';
import Input from '../ui/Input';

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

/**
 * Mine sweeper game settings
 */
interface Settings {

  /** The size of mine area, contains width and height */
  mineAreaSize: {
    width: number,
    height: number
  };

  /** Total mines in that area, cannot greeter than mineAreaSize.width * mineAreaSize.height */
  mineCount: number;
}

interface Coordination {
  x: number;
  y: number;
}

interface MainMenuProps {

  /** Settings of this game */
  gameSettings: Settings;

  onAreaWidthChanged: (value: number) => any;
  onAreaHeightChanged: (value: number) => any;
  onMineCountChanged: (value: number) => any;
  onGameStart: () => any;
}

class MainMenu extends React.Component<MainMenuProps> {

  onAreaWidthChanged(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value || '' !== event.target.value) {
      this.props.onAreaHeightChanged(Number.parseInt(event.target.value));
    }
  }
  onAreaHeightChanged(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value || '' !== event.target.value) {
      this.props.onAreaHeightChanged(Number.parseInt(event.target.value));
    }
  }
  onMineCountChanged(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value || '' !== event.target.value) {
      this.props.onMineCountChanged(Number.parseInt(event.target.value));
    }
  }

  public render() {
    const props = this.props;

    return (
      <div className="ms-main-menu">
        <div className="ms-main-menu-item area-width">
          <Input label="Area width" inputProps={{ type: 'number', value: props.gameSettings.mineAreaSize.width, onChange: this.onAreaWidthChanged }} />
        </div>
        <div className="ms-main-menu-item area-height">
          <Input label="Area height" inputProps={{ type: 'number', value: props.gameSettings.mineAreaSize.height, onChange: this.onAreaHeightChanged }} />
        </div>
        <div className="ms-main-menu-item mine-count">
          <Input label="Mine count" inputProps={{ type: 'number', value: props.gameSettings.mineCount, onChange: this.onMineCountChanged }} />
        </div>
        <div className="ms-main-menu-item start">
          <button onClick={props.onGameStart}>Start</button>
        </div>
      </div>
    );
  }
}

/**
 * The props for MineSweeper component, defines the game states.
 */
export interface Props {

  /** Settings of this game */
  gameSettings: Settings;

  /** Total flags pointeed in this game */
  totalFlags: number;

  /** Start time of this game */
  gameStartTime: Date;

  /** Current status of this game */
  gameStatus: EnumGameStatus;

  /** Current mine area info */
  mineArea: number[][];

  // Events on main menu
  onAreaWidthChanged: (value: number) => any;
  onAreaHeightChanged: (value: number) => any;
  onMineCountChanged: (value: number) => any;
  onGameStart: () => any;

  // Events during game
  onAreaClicked(point: Coordination): any;
  onAreaRightClicked(point: Coordination): any;

  // Events on game over
  onRestartImmediately: () => any;
  onReturn: () => any;
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

    return (
      <div className="minesweeper-game">
        <div className="ms-logo-container">
          <div className="ms-logo">
            aijodioafsdaf
          </div>
        </div>
        <div className="ms-body">
          {this.renderPage(props)}
        </div>
      </div>
    );
  }

  /**
   * Detect what main component should render
   *
   * @param props Props
   */
  private renderPage(props: Props): JSX.Element {
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
  }

  /**
   * Render the Main menu component
   *
   * @param props Props
   */
  private renderMainMenu(props: Props): JSX.Element {
    return (
      <MainMenu
        gameSettings={props.gameSettings}
        onAreaWidthChanged={props.onAreaWidthChanged}
        onAreaHeightChanged={props.onAreaHeightChanged}
        onMineCountChanged={props.onMineCountChanged}
        onGameStart={props.onGameStart}
      />
    );
  }

  /**
   * Render the Game started component
   *
   * @param props Props
   */
  private renderGameStarted(props: Props): JSX.Element {
    return (<div />);
  }

  /**
   * Render the Game over component
   *
   * @param props Props
   */
  private renderGameOver(props: Props): JSX.Element {
    return (<div />);
  }
}
