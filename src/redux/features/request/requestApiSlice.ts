import { apiSlice } from '../api/apiSlice';

export const requestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRequest: builder.query<any, void>({
      query: () => ({
        url: '/donation/requested',
        method: 'get',
        transformResponse: (rawResult: any) => {
          return rawResult.data.data;
        }
      })
    }),
    getRequest: builder.query<SingleUser, string>({
      query: (id: string) => ({
        url: `/donation/requested/${id}`,
        method: 'get',
        transformResponse: (rawResult: any) => {
          console.log({ rawResult });
          return rawResult.data.data;
        }
      })
    }),
    addRequest: builder.mutation({
      query: (data) => ({
        url: '/donation/requested',
        method: 'POST',
        body: data
      })
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;
      //     const user = result.data.data;
      //     dispatch(
      //       requestApi.util.updateQueryData(
      //         'getAllRequest',
      //         undefined,
      //         (draftUser: any) => {
      //           draftUser.data.push(user);
      //         }
      //       )
      //     );
      //   } catch (err) {
      //     // do nothing
      //   }
      // }
    }),
    removeRequest: builder.mutation({
      query: (username) => ({
        url: `/donation/requested/${username}/confirm`,
        method: 'DELETE'
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateUser = dispatch(
          requestApi.util.updateQueryData(
            'getAllRequest',
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
    verifyRequest: builder.mutation({
      query: (username) => ({
        url: `/user/verify/${username}`,
        method: 'PATCH'
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateUser = dispatch(
          requestApi.util.updateQueryData(
            'getAllRequest',
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
    updateRequest: builder.mutation({
      query: (username) => ({
        url: `/user/promote`,
        method: 'Post',
        body: { username }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateUser = dispatch(
          requestApi.util.updateQueryData(
            'getAllRequest',
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
    })
  })
});

export const {
  useAddRequestMutation,
  useGetAllRequestQuery,
  useGetRequestQuery,
  useRemoveRequestMutation,
  useUpdateRequestMutation,
  useVerifyRequestMutation
} = requestApi;

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
