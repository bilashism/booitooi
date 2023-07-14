import { Outlet } from 'react-router-dom';

import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const MainLayout = () => (
  <div>
    <Navbar />
    <div className="pt-16">
      <Outlet />
    </div>
    <Footer />
  </div>
);
