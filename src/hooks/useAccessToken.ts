import { useEffect, useState } from 'react';

import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const currentAccessToken = useAppSelector(
    (state: RootState) => state.user.user.accessToken
  );

  useEffect(() => {
    setAccessToken(currentAccessToken);
    localStorage.setItem('accessToken', currentAccessToken);
    console.log(currentAccessToken);
  }, [currentAccessToken]);

  return accessToken;
};

export default useAccessToken;
