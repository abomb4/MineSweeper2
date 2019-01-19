import * as React from 'react';
import './Input.scss';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const tuple = <T extends string[]>(...args: T) => args;
const InputSizes = tuple('small', 'default', 'large');

export interface Props {
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;
  prefixCls?: string;
  size?: (typeof InputSizes)[number];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  labeled?: boolean;
  label?: string;
}

/**
 * Input with label
 */
export default class Input extends React.Component<Props> {

  public render() {
    const props = this.props;

    const inputElement = <input onChange={this.props.onChange} {...props.inputProps}/>;
    return (
      <div className="ui-input">
        {props.label ? <label>{props.label}</label> : null }
        {inputElement}
      </div>
    );
  }
}
