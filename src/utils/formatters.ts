/**
 *
 * @param value The value to format
 * @param locale The locale to use for formatting
 * @param currency The currency to use for formatting
 * @returns The formatted currency
 */
export const formatCurrency = ({
  value,
  locale = "en-US",
  currency = "USD",
  fractionDigits = 2,
}: {
  value: number;
  locale?: Intl.LocalesArgument;
  currency?: string;
  fractionDigits?: number;
}): string => {
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: 2,
  }).format(value);

  return formatted;
};

/**
 * Takes a date string in the format "DD-MM-YYYY" and returns a destructured object with two properties:
 * - shortDate: a string in the format "Month DD" (e.g. "Ene 12")
 * - year: a string with the year (e.g. "2023")
 * @param dateStr The date string in the format "DD-MM-YYYY"
 * @returns A destructured object with shortDate and year properties
 */
export function formatDateParts(dateStr: string): {
  shortDate: string;
  year: string;
} {
  const [day, month, year] = dateStr.split("-");

  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const monthIndex = parseInt(month, 10) - 1;
  const shortDate = `${months[monthIndex]} ${day}`;

  return {
    shortDate,
    year,
  };
}

/**
 * Takes a Date object and returns a string in the format "YYYY-MM-DD"
 * @param date The Date object
 * @returns A string in the format "YYYY-MM-DD"
 */
export function dateToString(dateRecibed: Date): string {
  const date = new Date(dateRecibed) || new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Takes a Date object or a date string and returns a formatted date string in the format "MMM DD, YYYY"
 * @param date The Date object or date string
 * @returns A formatted date string
 */
export function formatDateToString(date?: Date | string | null): string {
  return date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";
}

/**
 * Formats a numeric string to a dollar amount string.
 * @param value The numeric string to format.
 * @returns A formatted dollar amount string.
 */
export function formatNumberToDollars(value: string): string {
  const numericValue = value.replace(/\D/g, "");

  const cents = numericValue.slice(-2);
  const dollars = numericValue.slice(0, -2) || "0";

  return `${dollars}.${cents.length === 1 ? "0" + cents : cents}`;
}
