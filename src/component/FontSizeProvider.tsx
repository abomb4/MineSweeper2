import * as React from 'react';
import throttle from '../utils/throttle';

/**
 * 字体大小缩放比率
 */
export interface IFontSize {
  /** 字体放大倍数 */
  fontScale: number;
  /** 字体大小，当1倍时该数字为16 */
  fontSize: number;
}

const defaultFontSize = {
  fontScale: 1,
  fontSize: 16
};

/**
 * 全局的 React Context
 */
const context = React.createContext(defaultFontSize);

/** Consumer */
export const FontSizeConsumer = context.Consumer;

const defaultFontBaseWidth = 1920;

/**
 * 基于屏幕宽度的计算方法
 * 当宽度为 baseWidth 时，认为字体倍率为1（16px为基准）
 *
 * @param baseWidth 宽度基准，当屏幕宽度为此数字时认为字体为16px
 * @param minWidth  当屏幕宽度小于此值时，按此值计算；为 undefined 时按0处理
 */
export function getRelativeFontScale(baseWidth: number, minWidth?: number) {
  const html = document.querySelector('html');
  if (html) {
    const htmlWidth = html.getBoundingClientRect().width;
    const width = minWidth && minWidth > 0 && htmlWidth < minWidth
                  ? minWidth : htmlWidth;
    return width / baseWidth;
  } else {
    return 1;
  }
}

/**
 * 基于屏幕宽度的放大比率计算方法
 *
 * @param baseWidth 宽度基准，当屏幕宽度为此数字时认为字体为 1 倍
 * @param minWidth  当屏幕宽度小于此值时，按此值计算；为 undefined 时按0处理
 */
export function getRelativeFontSize(baseWidth: number, minWidth?: number) {
  return 16 * getRelativeFontScale(baseWidth, minWidth);
}

interface IState {
  fontSize: IFontSize
}
interface IProps {
  /** Resize 事件执行延迟，毫秒为单位 */
  delay?: number;
  /** 是否在窗口大小改变后更新html标签的字体大小 */
  updateRem?: boolean;
  /** 屏幕目标宽度，当屏幕宽度为该数字时为1倍缩放16px字体 */
  baseWidth?: number;
  /** 最小宽度 */
  minWidth?: number;
  children?: JSX.Element | JSX.Element[];
}

const emptyFunction: () => any = () => { return; };

let providerMounted = 0;

/**
 * 基于屏幕宽度的字体大小变化Context。
 *
 * 此类适合需要自动缩放的场景使用，如大屏展示、手机页面
 */
export default class FontSizeProvider extends React.Component<IProps, IState> {
  public state = {
    fontSize: {
      fontScale: getRelativeFontScale(defaultFontBaseWidth),
      fontSize: getRelativeFontSize(defaultFontBaseWidth),
    }
  };

  public componentDidMount() {
    if (providerMounted > 0) {
      console.error('Don\'t mount multiple FontSizeProvider component!');
    }
    providerMounted++;
    this.windowResized();
    const delay = this.props.delay ? this.props.delay : 300;
    this.throttleOnWindowResized = throttle(() => this.windowResized(), delay);
    window.addEventListener('resize', this.throttleOnWindowResized);
  }

  public componentWillUnmount() {
    providerMounted--;
    window.removeEventListener('resize', this.throttleOnWindowResized);
    this.throttleOnWindowResized = emptyFunction;
  }

  public throttleOnWindowResized: () => any = () => { return; };

  public render() {
    return (
      <context.Provider value={this.state.fontSize}>
        {this.props.children}
      </context.Provider>
    );
  }

  /**
   * 窗口resize之后的响应方法
   */
  private windowResized() {
    const baseWidth = this.props.baseWidth ? this.props.baseWidth : defaultFontBaseWidth;
    const minWidth = this.props.minWidth;
    const newFontSize = {
      fontScale: getRelativeFontScale(baseWidth, minWidth),
      fontSize: getRelativeFontSize(baseWidth, minWidth),
    };

    if (this.state.fontSize.fontSize !== newFontSize.fontSize
      && this.state.fontSize.fontScale !== newFontSize.fontScale) {
      this.updateRemIfNeed();
      this.setState({ fontSize: newFontSize });
    }
  }

  /**
   * 更新HTML标签的字体大小
   */
  private updateRemIfNeed() {
    const baseWidth = this.props.baseWidth ? this.props.baseWidth : defaultFontBaseWidth;
    const minWidth = this.props.minWidth;
    if (this.props.updateRem) {
      document.getElementsByTagName('html')[0].style.fontSize = getRelativeFontSize(baseWidth, minWidth) + 'px';
    }
  }
}
