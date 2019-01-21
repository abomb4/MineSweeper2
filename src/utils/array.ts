import { empty, of, Optional } from './optional';

/**
 * Get if index is valid
 *
 * @param arr Target array
 * @param index Index
 * @returns Optional.None if index is out of range or data is undefined
 */
export function safeGet<T>(arr: T[], index: number): Optional<T> {

  if (index < 0 || index >= arr.length) {
    return empty();
  }
  return of(arr[index]);
}

/**
 * Get if two index is valid
 *
 * @param arr Target array
 * @param index1 Index 1
 * @param index2 Index 2
 * @returns Optional.None if index is out of range or data is undefined
 */
export function safeDoubleGet<T>(arr: T[][], index1: number, index2: number): Optional<T> {

  if (index1 < 0 || index1 >= arr.length) {
    return empty();
  }
  return of(arr[index1]).map((subArr: T[]) => {
    if (index2 < 0 || index2 >= subArr.length) {
      return undefined;
    }
    return subArr[index2];
  });
}
