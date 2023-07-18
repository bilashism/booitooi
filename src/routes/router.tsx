import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { App } from '../App';
import { NotFound } from '../pages/NotFound';
import { lazyNamed } from '../utils/lazyNamed';

const PrivateRoute = lazyNamed('PrivateRoute', () => import('./PrivateRoute'));
const AuthorRoute = lazyNamed('AuthorRoute', () => import('./AuthorRoute'));
const Home = lazyNamed('Home', () => import('../pages/Home'));
const SignIn = lazyNamed('SignIn', () => import('../pages/SignIn'));
const SignUp = lazyNamed('SignUp', () => import('../pages/SignUp'));
const AllBooks = lazyNamed('AllBooks', () => import('../pages/AllBooks'));
const AddNewBook = lazyNamed('AddNewBook', () => import('../pages/AddNewBook'));
const SingleBook = lazyNamed('SingleBook', () => import('../pages/SingleBook'));
const EditBook = lazyNamed('EditBook', () => import('../pages/EditBook'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: '/signup',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: '/books',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AllBooks />
          </Suspense>
        ),
      },
      {
        path: '/books/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SingleBook />
          </Suspense>
        ),
      },
      {
        path: '/add-new-book',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute>
              <AddNewBook />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: '/edit-book/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute>
              <AuthorRoute>
                <EditBook />
              </AuthorRoute>
            </PrivateRoute>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
