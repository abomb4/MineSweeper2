import * as React from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const tuple = <T extends string[]>(...args: T) => args;
const InputSizes = tuple('small', 'default', 'large');

export interface Props {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  prefixCls?: string;
  size?: (typeof InputSizes)[number];
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

    const inputElement = <input />;
    return (
      <div className="labeled-input">
        {
          props.label
            ? <label>asasf{ inputElement }</label>
            : inputElement
        }
      </div>
    );
  }
}
