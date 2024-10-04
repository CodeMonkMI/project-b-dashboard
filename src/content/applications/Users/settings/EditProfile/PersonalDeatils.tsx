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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Text from 'src/components/Text';
import { useGetMeQuery } from 'src/redux/features/auth/authApiSlice';
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
    name: 'Display Name',
    field: 'displayName',
    id: 'displayName',
    input: {
      name: 'displayName',
      validation: { required: 'This field is required' }
    }
  },
  {
    name: 'Blood Group',
    field: 'bloodGroup',
    id: 'blood_group',
    input: {
      name: 'bloodGroup',
      validation: { required: 'This field is required' }
    }
  },
  {
    name: ' Address',
    field: 'address',
    id: 'blood_group',
    input: {
      name: 'address',
      validation: { required: 'This field is required' }
    }
  },
  {
    name: 'Phone Number',
    field: 'phoneNo',
    id: 'phone_number',
    input: {
      name: 'phoneNo',
      validation: { required: 'This field is required' }
    }
  },
  {
    name: 'Last Donation Date',
    field: 'lastDonationDate',
    id: 'last_donation_date',
    input: {
      disabled: true,
      name: 'lastDonation',
      validation: { required: 'This field is required' }
    }
  }
];

type FormData = {
  firstName: string;
  lastName: string;
  displayName: string;
  bloodGroup: string;
  address: string;
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
  if (isLoading) return <div>Loading...</div>;
  useEffect(() => {
    if (isSuccess && me) {
      function generateAddress(streetAddress, city, state, zipCode) {
        const parts = [streetAddress, city, state, zipCode].filter(
          (part) => part
        );
        return parts.join(', ');
      }
      const { streetAddress, city, state, zipCode } = me.data.Profile;
      const generatedData = {
        ...me.data.Profile,
        ...me.data,
        address: generateAddress(streetAddress, city, state, zipCode),
        role: me.data.role.name
      };
      personalDetailsFields.map((field) => {
        setValue(field.input.name, generatedData[field.field]);
      });
      setUserData(generatedData);
    }
  }, [isSuccess, me]);

  const onSubmit = (data: FormData) => {};

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
                  <>
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
                      {isOpen ? (
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
                  </>
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
