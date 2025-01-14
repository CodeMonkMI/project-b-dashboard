import { z, ZodType } from 'zod';
export enum BLOOD_GROUPS {
  'A_POSITIVE',
  'A_NEGATIVE',
  'B_POSITIVE',
  'B_NEGATIVE',
  'AB_POSITIVE',
  'AB_NEGATIVE',
  'O_POSITIVE',
  'O_NEGATIVE'
}
const SignUpSchema: ZodType = z.object({
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
    .string({ required_error: 'Password is required!' })
    .min(6, { message: 'First name must be greater than 6 chars' })
    .max(32, { message: 'First name must not be greater than 32 chars' }),
  confirmPassword: z.string({ required_error: 'Confirm you password' })
});

export default SignUpSchema;
