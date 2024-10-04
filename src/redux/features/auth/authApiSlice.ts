import { getTokenData, storeToken } from 'src/redux/utils/token';
import { apiSlice } from '../api/apiSlice';
import { logIn, setMe } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: data
      })
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
    getMe: builder.query<any, void>({
      query: () => ({
        url: '/auth/me',
        method: 'post'
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setMe(result.data.data));
        } catch (err) {
          // do nothing
        }
      }
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/update-password',
        method: 'put',
        body: data
      })
    }),
    updateInfo: builder.mutation({
      query: (data) => ({
        url: '/auth/update-info',
        method: 'put',
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateRequest = dispatch(
          authApi.util.updateQueryData('getMe', undefined, (draftUser: any) => {
            draftUser.data.email = arg.email;
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          updateRequest.undo();
        }
      }
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useUpdatePasswordMutation,
  useUpdateInfoMutation
} = authApi;
