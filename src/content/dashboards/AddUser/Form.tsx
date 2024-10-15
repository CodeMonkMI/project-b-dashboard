import { Button, Grid, LinearProgress, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  useAddUserMutation,
  useGeRolesQuery
} from 'src/redux/features/user/userApiSlice';
import { FormValues, SingleRole } from './types';
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
const AddUserForm = () => {
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
      role: ''
    }
  });

  const [
    addUser,
    { isLoading, isSuccess: isAddUserSuccess, isError, error: addUserError }
  ] = useAddUserMutation();

  const submitHandler = (values: FormValues) => {
    addUser(values);
  };

  useEffect(() => {
    if (isAddUserSuccess) {
      clearErrors();
      reset();
      navigate('/users/all');
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
            <TextField
              label="First Name"
              variant="standard"
              fullWidth
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
              label="Phone no."
              variant="standard"
              fullWidth
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
              label="Email Address"
              variant="standard"
              fullWidth
              error={!!errors.email}
              {...register('email', { required: 'This field is required' })}
            />
            {errors?.email && (
              <Typography variant="body1" sx={{ mt: 1 }} color={'red'}>
                {errors.email.message}
              </Typography>
            )}
          </Grid>
          <Grid xs={12} sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
              <Controller
                name="role"
                control={control}
                defaultValue=""
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="standard"
                    {...field}
                  >
                    <MenuItem disabled key={Math.random()}>
                      Select Role
                    </MenuItem>
                    {roles.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            {errors?.role && (
              <Typography variant="body1" sx={{ mt: 1 }} color={'red'}>
                {errors.role?.message}
              </Typography>
            )}
          </Grid>
          <Grid xs={12} sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label2">
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
            <Button variant="contained" type="submit" fullWidth>
              Create User
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddUserForm;
