import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useRecoverPasswordMutation } from 'src/redux/features/auth/authApiSlice';
// form values type
export interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [recoverPassword, { isError, isLoading, isSuccess, error }] =
    useRecoverPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    getValues
  } = useForm<ForgotPasswordFormValues>();

  const submitHandler = (data: ForgotPasswordFormValues) => {
    recoverPassword(data);
  };

  useEffect(() => {
    if (isError && !isLoading) {
      console.log(error);
      if (error && 'status' in error && 'data' in error) {
        if (error.status === 400) {
          const allErrors = error.data;
          Object.entries(allErrors).map((item: any) => {
            setError(item[0], { message: item[1] });
          });
        }
      }
    }
  }, [isError, isLoading]);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      const email = getValues('email');
      localStorage.setItem('saveEmail', email);
      navigate('/verify-otp');
    }
  }, [isError, isLoading]);

  return (
    <>
      {!isLoading &&
        isError &&
        'status' in error &&
        error.status === 406 &&
        'data' in error && (
          <>
            <Alert variant="standard" severity="warning">
              {error?.data['message']}
            </Alert>
          </>
        )}
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        sx={{ mt: 3, width: '100%' }}
      >
        <Box width={'100%'} sx={{ mb: 2 }}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'This field is required'
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <TextField
                  autoComplete="email"
                  name="email"
                  fullWidth
                  id="email"
                  label="Email or Username"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoFocus
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                  sx={{ width: '100%' }}
                />
              </>
            )}
          />
        </Box>

        {isLoading && (
          <Stack
            sx={{ width: '100%', color: 'grey.500', mt: 3, mb: 1 }}
            spacing={0}
          >
            <LinearProgress color="info" />
          </Stack>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="info"
          sx={{ mb: 2 }}
        >
          Send
        </Button>
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
