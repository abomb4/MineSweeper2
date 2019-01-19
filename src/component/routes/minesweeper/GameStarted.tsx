import classnames from 'classnames';
import * as React from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { Area, EnumAreaState, Settings } from './common';

interface GameStartedProps {

  /** Settings of this game */
  gameSettings: Settings;

  /** Current mine area info */
  mineArea?: Area[][];

  onAreaWidthChanged: (value: number) => any;
  onAreaHeightChanged: (value: number) => any;
  onMineCountChanged: (value: number) => any;
  onGameStart: () => any;
}

export default class GameStarted extends React.Component<GameStartedProps> {

  constructor(props: GameStartedProps) {
    super(props);
    this.onAreaWidthChanged.bind(this);
    this.onAreaHeightChanged.bind(this);
    this.onMineCountChanged.bind(this);
  }

  public render() {
    const props = this.props;
    const mineArea = props.mineArea;
    if (!mineArea) {
      throw new Error('Controller had not pass mineArea data array');
    }

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
          {
            mineArea.map((rowArray, rowIndex) => {
              const columns = rowArray.map((area, columnIndex) => (
                <div className="ms-area-column" key={`ms_area_row_${rowIndex}_col_${columnIndex}`}>{this.resolveAreaData(area)}</div>
              ));
              return (<div className="ms-area-row" key={'ms_area_row_' + rowIndex}>{columns}</div>);
            })
          }
        </div>
      </div>
    );
  }

  private onAreaWidthChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value || '' !== event.target.value) {
      this.props.onAreaWidthChanged(Number.parseInt(event.target.value, 10));
    }
  }
  private onAreaHeightChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value || '' !== event.target.value) {
      this.props.onAreaHeightChanged(Number.parseInt(event.target.value, 10));
    }
  }
  private onMineCountChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value || '' !== event.target.value) {
      this.props.onMineCountChanged(Number.parseInt(event.target.value, 10));
    }
  }

  private resolveAreaData: (data: Area) => JSX.Element = (data: Area) => {
    const cls = classnames('ms-area', {
      'is-bomb': data.isBomb,
      'opened': EnumAreaState.OPEN === data.state,
      'flagged': EnumAreaState.FLAGGED === data.state,
      'tagged': EnumAreaState.TAGGED === data.state,
      'not-opened': EnumAreaState.NOT_OPEN === data.state,
    });
    return (<span className={cls}/>);
  }
}
