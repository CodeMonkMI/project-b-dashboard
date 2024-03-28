import { Box, Button } from '@mui/material';

import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { useDispatch } from 'react-redux';
import { logOut } from 'src/redux/features/auth/authSlice';
import { removeToken } from 'src/redux/utils/token';
const SignOut = () => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
    removeToken();
  };
  return (
    <div>
      <Box sx={{ m: 1 }}>
        <Button color="primary" fullWidth onClick={logOutHandler}>
          <LockOpenTwoToneIcon sx={{ mr: 1 }} />
          Sign out
        </Button>
      </Box>
    </div>
  );
};

export default SignOut;
