import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => (
  // console.log('object');

  <Link
    to="/"
    className="inline-flex justify-center items-center px-2 py-2 w-8 h-8 shadow-lg shadow-orange-400 font-bold italic bg-purple-600 text-white rounded-full uppercase"
  >
    <span>BT</span>
  </Link>
);
