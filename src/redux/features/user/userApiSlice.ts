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
    removeUser: builder.mutation({
      query: (username) => ({
        url: `/user/remove/${username}/confirm`,
        method: 'DELETE'
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateUser = dispatch(
          userApi.util.updateQueryData(
            'getUsers',
            undefined,
            (draftUser: any) => {
              const newUsers = draftUser.data.filter(
                (user) => user.username !== arg
              );
              return {
                ...draftUser,
                data: newUsers
              };
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          updateUser.undo();
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

export const {
  useGetUsersQuery,
  useGeRolesQuery,
  useAddUserMutation,
  useRemoveUserMutation
} = userApi;
