import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        url: '/user',
        method: 'get',
        transformResponse: (rawResult: any) => {
          console.log(rawResult);
          return rawResult.data.data;
        }
      })
    })

    //   addUser: builder.mutation({
    //     query: (data) => ({
    //       url: '/user',
    //       method: 'post',
    //       body: data
    //     }),
    //     async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //       const result = await queryFulfilled;
    //       dispatch(
    //         apiSlice.util.updateQueryData('getUsers', undefined, (draft) => {
    //           return [...draft, result.data];
    //         })
    //       );
    //     }
    //   }),
    //   deleteUser: builder.mutation({
    //     query: (id) => ({
    //       url: `/user/${id}`,
    //       method: 'delete'
    //     }),
    //     async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //       const patchResult = dispatch(
    //         apiSlice.util.updateQueryData('getUsers', undefined, (draft) => {
    //           // eslint-disable-next-line eqeqeq
    //           return draft?.filter((i) => i.id != arg);
    //         })
    //       );

    //       try {
    //         await queryFulfilled;
    //       } catch (error) {
    //         setTimeout(() => {
    //           patchResult.undo();
    //         }, 3000);
    //       }
    //     }
    //   })
  })
});

export const {
  useGetUsersQuery
  // useGetUserQuery,
  // useAddUserMutation,
  // useDeleteUserMutation
} = userApi;
