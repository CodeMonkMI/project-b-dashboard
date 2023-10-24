import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FormHelperText, IconButton, InputAdornment } from '@mui/material';
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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from 'src/redux/features/auth/authApiSlice';
import { v4 } from 'uuid';

// form values type
enum blood_type {
  'A_POSITIVE',
  'A_NEGATIVE',
  'B_POSITIVE',
  'B_NEGATIVE',
  'AB_POSITIVE',
  'AB_NEGATIVE',
  'O_POSITIVE',
  'O_NEGATIVE'
}
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  blood: blood_type;
}
interface BloodListProps {
  id: string;
  value: string | blood_type;
  label: String;
}
// CONST VALUES
const BLOOD_GROUP_LIST: BloodListProps[] = [
  {
    id: v4(),
    label: 'A +ve',
    value: blood_type.A_POSITIVE
  },
  {
    id: v4(),
    label: 'A -ve',
    value: blood_type.A_NEGATIVE
  },
  {
    id: v4(),
    label: 'B +ve',
    value: blood_type.B_POSITIVE
  },
  {
    id: v4(),
    label: 'B -ve',
    value: blood_type.B_NEGATIVE
  },
  {
    id: v4(),
    label: 'O +ve',
    value: blood_type.O_POSITIVE
  },
  {
    id: v4(),
    label: 'O -ve',
    value: blood_type.O_NEGATIVE
  },
  {
    id: v4(),
    label: 'AB +ve',
    value: blood_type.AB_POSITIVE
  },
  {
    id: v4(),
    label: 'AB -ve',
    value: blood_type.AB_NEGATIVE
  }
];

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [register, { isError, isLoading, isSuccess, error }] =
    useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const submitHandler = (data: FormValues) => {
    register(data);
  };

  useEffect(() => {
    if (isError && !isLoading) {
      console.log(error);
    }
  }, [isError, isLoading]);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      navigate('/dashboards');
    }
  }, [isError, isLoading]);

  useEffect(() => {
    if (isLoading) {
      console.log('loading....');
    }
  }, [isLoading]);

  return (
    <div>
      {' '}
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
              name="firstName"
              rules={{ required: 'First name is required' }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                  <TextField
                    autoComplete="firstName"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoFocus
                    error={!!errors?.firstName}
                    helperText={errors?.firstName?.message}
                  />
                </>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name="lastName"
              rules={{ required: 'Last name is required' }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                  <TextField
                    autoComplete="firstName"
                    name="lastName"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoFocus
                    error={!!errors?.lastName}
                    helperText={errors?.lastName?.message}
                  />
                </>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email must be valid'
                }
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                  <TextField
                    autoComplete="firstName"
                    name="email"
                    fullWidth
                    id="email"
                    label="Email Address"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoFocus
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                  />
                </>
              )}
            />
          </Grid>

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
              name="blood"
              rules={{
                required: 'Blood group is required!'
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                  <FormControl fullWidth error={!!errors.blood}>
                    <InputLabel id="blood_select_label">
                      Blood Group{' '}
                    </InputLabel>
                    <Select
                      required
                      labelId="blood_select_label"
                      id="blood-select"
                      value={value}
                      label="Blood Group"
                      onChange={onChange}
                      onBlur={onBlur}
                    >
                      {BLOOD_GROUP_LIST.map((item: BloodListProps) => (
                        <MenuItem value={blood_type[item.value]} key={item.id}>
                          {item.label}
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
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be greater than 6 chars'
                },
                maxLength: {
                  value: 32,
                  message: 'Password must be lesser than 32 chars'
                }
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
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Confirm Your password!',
                validate: (confirmPassword, { password }) => {
                  if (confirmPassword !== password)
                    return "Password didn't match";
                  return true;
                }
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <>
                  <TextField
                    fullWidth
                    name="password"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors?.confirmPassword}
                    helperText={errors?.confirmPassword?.message}
                  />
                </>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I am agree with  Terms and Condition"
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
