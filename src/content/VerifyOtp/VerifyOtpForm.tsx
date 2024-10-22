import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useVerifyOtpMutation } from 'src/redux/features/auth/authApiSlice';
// form values type
export interface ForgotPasswordFormValues {
  otp: string;
}

const VerifyOtpForm = () => {
  const navigate = useNavigate();
  const [VerifyOtp, { isError, isLoading, isSuccess, error, data }] =
    useVerifyOtpMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<ForgotPasswordFormValues>();

  const submitHandler = (data: ForgotPasswordFormValues) => {
    const email = localStorage.getItem('saveEmail');
    VerifyOtp({
      email,
      otp: data.otp
    });
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
      localStorage.removeItem('saveEmail');
      navigate(`/set-new-password?data=${data.data}`);
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
            name="otp"
            rules={{
              required: 'This field is required'
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <TextField
                  autoComplete="otp"
                  name="otp"
                  fullWidth
                  id="otp"
                  label="OTP"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoFocus
                  error={!!errors?.otp}
                  helperText={errors?.otp?.message}
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
          color="success"
          sx={{ mb: 2 }}
        >
          Verify
        </Button>
      </Box>
    </>
  );
};

export default VerifyOtpForm;
