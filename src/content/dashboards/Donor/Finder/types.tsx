import { Dayjs } from 'dayjs';

export interface FormValues {
  date: Dayjs;
  blood: string;
}

export interface FindDonorFromTypes {
  findDonor: (data: any) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
}
