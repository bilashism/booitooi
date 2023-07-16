import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { MainLayout } from './layouts/MainLayout';
import { auth } from './lib/firebase';
import { setLoading, setUser } from './redux/features/user/userSlice';
import { useAppDispatch } from './redux/hooks';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        dispatch(setUser(user.email));
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
