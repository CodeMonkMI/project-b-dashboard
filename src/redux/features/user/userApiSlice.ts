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
    getUser: builder.query<SingleUser, string>({
      query: (id: string) => ({
        url: `/user/single/${id}`,
        method: 'get',
        transformResponse: (rawResult: any) => {
          console.log({ rawResult });
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
    verifyUser: builder.mutation({
      query: (username) => ({
        url: `/user/verify/${username}`,
        method: 'PATCH'
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateUser = dispatch(
          userApi.util.updateQueryData(
            'getUsers',
            undefined,
            (draftUser: any) => {
              const findUser = draftUser.data.find(
                (item) => item.username === arg
              );
              findUser.isVerified = true;
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
    promoteUser: builder.mutation({
      query: (username) => ({
        url: `/user/promote`,
        method: 'Post',
        body: { username }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateUser = dispatch(
          userApi.util.updateQueryData(
            'getUsers',
            undefined,
            (draftUser: any) => {
              const findUser = draftUser.data.find(
                (item) => item.username === arg
              );

              if (findUser.role.role == 'user') {
                findUser.role.role = 'admin';
              } else if (findUser.role.role == 'admin') {
                findUser.role.role = 'super_admin';
              }
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
    demoteUser: builder.mutation({
      query: (username) => ({
        url: `/user/demote`,
        method: 'Post',
        body: { username }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateUser = dispatch(
          userApi.util.updateQueryData(
            'getUsers',
            undefined,
            (draftUser: any) => {
              const findUser = draftUser.data.find(
                (item) => item.username === arg
              );
              if (findUser.role.role == 'super_admin') {
                findUser.role.role = 'admin';
              } else if (findUser.role.role == 'admin') {
                findUser.role.role = 'user';
              }
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
  useRemoveUserMutation,
  useGetUserQuery,
  useVerifyUserMutation,
  usePromoteUserMutation,
  useDemoteUserMutation
} = userApi;

interface SingleUser {
  data?: {
    id: string;
    username: string;
    email: string;
    createdAt: string;

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
  };
}
