import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const MainLayout = () => (
  <div>
    <ScrollRestoration />
    <Navbar />
    <div className="pt-16">
      <Outlet />
    </div>
    <Footer />
  </div>
);
