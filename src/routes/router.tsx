import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { App } from '../App';
import { NotFound } from '../pages/NotFound';
import { lazyNamed } from '../utils/lazyNamed';

import { PrivateRoute } from './PrivateRoute';

const Home = lazyNamed('Home', () => import('../pages/Home'));

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
        path: '/private',
        element: (
          <PrivateRoute>
            <h2>private route </h2>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
