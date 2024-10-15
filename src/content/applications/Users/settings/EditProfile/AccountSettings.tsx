import ClearIcon from '@mui/icons-material/Clear';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'src/components/Loader';
import Text from 'src/components/Text';
import {
  useGetMeQuery,
  useUpdateInfoMutation
} from 'src/redux/features/auth/authApiSlice';
interface ValidationRule {
  required?: boolean | string; // true or custom message
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: string) => boolean | string; // custom validation function
}
const accountSettingsFields: {
  name: string;
  field: string;
  id: string;
  input: {
    disabled?: boolean;
    name: string;
    validation?: ValidationRule;
  };
}[] = [
  {
    name: 'Email',
    field: 'email',
    id: 'email',
    input: {
      name: 'email',
      validation: { required: 'This field is required' }
    }
  },
  {
    name: 'Username',
    field: 'username',
    id: 'username',
    input: {
      disabled: true,
      name: 'username',
      validation: {}
    }
  },
  {
    name: 'Role',
    field: 'role',
    id: 'role',
    input: {
      disabled: true,
      name: 'role',
      validation: {}
    }
  }
];

type FormData = {
  email: string;
};

function AccountDetails() {
  const { data: me, isLoading, isSuccess } = useGetMeQuery();
  const [userData, setUserData] = useState(null);

  if (isLoading) return <Loader />;
  useEffect(() => {
    if (isSuccess && me) {
      const generatedData = {
        email: me.data.email,
        username: me.data.username,
        role: me.data.role.name
      };

      setValue('email', generatedData.email);
      setUserData(generatedData);
    }
  }, [isSuccess, me]);

  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError
  } = useForm();
  const onSubmit = (data: FormData) => {
    console.log(data);
    updateInfo(data);
  };

  const [updateInfo, { isError, error, isSuccess: isSuccessUpdate }] =
    useUpdateInfoMutation();
  useEffect(() => {
    if (isSuccessUpdate) {
      setIsOpen(false);
    }
  }, [isSuccessUpdate]);
  useEffect(() => {
    if (isError) {
      if ('status' in error) {
        const data: FormData | {} | undefined = error.data;
        Object.entries(data).map((item: any) => {
          setError(item[0], { message: item[1] });
        });
      }
    }
  }, [isError]);

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <Box
          p={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Account Details
            </Typography>
            <Typography variant="subtitle2">
              Manage details related to your account
            </Typography>
          </Box>

          <Button
            onClick={() => {
              setIsOpen((prevState) => !prevState);
            }}
            variant="text"
            startIcon={isOpen ? <ClearIcon /> : <EditTwoToneIcon />}
          >
            {isOpen ? 'Cancel' : 'Edit'}
          </Button>
        </Box>
        <Divider />{' '}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                {accountSettingsFields.map((field) => (
                  <React.Fragment key={field.id}>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        {field.name}:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                      {isOpen && !field.input.disabled ? (
                        <TextField
                          fullWidth
                          variant="standard"
                          color="secondary"
                          size="small"
                          disabled={field.input.disabled}
                          error={!!errors[field.field]}
                          helperText={errors[field.field]?.message}
                          {...register(
                            field.input.name,
                            field.input.validation
                          )}
                        />
                      ) : (
                        <Text color="black">{userData?.[field.field]}</Text>
                      )}
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Typography>
            {isOpen && (
              <Grid justifyContent={'flex-end'} container spacing={0}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            )}
          </CardContent>
        </form>
      </Card>
    </Grid>
  );
}

export default AccountDetails;
