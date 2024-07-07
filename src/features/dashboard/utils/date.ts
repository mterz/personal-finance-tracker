import { format } from "date-fns";

/**
 * 
 * @param date ISO date string
 */
export function formatDate(date: string) {
  return format(new Date(date), "PP")
}