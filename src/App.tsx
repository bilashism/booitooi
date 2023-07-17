import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { MainLayout } from './layouts/MainLayout';
import { auth } from './lib/firebase';
import {
  IAuthenticatedUser,
  setLoading,
  setUser,
} from './redux/features/user/userSlice';
import { useAppDispatch } from './redux/hooks';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        console.log({ email: user.email, uid: user.uid });

        const {
          data: { data: savedData },
        } = await axios({
          method: 'get',
          url: `http://localhost:5000/api/v1/users/email/${user.email}`,
        });

        const loginData = await axios({
          method: 'post',
          url: 'http://localhost:5000/api/v1/auth/login',
          data: { email: user.email, uid: user.uid },
        });
        if (!loginData?.data?.data?.accessToken) return;
        const validUser: IAuthenticatedUser = {
          email: savedData.email,
          id: savedData.id,
          role: savedData.role,
          uid: savedData.uid,
          accessToken: loginData?.data?.data?.accessToken,
        };
        dispatch(setUser(validUser));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
};
