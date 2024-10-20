import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Alert, Grid, IconButton, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSetNewPasswordMutation } from 'src/redux/features/auth/authApiSlice';

// form values type
export interface SetNewPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

const SetNewPasswordForm: React.FC<{ data: string }> = ({
  data: dataParam
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [setNewPassword, { isError, isLoading, isSuccess, error }] =
    useSetNewPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    getValues
  } = useForm<SetNewPasswordFormValues>();

  const submitHandler = (values: SetNewPasswordFormValues) => {
    setNewPassword({ ...values, verificationId: dataParam });
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
      navigate(`/sign-in`);
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="newPassword"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                },
                maxLength: {
                  value: 32,
                  message: 'Password must be at most 32 characters'
                }
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                  <TextField
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors?.newPassword}
                    helperText={errors?.newPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Password is required',
                validate: (value) =>
                  value === getValues('newPassword') || 'Passwords do not match'
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                  <TextField
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors?.confirmPassword}
                    helperText={errors?.confirmPassword?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </>
              )}
            />
          </Grid>
        </Grid>

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
          sx={{ mt: 2, mb: 2 }}
        >
          Update your password
        </Button>
      </Box>
    </>
  );
};

export default SetNewPasswordForm;
