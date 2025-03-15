export const parseToDate = (dateAsString: string): Date | undefined => {
  const date = new Date(dateAsString);

  if (date.toJSON() === null) {
    return;
  }

  return date;
};

/**
 * @param date
 * @returns date formatted without time
 * @example
 * ```
 *  getDataFormatted(new Date(2025, 10, 15))
 *  // returns '2025-10-15'
 * ```
 */
export const getDataFormatted = (date: Date): string => {
  return date.toJSON().split('T')[0];
};

export const isSameDate = (date_1: Date, date_2: Date) => {
  return getDataFormatted(date_1) === getDataFormatted(date_2);
};
