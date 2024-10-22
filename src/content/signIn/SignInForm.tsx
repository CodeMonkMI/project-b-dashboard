import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useLoginMutation } from 'src/redux/features/auth/authApiSlice';
// form values type
export interface SignInFormValues {
  username: string;
  password: string;
}

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const [login, { isError, isLoading, isSuccess, error }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<SignInFormValues>();

  const submitHandler = (data: SignInFormValues) => {
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
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="username"
              rules={{
                required: 'Username is required'
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                  <TextField
                    autoComplete="firstName"
                    name="username"
                    fullWidth
                    id="username"
                    label="Username"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoFocus
                    error={!!errors?.username}
                    helperText={errors?.username?.message}
                  />
                </>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required'
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                  <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors?.password}
                    helperText={errors?.password?.message}
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
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Remember me"
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
        <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default SignInForm;
