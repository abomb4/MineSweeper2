
/**
 * 节流执行器，高阶函数，用于在指定延迟时间内，对多次触发的事件，只触发最后一次的需求。
 *
 * 例如：
 * ```
 * const func1 = () => { console.log('DA!!!!!!!!!!'); };
 * const fun = throttle(func1, 300);
 * let i = 100;
 * while (i-- > 0) {
 *     fun();
 * }
 * ```
 * 这段代码只会在300ms后调用func1一次，而不是100次。
 *
 * @param fn 真正的函数
 * @param delay 延迟时间
 * @returns 与原函数相同，只是增加了延迟
 */
const throttle = (fn: () => any, delay: number) => {
  let timer: NodeJS.Timeout;
  return function (this: any) {
    const context = this;
    const [args] = Array.from(arguments)
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

export default throttle;
