import { Button, Grid, LinearProgress, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FindDonorFromTypes, FormValues } from './types';

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

const FindDonorForm: React.FC<FindDonorFromTypes> = (props) => {
  const { findDonor, isLoading, isSuccess, isError, error } = props;
  const {
    control,
    formState: { errors },
    clearErrors,
    handleSubmit,
    reset,
    setError
  } = useForm<FormValues>({
    defaultValues: {
      date: '',
      blood: ''
    }
  });

  const submitHandler = (values: FormValues) => {
    const data: any = {
      ...values,
      date: dayjs(values.date).format('YYYY-MM-DDTHH:mm:ss.sssZ')
    };
    findDonor(data);
  };

  useEffect(() => {
    if (isSuccess) {
      clearErrors();
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
        <Grid container gap={4}>
          <Grid xs={12} lg={4} sx={{ mb: 3 }}>
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
          <Grid xs={12} sx={{ mb: 3 }} lg={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="date"
                control={control}
                defaultValue={dayjs(new Date()).add(7, 'hours')}
                rules={{
                  required: 'This field is required',
                  validate: (value: Dayjs) => {
                    if (value.isAfter(dayjs(new Date()).add(3, 'hours'))) {
                      return true;
                    }
                    return 'Need a bigger value';
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <DateTimePicker
                      onChange={onChange}
                      value={dayjs(value)}
                      className="width-full"
                      label="Date and Time"
                      minDateTime={dayjs(new Date()).add(3, 'hours')}
                      timeSteps={{
                        minutes: 15
                      }}
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
          <Grid xs={12} lg={2} sx={{ mb: 3 }}>
            <Button variant="contained" color="info" type="submit" fullWidth>
              Find Donor
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FindDonorForm;
