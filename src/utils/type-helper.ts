/*
 * TypeScript 类型辅助类，包含一些好用（？）的方法和类型
 */


/**
 * 推断类型，可以推断出多个相同类型的变量
 */
export type InferType<T> = T extends (infer U) ? U : T;

/**
 * 若某原始值空（undefined, null）则返回默认值，不为空则返回原始值
 *
 * @param obj          原始值
 * @param defaultValue 默认值
 * @returns obj ? obj : defaultValue
 */
export const getOrDefault: <T> (obj: InferType<T> | undefined | null, defaultValue: InferType<T>) => InferType<T> =
  (obj, def) => obj ? obj : def;
