/**
 * Function to return the percentage in string human number.
 *
 * @param percentage: number
 * @returns string
 * @example
 * ```
 * getPercentageInString(0.5)
 * // returns "50%"
 * ```
 */
export const getPercentageInString = (percentage: number): string => {
  return `${Number(percentage * 100).toFixed(0)}%`;
};
