const MONTHS: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const FULL_MONTHS: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Formats a date string to a short display format (e.g., "Jan 15")
 * @param dateString - ISO date string to format
 * @returns Formatted date string
 */
export const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
};

/**
 * Formats a date to a full display format (e.g., "Monday, January 15, 2024")
 * @param date - Date object to format
 * @returns Formatted date string
 */
export const formatFullDate = (date: Date): string => {
  return `${DAYS[date.getDay()]}, ${
    FULL_MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};

/**
 * Formats a date string to DD.MM.YYYY format
 * @param dateString - ISO date string to format
 * @returns Formatted date string
 */
export const formatSimpleDate = (dateString: string | null): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
