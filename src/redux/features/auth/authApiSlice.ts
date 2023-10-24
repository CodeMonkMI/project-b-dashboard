import { getTokenData, storeToken } from 'src/redux/utils/token';
import { apiSlice } from '../api/apiSlice';
import { logIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { token } = result.data.data;

          storeToken(token);

          const user = getTokenData();
          dispatch(logIn(user));
        } catch (err) {
          // do nothing
        }
      }
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: data
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { token } = result.data.data;

          storeToken(token);

          const user = getTokenData();
          dispatch(logIn(user));
        } catch (err) {
          // do nothing
        }
      }
    }),
    getMe: builder.query({
      query: () => ({
        url: '/auth/me',
        method: 'get'
      })
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/me/password',
        method: 'put',
        body: data
      })
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useUpdatePasswordMutation
} = authApi;
