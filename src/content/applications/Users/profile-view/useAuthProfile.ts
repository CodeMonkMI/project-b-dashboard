import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useGetMeQuery } from 'src/redux/features/auth/authApiSlice';

const useAuthProfile = () => {
  const { pathname } = useLocation();
  const [isAuthProfile, setIsAuthProfile] = useState<boolean>(false);

  const { data: me, isSuccess } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && pathname === `/management/profile/${me.data.username}`) {
      setIsAuthProfile(true);
    }
  }, [me, isSuccess]);

  return { isAuthProfile, me: isSuccess ? me.data : null };
};

export default useAuthProfile;
