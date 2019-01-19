import * as React from 'react';
import { Settings } from './common';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

interface MainMenuProps {

  /** Settings of this game */
  gameSettings: Settings;

  onAreaWidthChanged: (value: number) => any;
  onAreaHeightChanged: (value: number) => any;
  onMineCountChanged: (value: number) => any;
  onGameStart: () => any;
}

export default class MainMenu extends React.Component<MainMenuProps> {

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
