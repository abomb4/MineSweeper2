import * as React from 'react';
import { Settings } from './common';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

interface GameStartedProps {

  /** Settings of this game */
  gameSettings: Settings;

  onAreaWidthChanged: (value: number) => any;
  onAreaHeightChanged: (value: number) => any;
  onMineCountChanged: (value: number) => any;
  onGameStart: () => any;
}

export default class GameOver extends React.Component<GameStartedProps> {

  public render() {
    const props = this.props;

    return (
      <div className="ms-game-over">
        Game over.
      </div>
    );
  }
}
