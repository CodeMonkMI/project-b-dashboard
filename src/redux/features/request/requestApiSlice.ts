import { apiSlice } from '../api/apiSlice';
import { loadDonor } from './requestSlice';

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
      query: (id) => ({
        url: `/donation/requested/${id}`,
        method: 'DELETE'
      }),
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
    assignDonorRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `donation/requested/assign/${id}`,
        method: 'put',
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updateRequest = dispatch(
          requestApi.util.updateQueryData(
            'getAllRequest',
            undefined,
            (draftUser: any) => {
              console.log(arg);
              const findRequest = draftUser.data.find(
                (item) => item.id === arg.id
              );

              findRequest.status = 'ready';
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
    holdStatusRequest: builder.mutation({
      query: (id) => ({
        url: `donation/requested/hold/${id}`,
        method: 'put'
      }),
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
    }),
    findDonor: builder.mutation({
      query: (body) => ({
        url: `/donation/requested/find-donor`,
        method: 'Post',
        body: body
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const data = await queryFulfilled;
          dispatch(loadDonor(data.data.data));
        } catch (err) {
          // there is an error
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
  useApproveRequestMutation,
  useHoldStatusRequestMutation,
  useDeclineRequestMutation,
  useMakeProgressRequestMutation,
  useAssignDonorRequestMutation,
  useFindDonorMutation
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
