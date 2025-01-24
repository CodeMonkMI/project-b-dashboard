import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

export interface SingleRole {
  id: string;
  name: string;
  role: string;
}
enum BLOOD_GROUP {
  A_POSITIVE = 'A_POSITIVE',
  A_NEGATIVE = 'A_NEGATIVE',
  B_POSITIVE = 'B_POSITIVE',
  B_NEGATIVE = 'B_NEGATIVE',
  AB_POSITIVE = 'AB_POSITIVE',
  AB_NEGATIVE = 'AB_NEGATIVE',
  O_POSITIVE = 'O_POSITIVE',
  O_NEGATIVE = 'O_NEGATIVE'
}
export interface FormValues {
  phone: string;
  date: Dayjs;
  reason: string;
  address: string;
  blood: string;
  firstName: string;
  email: string;
  lastName: string;
}

export const MakeRequestSchema = z.object({
  phone: z
    .string()
    .min(9, { message: 'Invalid phone no!' })
    .max(11, { message: 'Invalid phone no!' }),
  date: z
    .custom<Dayjs>((val) => dayjs.isDayjs(val), 'Invalid date')
    .default(dayjs(new Date()).add(3, 'hours'))
    .refine(
      (date) => {
        const currentDate = dayjs(new Date()).add(3, 'hours');
        return dayjs(date).isAfter(currentDate);
      },
      { message: 'Need a future date' }
    ),
  reason: z
    .string()
    .min(10, { message: 'Reason must be more than 10 chars!' })
    .max(250, { message: 'Reason must be less than 250 chars!' }),
  address: z
    .string()
    .min(10, { message: 'Reason must be more than 10 chars!' })
    .max(150, { message: 'Address must not be less than 150 chars!' }),
  blood: z.nativeEnum(BLOOD_GROUP, { message: 'Blood group must be valid!' }),
  firstName: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(50, { message: 'First Name must be less than 50 chars!' }),
  lastName: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(50, { message: 'Last Name must be more than 50 chars!' }),
  email: z.string().min(1, { message: 'This field is required' }).email({
    message: 'Invalid email!'
  })
});

export type MakeRequest = z.infer<typeof MakeRequestSchema>;
