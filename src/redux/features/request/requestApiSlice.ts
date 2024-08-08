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
    getRequest: builder.query<any, string>({
      query: (id: string) => ({
        url: `/donation/requested/${id}`,
        method: 'get',
        transformResponse: (rawResult: any) => {
          console.log({ rawResult });
          return rawResult.data.data;
        }
      })
    }),
    getUserRequestContribution: builder.query<any, string>({
      query: (userId: string) => ({
        url: `/donation/requested/contribution/${userId}`,
        method: 'get'
      })
    }),
    getAllActivity: builder.query<any, void>({
      query: () => ({
        url: `/donation/activity`,
        method: 'get',
        transformResponse: (rawResult: any) => {
          console.log({ rawResult });
          return rawResult.data.data;
        }
      }),
      providesTags: ['getAllActivity']
    }),
    addRequest: builder.mutation({
      query: (data) => ({
        url: '/donation/requested',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['notifications']
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
      query: (id) => ({
        url: `/donation/requested/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['getAllActivity', 'notifications'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateRequest = dispatch(
          requestApi.util.updateQueryData(
            'getAllRequest',
            undefined,
            (draftUser: any) => {
              const newRequests = draftUser.data.filter(
                (request) => request.id !== arg
              );
              return {
                ...draftUser,
                data: newRequests
              };
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          updateRequest.undo();
        }
      }
    }),
    approveRequest: builder.mutation({
      query: (id) => ({
        url: `donation/requested/approve/${id}`,
        method: 'put'
      }),
      invalidatesTags: ['getAllActivity', 'notifications'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateRequest = dispatch(
          requestApi.util.updateQueryData(
            'getAllRequest',
            undefined,
            (draftUser: any) => {
              const findRequest = draftUser.data.find(
                (item) => item.id === arg
              );
              findRequest.status = 'progress';
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          updateRequest.undo();
        }
      }
    }),
    declineRequest: builder.mutation({
      query: (id) => ({
        url: `donation/requested/decline/${id}`,
        method: 'put'
      }),
      invalidatesTags: ['getAllActivity', 'notifications'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateRequest = dispatch(
          requestApi.util.updateQueryData(
            'getAllRequest',
            undefined,
            (draftUser: any) => {
              const findRequest = draftUser.data.find(
                (item) => item.id === arg
              );
              findRequest.status = 'declined';
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          updateRequest.undo();
        }
      }
    }),
    makeProgressRequest: builder.mutation({
      query: (id) => ({
        url: `donation/requested/progress/${id}`,
        method: 'put'
      }),
      invalidatesTags: ['getAllActivity', 'notifications'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateAllRequest = dispatch(
          requestApi.util.updateQueryData(
            'getAllRequest',
            undefined,
            (draftUser: any) => {
              const findRequest = draftUser.data.find(
                (item) => item.id === arg
              );
              findRequest.status = 'progress';
              findRequest.donor = null;
            }
          )
        );
        const updateSingleRequest = dispatch(
          requestApi.util.updateQueryData(
            'getRequest',
            arg,
            (draftUser: any) => {
              draftUser.data.status = 'progress';
              draftUser.data.donor = null;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          updateAllRequest.undo();
          updateSingleRequest.undo();
        }
      }
    }),
    assignDonorRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `donation/requested/assign/${id}`,
        method: 'put',
        body: data
      }),
      invalidatesTags: ['getAllActivity', 'notifications'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            requestApi.util.updateQueryData(
              'getAllRequest',
              undefined,
              (draftUser: any) => {
                const findRequest = draftUser.data.find(
                  (item) => item.id === arg.id
                );
                findRequest.status = 'ready';
                findRequest.donor = data.data;
              }
            )
          );
          dispatch(
            requestApi.util.updateQueryData(
              'getRequest',
              arg.id,
              (draftUser: any) => {
                draftUser.data.status = 'ready';
                draftUser.data.donor = data.data;
              }
            )
          );
        } catch (err) {}
      }
    }),
    holdStatusRequest: builder.mutation({
      query: (id) => ({
        url: `donation/requested/hold/${id}`,
        method: 'put'
      }),
      invalidatesTags: ['getAllActivity', 'notifications'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateRequest = dispatch(
          requestApi.util.updateQueryData(
            'getAllRequest',
            undefined,
            (draftUser: any) => {
              const findRequest = draftUser.data.find(
                (item) => item.id === arg
              );
              findRequest.status = 'hold';
              findRequest.donor = null;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          updateRequest.undo();
        }
      }
    }),
    completeRequest: builder.mutation({
      query: (id) => ({
        url: `donation/requested/complete/${id}`,
        method: 'put'
      }),
      invalidatesTags: ['getAllActivity', 'notifications'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateAllRequest = dispatch(
          requestApi.util.updateQueryData(
            'getAllRequest',
            undefined,
            (draftUser: any) => {
              const findRequest = draftUser.data.find(
                (item) => item.id === arg
              );
              findRequest.status = 'completed';
            }
          )
        );
        const updateSingleRequest = dispatch(
          requestApi.util.updateQueryData(
            'getRequest',
            arg.id,
            (draftUser: any) => {
              draftUser.data.status = 'completed';
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (err) {
          updateAllRequest.undo();
          updateSingleRequest.undo();
        }
      }
    }),
    updateRequest: builder.mutation({
      query: (username) => ({
        url: `/user/promote`,
        method: 'Post',
        body: { username }
      }),
      invalidatesTags: ['getAllActivity', 'notifications'],
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
    }),
    findDonor: builder.mutation({
      query: (body) => ({
        url: `/donation/requested/find-donor`,
        method: 'Post',
        body: body
      })
    })
  })
});

export const {
  useAddRequestMutation,
  useGetAllRequestQuery,
  useGetRequestQuery,
  useRemoveRequestMutation,
  useUpdateRequestMutation,
  useApproveRequestMutation,
  useHoldStatusRequestMutation,
  useDeclineRequestMutation,
  useMakeProgressRequestMutation,
  useAssignDonorRequestMutation,
  useFindDonorMutation,
  useCompleteRequestMutation,
  useGetAllActivityQuery,
  useGetUserRequestContributionQuery
} = requestApi;
