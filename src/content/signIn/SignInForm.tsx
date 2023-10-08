import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLoginMutation } from 'src/redux/features/auth/authApiSlice';

// form values type
export interface SignInFormValues {
  username: string;
  password: string;
}

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [login, { isError, isLoading, isSuccess, error }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormValues>();

  const submitHandler = (data: SignInFormValues) => {
    login(data);
  };

  useEffect(() => {
    if (isError && !isLoading) {
      console.log(error);
    }
  }, [isError, isLoading]);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      console.log('success');
    }
  }, [isError, isLoading]);

  useEffect(() => {
    if (isLoading) {
      console.log('loading....');
    }
  }, [isLoading]);

  return (
    <>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
};

export default SignInForm;

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
