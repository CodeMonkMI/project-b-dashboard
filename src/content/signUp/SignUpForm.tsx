import { zodResolver } from '@hookform/resolvers/zod';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  FormHelperText,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useRegisterMutation } from 'src/redux/features/auth/authApiSlice';
import { z } from 'zod';
import SignUpSchema, { ZodSingleErrorType } from './SignSchema';
import { BLOOD_GROUP_LIST } from './data';

type FormValues = z.infer<typeof SignUpSchema>;

// CONST VALUES

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [userSignUp, { isError, isLoading, isSuccess, error }] =
    useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    register
  } = useForm<FormValues>({
    resolver: zodResolver(SignUpSchema)
  });

  const submitHandler = (data: FormValues) => {
    console.log(data);
    userSignUp(data);
  };

  useEffect(() => {
    if (isError && !isLoading) {
      if (error && 'data' in error) {
        const allErrors: ZodSingleErrorType[] =
          (error as any)?.data?.errors || [];
        allErrors.map((err) => {
          setError(err.path[0], { message: err.message });
        });
      }
    }
  }, [isError, isLoading]);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      reset();
    }
  }, [isError, isLoading]);

  return (
    <div>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="firstName"
              name="firstName"
              fullWidth
              id="firstName"
              label="First Name"
              {...register('firstName')}
              autoFocus
              error={!!errors?.firstName}
              helperText={errors?.firstName?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              autoComplete="firstName"
              name="lastName"
              fullWidth
              id="lastName"
              label="Last Name"
              autoFocus
              {...register('lastName')}
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              autoComplete="firstName"
              name="email"
              fullWidth
              id="email"
              label="Email Address"
              {...register('email')}
              autoFocus
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name="bloodGroup"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                  <FormControl fullWidth error={!!errors.blood}>
                    <InputLabel id="blood_select_label">Blood Group</InputLabel>
                    <Select
                      required
                      labelId="blood_select_label"
                      id="blood-select"
                      value={value}
                      label="Blood Group"
                      name="bloodGroup"
                      onChange={onChange}
                      onBlur={onBlur}
                      ref={ref}
                    >
                      {BLOOD_GROUP_LIST.map((item: string) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText id="my-helper-text" error={!!errors?.blood}>
                      {errors?.blood?.message}
                    </FormHelperText>
                  </FormControl>
                </>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={!!errors?.password}
              helperText={errors?.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              error={!!errors?.confirmPassword}
              helperText={errors?.confirmPassword?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I am agree with  Terms and Condition"
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
        {!isLoading && isSuccess && (
          <>
            <Alert variant="standard" severity="success">
              Your account creation process was successful! We will verify your
              information and activate your account as soon as possible. You
              will be notified via email when your account is activated!
            </Alert>
          </>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/sign-in" component={RouterLink} variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SignUpForm;

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
