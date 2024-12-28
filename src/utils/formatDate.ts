import { format } from "date-fns";

export const formateDate = (publishedAt: string) => {
  const date = new Date(publishedAt);
  return format(date, "do MMM, yyyy"); // Example: 28th Dec, 2024
};
