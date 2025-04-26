const MONTHS = [
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
const FULL_MONTHS = [
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
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const formatDisplayDate = (dateString) => {
  const date = new Date(dateString);
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
};

export const formatFullDate = (date) => {
  return `${DAYS[date.getDay()]}, ${
    FULL_MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};

// Formats date as DD.MM.YYYY
export const formatSimpleDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
