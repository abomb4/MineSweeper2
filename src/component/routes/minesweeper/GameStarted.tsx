import classnames from 'classnames';
import * as React from 'react';
import Input from '../../ui/Input';
import { Area, Coordination, EnumAreaState, Settings } from './common';

interface AreaProps {
  rowIndex: number;
  columnIndex: number;
  areaData: Area;
  onAreaClicked: (point: Coordination) => any;
}

class AreaComponent extends React.Component<AreaProps> {

  public render() {
    const data = this.props.areaData;
    const cls = classnames('ms-area', {
      'is-bomb': data.isBomb,
      'opened': EnumAreaState.OPEN === data.state,
      'flagged': EnumAreaState.FLAGGED === data.state,
      'tagged': EnumAreaState.TAGGED === data.state,
      'not-opened': EnumAreaState.NOT_OPEN === data.state,
    });
    return (
    <span className={cls} onClick={this.handleClick}>
      { !data.isBomb && data.state === EnumAreaState.OPEN && data.surrounding > 0 ? data.surrounding : undefined }
    </span>
    );
  }

  private handleClick = () => {
    this.props.onAreaClicked({ x: this.props.columnIndex + 1, y: this.props.rowIndex + 1 });
  }
}

interface GameStartedProps {

  /** Settings of this game */
  gameSettings: Settings;

  /** Current mine area info */
  mineArea?: Area[][];

  onAreaClicked: (point: Coordination) => any;
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
                <div className="ms-area-column" key={`ms_area_row_${rowIndex}_col_${columnIndex}`}>
                  {<AreaComponent areaData={area} rowIndex={rowIndex} columnIndex={columnIndex} onAreaClicked={this.props.onAreaClicked} />}
                </div>
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
}
