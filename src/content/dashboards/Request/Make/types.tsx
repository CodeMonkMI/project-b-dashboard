import { Dayjs } from 'dayjs';

export interface SingleRole {
  id: string;
  name: string;
  role: string;
}

export interface FormValues {
  phoneNo: string;
  date: Dayjs;
  reason: string;
  address: string;
  blood: string;
  firstName: string;
  lastName: string;
  email: string;
}
