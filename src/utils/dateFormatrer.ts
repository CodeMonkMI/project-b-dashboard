import { format } from 'date-fns';

export const userTableDateFormatter = (date: string): string => {
  return format(new Date(date), 'dd MMM yyyy');
};
export const requestTableDateFormatter = (date: string): string => {
  return format(new Date(date), ' dd MMM yyyy hh:mm aaa');
};
export const historyTableDateFormatter = (date: string): string => {
  return format(new Date(date), 'hh:mm aaa dd-MMM-yyyy ');
};

export {};
