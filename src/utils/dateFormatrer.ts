import { format, formatDistanceToNow } from 'date-fns';

export const userTableDateFormatter = (date: string): string => {
  return format(new Date(date), 'dd MMM yyyy');
};
export const requestTableDateFormatter = (date: string): string => {
  return format(new Date(date), ' dd MMM yyyy hh:mm aaa');
};
export const historyTableDateFormatter = (date: string): string => {
  return format(new Date(date), 'hh:mm aaa dd-MMM-yyyy ');
};
export const activityTableDateFormatter = (date: string): string => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    includeSeconds: true
  });
};

export {};
