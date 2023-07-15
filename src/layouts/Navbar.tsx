import { signOut } from 'firebase/auth';
import { NavLink } from 'react-router-dom';

import { Logo } from '../components/Logo';
import { auth } from '../lib/firebase';
import { setUser } from '../redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
  };
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="container flex items-center justify-between w-full h-full mx-auto px-2 2xl:px-4 ">
          <Logo />
          <ul className="flex items-center gap-2 2xl:gap-3">
            <li className="hover:underline underline-offset-8 hover:text-purple-600 transition-colors active:text-purple-800">
              <NavLink to="/" className="[&.active]:text-purple-800">
                Home
              </NavLink>
            </li>
            <li className="hover:underline underline-offset-8 hover:text-purple-600 transition-colors active:text-purple-800">
              <NavLink to="/books" className="[&.active]:text-purple-800">
                All Books
              </NavLink>
            </li>

            {!user?.email ? (
              <>
                <li className="hover:underline underline-offset-8 hover:text-purple-600 transition-colors active:text-purple-800">
                  <NavLink to="/login" className="[&.active]:text-purple-800">
                    Login
                  </NavLink>
                </li>
                <li className="hover:underline underline-offset-8 hover:text-purple-600 transition-colors active:text-purple-800">
                  <NavLink
                    to="/signup"
                    className="[&.active]:text-purple-800 border border-purple-500 rounded-md px-2 py-1"
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="hover:underline underline-offset-8 hover:text-purple-600 transition-colors active:text-purple-800">
                <button
                  type="button"
                  onClick={handleLogOut}
                  className="cursor-pointer"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
