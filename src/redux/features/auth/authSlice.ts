import { createSlice } from '@reduxjs/toolkit';

interface StateProps {
  user: Object;
  me:
    | {
        id: string;
        username: string;
        email: string;
        Profile: {
          firstName: string;
          lastName: string;
          displayName: string;
          fatherName: string;
          motherName: string;
          address: string;
          streetAddress: string;
          upzila: string;
          zila: string;
          phoneNo: string;
          lastDonation: string;
          bloodGroup: string;
          image: string;
        };
        role: {
          name: string;
          role: string;
        };
      }
    | {};
  isAuthenticated: Boolean;
}

const initialState: StateProps = {
  user: {},
  isAuthenticated: false,
  me: {}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setMe: (state, action) => {
      state.me = action.payload;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    }
  }
});

export const { logOut, logIn, setMe } = authSlice.actions;
export default authSlice.reducer;
