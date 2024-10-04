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
      name: 'lastDonation',
      validation: { required: 'This field is required' }
    }
  },
  {
    name: 'Username',
    field: 'username',
    id: 'username',
    input: {
      name: 'lastDonation',
      validation: { required: 'This field is required' }
    }
  },
  {
    name: 'Role',
    field: 'role',
    id: 'role',
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

function AccountDetails() {
  const { data: me, isLoading, isSuccess } = useGetMeQuery();
  const [userData, setUserData] = useState(null);

  if (isLoading) return <div>Loading...</div>;
  useEffect(() => {
    if (isSuccess && me) {
      const generatedData = {
        email: me.data.email,
        username: me.data.username,
        role: me.data.role.name
      };

      setUserData(generatedData);
    }
  }, [isSuccess, me]);

  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

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
              Email Addresses
            </Typography>
            <Typography variant="subtitle2">
              Manage details related to your associated email addresses
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
