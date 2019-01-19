import * as React from 'react';
import Input from '../ui/Input';
import './MineSweeper2.scss';
import Button from '../ui/Button';

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

  constructor(props: MainMenuProps) {
    super(props);
    this.onAreaWidthChanged.bind(this);
    this.onAreaHeightChanged.bind(this);
    this.onMineCountChanged.bind(this);
  }

  onAreaWidthChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value || '' !== event.target.value) {
      this.props.onAreaWidthChanged(Number.parseInt(event.target.value));
    }
  }
  onAreaHeightChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value || '' !== event.target.value) {
      this.props.onAreaHeightChanged(Number.parseInt(event.target.value));
    }
  }
  onMineCountChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          <Button type="primary" onClick={props.onGameStart}>Start</Button>
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
  totalFlags?: number;

  /** Start time of this game */
  gameStartTime?: Date;

  /** Current status of this game */
  gameStatus: EnumGameStatus;

  /** Current mine area info */
  mineArea?: number[][];

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
          </div>
          <span>Mine Sweeper Game</span>
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
        e = (<MainMenu
            gameSettings={props.gameSettings}
            onAreaWidthChanged={props.onAreaWidthChanged}
            onAreaHeightChanged={props.onAreaHeightChanged}
            onMineCountChanged={props.onMineCountChanged}
            onGameStart={props.onGameStart}
        />);
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
   * Render the Game started component
   *
   * @param props Props
   */
  private renderGameStarted(props: Props): JSX.Element {
    return (
      <div className="ms-game-started">
        <div className="ms-game-state">
          <div className="ms-mine-remaining">
            <Input labeled={true} label="剩余地雷" />
          </div>
          <div className="ms-duration">
            <Input labeled={true} label="开始时间" />
          </div>
        </div>
        <div className="ms-game-area">
          <div className="ms-area-row">
            <div className="ms-area-column">
              <div className="ms-mine">X</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render the Game over component
   *
   * @param props Props
   */
  private renderGameOver(props: Props): JSX.Element {
    return (
      <div className="ms-game-over">
        Game over.
      </div>
    );
  }
}
