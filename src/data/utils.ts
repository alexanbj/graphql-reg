import { format } from 'date-fns';

export function dateAsString(date?: string) {
  // If we don't get passed a date <= Date.now();
  const actualDate = date ? new Date(date) : new Date();
  return format(actualDate, 'MM-DD-YYYY');
}
