import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

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
        <div className="container flex items-center justify-between w-full h-full mx-auto ">
          <Link
            to="/"
            className="inline-flex justify-center items-center px-2 py-2 w-8 h-8 shadow-lg shadow-orange-400 font-bold italic bg-purple-600 text-white rounded-full uppercase"
          >
            <span>BT</span>
          </Link>
          <div>
            <ul className="flex items-center gap-3">
              <li className="hover:underline underline-offset-8 hover:text-purple-600 transition-colors active:text-purple-800">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:underline underline-offset-8 hover:text-purple-600 transition-colors active:text-purple-800">
                <Link to="/books">All Books</Link>
              </li>

              {!user?.email ? (
                <>
                  <li className="hover:underline underline-offset-8 hover:text-purple-600 transition-colors active:text-purple-800">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="hover:underline underline-offset-8 hover:text-purple-600 transition-colors active:text-purple-800">
                    <Link to="/signup">Signup</Link>
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
      </div>
    </nav>
  );
};
