import { Optional } from '../../../utils/optional';

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
export interface Settings {

  /** The size of mine area, contains width and height */
  mineAreaSize: {
    width: number,
    height: number
  };

  /** Total mines in that area, cannot greeter than mineAreaSize.width * mineAreaSize.height */
  mineCount: number;
}

/**
 * Coordination interface, x and y starts with 1, not 0
 */
export interface Coordination {
  x: number;
  y: number;
}

export class IntegerCoordination implements Coordination {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

}

/** State of an area */
export enum EnumAreaState {
  /** Not opened */
  NOT_OPEN,
  /** Opened */
  OPEN,
  /** Flag placed */
  FLAGGED,
  /** Tagged */
  TAGGED
}

export interface Area {
  isBomb: boolean;
  surrounding: number;
  state: EnumAreaState;
}
