import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        url: '/user',
        method: 'get',
        transformResponse: (rawResult: any) => {
          return rawResult.data.data;
        }
      })
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: '/user/create',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const user = result.data.data;
          dispatch(
            userApi.util.updateQueryData(
              'getUsers',
              undefined,
              (draftUser: any) => {
                draftUser.data.push(user);
              }
            )
          );
        } catch (err) {
          // do nothing
        }
      }
    }),
    geRoles: builder.query<any, void>({
      query: () => ({
        url: '/user/roles',
        method: 'get'
      })
    })
  })
});

export const { useGetUsersQuery, useGeRolesQuery, useAddUserMutation } =
  userApi;
