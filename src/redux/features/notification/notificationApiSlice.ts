import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<any, void>({
      query: () => ({
        url: '/notification',
        method: 'get'
      }),
      providesTags: ['notifications']
    })
  })
});

export const { useGetNotificationsQuery } = userApi;

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
