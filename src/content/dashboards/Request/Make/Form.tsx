import { Button, Grid, LinearProgress, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  useAddUserMutation,
  useGeRolesQuery
} from 'src/redux/features/user/userApiSlice';
import { FormValues, SingleRole } from './types';

function BasicDateTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker onChange={() => {}} value={dayjs('23/02/24')} />
    </LocalizationProvider>
  );
}
const data: {
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
const RequestForm = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<SingleRole[]>([]);
  const { data: rolesData, isSuccess } = useGeRolesQuery();

  useEffect(() => {
    if (isSuccess) {
      setRoles(rolesData.data);
    }
  }, [isSuccess]);

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
      phoneNo: '',
      blood: '',
      email: '',
      firstName: '',
      lastName: '',
      date: dayjs(new Date()),
      address: '',
      reason: ''
    }
  });

  const [
    addUser,
    { isLoading, isSuccess: isAddUserSuccess, isError, error: addUserError }
  ] = useAddUserMutation();

  const submitHandler = (values: FormValues) => {
    const data = {
      ...values,
      date: dayjs(values.date).format('YYYY-MM-DDTHH:mm:ss.sssZ')
    };
    console.log(data);
  };

  useEffect(() => {
    if (isAddUserSuccess) {
      clearErrors();
      reset();
      navigate('/dashboards/users/all');
    }
  }, [isAddUserSuccess]);

  useEffect(() => {
    if (isError) {
      if ('status' in addUserError) {
        const data: FormValues | {} | undefined = addUserError.data;
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
          <Grid xs={12} sx={{ mb: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <InputLabel
                id="demo-simple-select-label2"
                sx={{ mb: 2 }}
                required
              >
                Date and Time
              </InputLabel>
              <Controller
                name="date"
                control={control}
                defaultValue={dayjs(new Date()).add(7, 'hours')}
                rules={{ required: 'This field is required' }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <DateTimePicker
                      onChange={onChange}
                      value={dayjs(value)}
                      className="width-full"
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
                        Select Role
                      </MenuItem>
                      {data.map((blood) => (
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
              error={!!errors.phoneNo}
              {...register('phoneNo', { required: 'This field is required' })}
            />
            {errors?.phoneNo && (
              <Typography variant="body1" sx={{ mt: 1 }} color={'red'}>
                {errors.phoneNo.message}
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
              {...register('email')}
            />
            {errors?.email && (
              <Typography variant="body1" sx={{ mt: 1 }} color={'red'}>
                {errors.email.message}
              </Typography>
            )}
          </Grid>

          <Grid xs={12} sx={{ mb: 3 }}>
            <Button variant="contained" type="submit" fullWidth>
              Create User
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default RequestForm;
