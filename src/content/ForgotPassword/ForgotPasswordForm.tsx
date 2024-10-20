import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useLoginMutation } from 'src/redux/features/auth/authApiSlice';
// form values type
export interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [login, { isError, isLoading, isSuccess, error }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<ForgotPasswordFormValues>();

  const submitHandler = (data: ForgotPasswordFormValues) => {
    login(data);
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
      navigate('/');
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
              required: 'Username is required'
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <TextField
                  autoComplete="email"
                  name="email"
                  fullWidth
                  id="email"
                  label="Email"
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
        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
          Send
        </Button>
      </Box>
    </>
  );
};

export default ForgotPasswordForm;

/*
  <Controller
control={control}
name="ReactDatepicker"
render={({ field: { onChange, onBlur, value, ref } }) => (
  <ReactDatePicker
    onChange={onChange} // send value to hook form
    onBlur={onBlur} // notify when input is touched/blur
    selected={value}
  />
)}
/>
*/
