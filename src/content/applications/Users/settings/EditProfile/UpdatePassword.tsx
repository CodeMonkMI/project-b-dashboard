import ClearIcon from '@mui/icons-material/Clear';
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

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Text from 'src/components/Text';
import { useUpdatePasswordMutation } from 'src/redux/features/auth/authApiSlice';
interface ValidationRule {
  required?: boolean | string; // true or custom message
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: string, formValues: FormData) => boolean | string; // custom validation function
}

const updatePasswordFields: {
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
    name: 'Old Password',
    field: 'password',
    id: 'old_password',
    input: {
      name: 'password',
      validation: { required: 'This field is required' }
    }
  },
  {
    name: 'New Password',
    field: 'newPassword',
    id: 'new_password',
    input: {
      name: 'newPassword',
      validation: { required: 'This field is required' }
    }
  },
  {
    name: 'Confirm Password',
    field: 'confirmPassword',
    id: 'confirm_password',
    input: {
      name: 'confirmPassword',
      validation: {
        required: 'This field is required',
        validate: (value, formValues) => {
          if (value !== formValues.newPassword) {
            return 'Passwords do not match';
          }
          return true;
        }
      }
    }
  }
];
type FormData = {
  [K in typeof updatePasswordFields[number]['input']['name']]: string;
};
function UpdatePassword() {
  const [updatePassword, { isLoading: isUpdating, isError, isSuccess, error }] =
    useUpdatePasswordMutation();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError
  } = useForm();
  const onSubmit = (data: FormData) => {
    updatePassword(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);
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
              Update Password
            </Typography>
            <Typography variant="subtitle2">Update your password</Typography>
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
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                {updatePasswordFields.map((field) => (
                  <React.Fragment key={field.id}>
                    <Grid item xs={12} sm={4} textAlign={{ sm: 'right' }}>
                      <Box pr={3} pb={2}>
                        {field.name}:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      {isOpen ? (
                        <TextField
                          type="password"
                          fullWidth
                          variant="standard"
                          color="secondary"
                          size="small"
                          disabled={field.input.disabled}
                          error={!!errors[field.input.name]}
                          helperText={errors[field.input.name]?.message}
                          {...register(
                            field.input.name,
                            field.input.validation
                          )}
                        />
                      ) : (
                        <Text color="black">***********************</Text>
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

export default UpdatePassword;
