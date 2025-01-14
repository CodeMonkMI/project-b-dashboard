import { z, ZodType } from 'zod';

const SignInSchema: ZodType = z.object({
  username: z.string({ message: 'Email is required!' }),
  password: z.string({ required_error: 'Password is required!' })
});

export type SignInFormValues = z.infer<typeof SignInSchema>;
export default SignInSchema;

export type ZodSingleError = {
  code: string;
  expected: string;
  message: string;
  path: string[];
  received: string;
};
