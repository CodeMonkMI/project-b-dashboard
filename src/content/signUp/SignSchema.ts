import { z, ZodType } from 'zod';
export enum BLOOD_GROUPS {
  'A_POSITIVE' = 'A_POSITIVE',
  'A_NEGATIVE' = 'A_NEGATIVE',
  'B_POSITIVE' = 'B_POSITIVE',
  'B_NEGATIVE' = 'B_NEGATIVE',
  'AB_POSITIVE' = 'AB_POSITIVE',
  'AB_NEGATIVE' = 'AB_NEGATIVE',
  'O_POSITIVE' = 'O_POSITIVE',
  'O_NEGATIVE' = 'O_NEGATIVE'
}
const SignUpSchema: ZodType = z
  .object({
    email: z
      .string({ message: 'Email is required!' })
      .email({ message: 'Email must be valid!' }),
    firstName: z
      .string({ message: 'First is required!' })
      .min(3, { message: 'First name must be greater than 3 chars' }),
    lastName: z
      .string({ message: 'First is required!' })
      .min(3, { message: 'First name must be greater than 3 chars' }),
    bloodGroup: z.nativeEnum(BLOOD_GROUPS, {
      message: 'Blood group must be valid!'
    }),
    password: z
      .string()
      .min(1, { message: 'Password is required!' })
      .min(6, { message: 'First name must be greater than 6 chars' })
      .max(32, { message: 'First name must not be greater than 32 chars' }),
    confirmPassword: z.string().min(1, { message: 'Confirm you password' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password didn't matched!",
    path: ['confirmPassword']
  });

export default SignUpSchema;
