import { signOut } from 'firebase/auth';
import { ReactNode } from 'react';
import { toast } from 'react-hot-toast';
import { Navigate, useLocation, useParams } from 'react-router-dom';

import { IBook } from '../components/BookCard';
import { auth } from '../lib/firebase';
import { useGetSingleBookQuery } from '../redux/features/books/bookApi';
import { setUser } from '../redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface IProps {
  children: ReactNode;
}

export const AuthorRoute = ({ children }: IProps) => {
  const { user, isLoading: isAuthLoading } = useAppSelector(
    (state) => state.user
  );
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const { id } = useParams();

  if (!id) {
    toast('Book ID not found');
  }
  const { data, isLoading: isBookLoading } = useGetSingleBookQuery(id);

  if (isAuthLoading || isBookLoading) {
    return <p>Loading...</p>;
  }
  const { authorId } = data?.data as IBook;
  if (!authorId) {
    toast('Author ID not found');
  }
  // if (!user?.id && !isLoading) {
  //   return (
  //     <Navigate
  //       to="/login"
  //       state={{
  //         path: pathname,
  //       }}
  //       replace
  //     />
  //   );
  // }
  if (user?.id !== authorId) {
    signOut(auth).then(() => {
      dispatch(setUser(null));
      toast('You are not authorized to perform this action');
    });
    return (
      <Navigate
        to="/login" // Replace with the appropriate route for unauthorized access
        replace
      />
    );
  }
  return children;
};
