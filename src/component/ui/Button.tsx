import * as React from 'react';
import './Button.scss';
import classNames from 'classnames';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const tuple = <T extends string[]>(...args: T) => args;

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'primary' | 'normal' | 'danger' | 'warning';
}

/**
 * Button with label
 */
export default class Button extends React.Component<Props> {

  public render() {
    const props = this.props;
    return (
      <button className={classNames('ui-button', props.className, {
        'primary': props.type === 'primary',
        'danger': props.type === 'danger',
        'warning': props.type === 'warning',
        'normal': !props.type || props.type === 'normal',
      })} {...props} />
    );
  }
}
