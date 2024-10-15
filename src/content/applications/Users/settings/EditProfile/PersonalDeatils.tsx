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

import ClearIcon from '@mui/icons-material/Clear';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'src/components/Loader';
import Text from 'src/components/Text';
import {
  useGetMeQuery,
  useUpdateProfileMutation
} from 'src/redux/features/auth/authApiSlice';
interface ValidationRule {
  required?: boolean | string; // true or custom message
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: string) => boolean | string; // custom validation function
}

const personalDetailsFields: {
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
    name: 'First Name',
    field: 'firstName',
    id: 'first_name',
    input: {
      name: 'firstName',
      validation: { required: 'This field is required' }
    }
  },
  {
    name: 'Last Name',
    field: 'lastName',
    id: 'last_name',
    input: {
      name: 'lastName',
      validation: { required: 'This field is required' }
    }
  },

  {
    name: 'Father Name',
    field: 'fatherName',
    id: 'fatherName',
    input: {
      name: 'fatherName',
      validation: {}
    }
  },
  {
    name: 'Mother Name',
    field: 'motherName',
    id: 'motherName',
    input: {
      name: 'motherName',
      validation: {}
    }
  },
  {
    name: 'Display Name',
    field: 'displayName',
    id: 'displayName',
    input: {
      name: 'displayName',
      validation: {}
    }
  },
  {
    name: 'Blood Group',
    field: 'bloodGroup',
    id: 'blood_group',
    input: {
      disabled: true,
      name: 'bloodGroup',
      validation: {}
    }
  },
  {
    name: 'Full Address',
    field: 'genAddress',
    id: 'genAddress',
    input: {
      disabled: true,
      name: 'genAddress',
      validation: {}
    }
  },
  {
    name: 'Address',
    field: 'address',
    id: 'address',
    input: {
      disabled: false,
      name: 'address',
      validation: {}
    }
  },
  {
    name: 'Street',
    field: 'streetAddress',
    id: 'blood_group',
    input: {
      name: 'streetAddress',
      validation: {}
    }
  },
  {
    name: 'Sub-District',
    field: 'upzila',
    id: 'blood_group',
    input: {
      name: 'upzila',
      validation: {}
    }
  },
  {
    name: 'District',
    field: 'zila',
    id: 'blood_group',
    input: {
      name: 'zila',
      validation: {}
    }
  },
  {
    name: 'Phone Number',
    field: 'phoneNo',
    id: 'phone_number',
    input: {
      name: 'phoneNo',
      validation: {}
    }
  },

  {
    name: 'Last Donation',
    field: 'lastDonationDate',
    id: 'last_donation_date',
    input: {
      disabled: true,
      name: 'lastDonation',
      validation: {}
    }
  }
];

type FormData = {
  firstName: string;
  lastName: string;
  displayName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNo: string; // Adjust type if necessary
};

function PersonalDetails() {
  const { data: me, isLoading, isSuccess } = useGetMeQuery();
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError
  } = useForm();

  if (isLoading) return <Loader />;

  useEffect(() => {
    if (isSuccess && me) {
      function generateAddress(streetAddress, city, state, zipCode) {
        const parts = [streetAddress, city, state, zipCode].filter(
          (part) => part
        );
        return parts.join(', ');
      }
      const { streetAddress, address, upzila, zila } = me.data.Profile;
      const generatedData = {
        ...me.data.Profile,
        genAddress: generateAddress(address, streetAddress, upzila, zila),
        ...me.data,
        role: me.data.role.name
      };
      personalDetailsFields.map((field) => {
        if (!field.input.disabled) {
          setValue(field.input.name, generatedData[field.field]);
        }
      });
      setUserData(generatedData);
    }
  }, [isSuccess, me]);

  const [updateProfile, { isSuccess: isSuccessUpdate, isError, error }] =
    useUpdateProfileMutation();

  const onSubmit = (data: FormData) => {
    updateProfile(data);
  };
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
    <Grid item xs={12}>
      <Card>
        <Box
          p={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Personal Details
            </Typography>
            <Typography variant="subtitle2">
              Manage information related to your personal details
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
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                {personalDetailsFields.map((field) => (
                  <React.Fragment key={Math.random()}>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={2}
                      textAlign={{ sm: 'right' }}
                    >
                      <Box pr={3} pb={2}>
                        {field.name}:
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={4}>
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
              {isOpen && (
                <Grid justifyContent={'flex-end'} container spacing={0}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              )}
            </Typography>
          </CardContent>
        </form>
      </Card>
    </Grid>
  );
}

export default PersonalDetails;
