import { Button, Grid, LinearProgress, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAddRequestMutation } from 'src/redux/features/request/requestApiSlice';
import { FormValues } from './types';

const RequestForm = () => {
  const navigate = useNavigate();

  const {
    register,
    control,
    formState: { errors },
    clearErrors,
    handleSubmit,
    reset,
    setError
  } = useForm<FormValues>({
    defaultValues: {
      phone: '',
      blood: '',
      email: '',
      firstName: '',
      lastName: '',
      date: dayjs(new Date()).add(3, 'hours').add(15, 'minutes'),
      address: '',
      reason: ''
    }
  });

  const [
    addRequest,
    { data: responseData, isLoading, isSuccess, isError, error }
  ] = useAddRequestMutation();

  const submitHandler = (values: FormValues) => {
    const data = {
      ...values,
      date: dayjs(values.date).format('YYYY-MM-DDTHH:mm:ss.sssZ')
    };
    addRequest(data);
  };

  useEffect(() => {
    if (isSuccess) {
      // clearErrors();
      // reset();
      console.log({ responseData });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if ('status' in error) {
        const data: FormValues | {} | undefined = error.data;
        Object.entries(data).map((item: any) => {
          setError(item[0], { message: item[1] });
        });
      }
    }
  }, [isError]);

  return (
    <div>
      {isLoading && <LinearProgress color="primary" />}
      <form onSubmit={handleSubmit(submitHandler)}>
        <Grid container>
          <Grid xs={12} sx={{ mb: 3, mt: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="date"
                control={control}
                defaultValue={dayjs(new Date()).add(3, 'hours')}
                rules={{
                  required: 'This field is required',
                  validate: (value: Dayjs) => {
                    if (value.isAfter(dayjs(new Date()).add(3, 'hours'))) {
                      return true;
                    }
                    return 'Need a bigger future date';
                  }
                }}
                render={({ field: { onChange, value, ...rest } }) => (
                  <>
                    <DateTimePicker
                      onChange={onChange}
                      value={dayjs(value)}
                      label="Date and Time"
                      className="width-full"
                      minDateTime={dayjs(new Date()).add(3, 'hours')}
                      timeSteps={{
                        minutes: 1
                      }}
                      {...rest}
                    />
                  </>
                )}
              />

              {errors?.date && (
                <Typography variant="body1" sx={{ mt: 1 }} color={'red'}>
                  {errors.date.message}
                </Typography>
              )}
            </LocalizationProvider>
          </Grid>

          <Grid xs={12} sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2" required>
                Select Blood
              </InputLabel>
              <Controller
                name="blood"
                control={control}
                defaultValue=""
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <>
                    <Select
                      labelId="demo-simple-select-label2"
                      id="demo-simple-select2"
                      variant="standard"
                      {...field}
                    >
                      <MenuItem disabled key={Math.random()}>
                        Select Blood
                      </MenuItem>
                      {BLOOD_GROUPS.map((blood) => (
                        <MenuItem key={blood.id} value={blood.value}>
                          {blood.value.replace('_', ' ')}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
            </FormControl>
            {errors?.blood && (
              <Typography variant="body1" sx={{ mt: 1 }} color={'red'}>
                {errors.blood.message}
              </Typography>
            )}
          </Grid>
          <Grid xs={12} sx={{ mb: 3 }}>
            <TextField
              label="Reason"
              variant="standard"
              multiline
              minRows={1}
              fullWidth
              error={!!errors.reason}
              required
              {...register('reason', { required: 'This field is required' })}
            />
            {errors?.reason && (
              <Typography variant="body1" sx={{ mt: 1 }} color={'red'}>
                {errors.reason.message}
              </Typography>
            )}
          </Grid>
          <Grid xs={12} sx={{ mb: 3 }}>
            <TextField
              label="Address"
              variant="standard"
              fullWidth
              required
              error={!!errors.address}
              {...register('address', { required: 'This field is required' })}
            />
            {errors?.address && (
              <Typography variant="body1" sx={{ mt: 1 }} color={'red'}>
                {errors.address.message}
              </Typography>
            )}
          </Grid>
          <Grid xs={12} sx={{ mb: 3 }}>
            <TextField
              label="Phone no."
              variant="standard"
              fullWidth
              required
              error={!!errors.phone}
              {...register('phone', { required: 'This field is required' })}
            />
            {errors?.phone && (
              <Typography variant="body1" sx={{ mt: 1 }} color={'red'}>
                {errors.phone.message}
              </Typography>
            )}
          </Grid>
          <Grid xs={12} sx={{ mb: 3 }}>
            <TextField
              label="First Name"
              variant="standard"
              fullWidth
              required
              error={!!errors.firstName}
              {...register('firstName', { required: 'This field is required' })}
            />
            {errors?.firstName && (
              <Typography variant="body1" sx={{ mt: 1 }} color={'red'}>
                {errors.firstName.message}
              </Typography>
            )}
          </Grid>
          <Grid xs={12} sx={{ mb: 3 }}>
            <TextField
              label="Last Name"
              variant="standard"
              fullWidth
              required
              error={!!errors.lastName}
              {...register('lastName', { required: 'This field is required' })}
            />
            {errors?.lastName && (
              <Typography variant="body1" sx={{ mt: 1 }} color={'red'}>
                {errors.lastName.message}
              </Typography>
            )}
          </Grid>

          <Grid xs={12} sx={{ mb: 3 }}>
            <TextField
              label="Email Address"
              variant="standard"
              fullWidth
              error={!!errors.email}
              {...register('email', {
                validate: (email: string) => {
                  if (!email) return true;
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return emailRegex.test(email) ? true : 'Email must be valid';
                }
              })}
            />
            {errors?.email && (
              <Typography variant="body1" sx={{ mt: 1 }} color={'red'}>
                {errors.email.message}
              </Typography>
            )}
          </Grid>

          <Grid xs={12} sx={{ mb: 3 }}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Make Request
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default RequestForm;
const BLOOD_GROUPS: {
  id: string;
  value: string;
}[] = [
  {
    id: Math.random().toString(),
    value: 'A_POSITIVE'
  },
  {
    id: Math.random().toString(),
    value: 'A_NEGATIVE'
  },
  {
    id: Math.random().toString(),
    value: 'B_POSITIVE'
  },
  {
    id: Math.random().toString(),
    value: 'B_NEGATIVE'
  },
  {
    id: Math.random().toString(),
    value: 'AB_POSITIVE'
  },
  {
    id: Math.random().toString(),
    value: 'AB_NEGATIVE'
  },
  {
    id: Math.random().toString(),
    value: 'O_POSITIVE'
  },
  {
    id: Math.random().toString(),
    value: 'O_NEGATIVE'
  }
];
