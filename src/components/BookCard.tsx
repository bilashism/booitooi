/* eslint-disable jsx-a11y/anchor-is-valid */

import { FC } from 'react';
import { Link } from 'react-router-dom';

export type IBookLabel = 'for sale' | 'sold out';

export type IBookGenre =
  | 'Fantasy'
  | 'Science Fiction'
  | 'Mystery'
  | 'Thriller'
  | 'Romance'
  | 'Young Adult'
  | 'Children'
  | 'Literary Fiction'
  | 'Historical'
  | 'Dystopian';

export type IBookFilters = {
  searchTerm?: string;
  maxPrice?: number;
  minPrice?: number;
};
export type IBookReview = {
  reviewer: string;
  rating: number;
  content: string;
};
export type IBook = {
  id: string;
  title: string;
  author: string;
  authorId: string;
  description: string;
  publicationDate: string;
  genre: IBookGenre;
  label?: IBookLabel;
  reviews?: IBookReview[];
};
export type BookCardProps = {
  book: IBook;
};

export const BookCard: FC<BookCardProps> = ({ book }) => {
  const { title, author, genre, publicationDate, description, id } = book;
  return (
    <div className="max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* <a href="#">
        <img
          className="rounded-t-lg"
          src="https://dummyimage.com/382x380.png"
          alt=""
        />
      </a> */}
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <Link to={`/books/${id}`} className="">
            {title}
          </Link>
        </h5>
        <h6 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
          <small> by:</small> <span className="hover:underline">{author}</span>
        </h6>
        <div className="flex flex-nowrap overflow-hidden text-gray-400 justify-between">
          <p className="bg-lime-900 px-1">{genre}</p> |
          <p className="">{publicationDate}</p>
        </div>
        <p className="py-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <Link
          to={`/books/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span className="">Details</span>
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
