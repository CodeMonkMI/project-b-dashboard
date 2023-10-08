import { createSlice } from '@reduxjs/toolkit';

interface StateProps {
  user: Object;
  me: Object;
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
