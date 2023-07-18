/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  Link,
  Navigate,
  useNavigate,
  useNavigation,
  useParams,
} from 'react-router-dom';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import { IBook } from '../components/BookCard';
import { LoadingCircle } from '../components/LoadingCircle';
import { Modal } from '../components/Modal';
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from '../redux/features/books/bookApi';
import { useAppSelector } from '../redux/hooks';
import { lazyNamed } from '../utils/lazyNamed';

const WriteReview = lazyNamed(
  'WriteReview',
  () => import('../components/WriteReview')
);
interface RouteParams {
  id: string;
}
type CustomError = (FetchBaseQueryError | SerializedError) & {
  data?: {
    message?: string;
  };
};

export const SingleBook = () => {
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBook, { isError, isSuccess }] = useDeleteBookMutation();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetSingleBookQuery(id as string, {
    pollingInterval: 10000,
    refetchOnMountOrArgChange: true,
  });
  // const { data: reviewsData } = useGetReviewsQuery(id as string, {
  //   // pollingInterval: 5000,
  //   refetchOnMountOrArgChange: true,
  // });
  // console.log({ reviewsData });

  const { user } = useAppSelector((state) => state.user);

  if (isLoading) {
    return <LoadingCircle />;
  }
  if (error) {
    toast('Something went wrong');
  }
  if (!data?.data) {
    return (
      <div className="text-center pt-20 font-bold text-red-500">
        Book not found
      </div>
    );
  }
  const {
    title,
    author,
    genre,
    publicationDate,
    description,
    reviews,
    authorId,
  } = data?.data as IBook;

  const handleBookDelete = () => {
    if (!user?.id) {
      toast('You are not logged in');
      return;
    }
    if (user?.id !== authorId) {
      toast('You are not allowed to delete');
      return;
    }

    deleteBook({ id }).then((response) => {
      if ('error' in response) {
        const lala = response.error as CustomError;
        toast(lala?.data?.message as string);
      } else {
        toast(response.data?.message);
        navigate('/books');
      }
    });
  };

  return (
    <section className="pt-14">
      <div className="container mx-auto px-4  ">
        <div className="grid 2xl:grid-cols-12 gap-8">
          <div className="2xl:col-span-8 max-w-3xl">
            {/* <a href="#">
        <img
          className="rounded-t-lg"
          src="https://dummyimage.com/382x380.png"
          alt=""
        />
      </a> */}
            <div className="p-5 border border-gray-200 rounded-lg shadow">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                <a href="#" className="">
                  {title}
                </a>
              </h5>
              <h6 className="mb-2 text-lg tracking-tight text-gray-900 ">
                <small> by:</small>{' '}
                <a href="#" className="hover:underline">
                  {author}
                </a>
              </h6>
              <div className="flex flex-nowrap overflow-hidden text-gray-400 justify-between">
                <p className="bg-lime-900 px-1">{genre}</p> |
                <p className="">{publicationDate}</p>
              </div>
              <p className="py-3 font-normal text-gray-700 dark:text-gray-400">
                {description}
              </p>
              <div className="flex flex-wrap gap-4 justify-between">
                <Link
                  to={`/edit-book/${id}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit book
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    if (!user?.id) {
                      toast('You are not logged in');
                    } else {
                      setShowDeleteModal(true);
                    }
                  }}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Delete book
                </button>
              </div>
            </div>

            {reviews && reviews?.length > 0 ? (
              <div className="flex flex-col gap-8 pt-12">
                <h4 className="text-lg font-bold">Reviews from readers</h4>
                {[...reviews].reverse().map((review, idx) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    className="flex flex-col gap-3 p-3 border border-gray-100 rounded shadow-sm"
                  >
                    <div className="flex flex-wrap gap-4 justify-between">
                      <div className="">reviewer: {review.reviewer}</div>
                      <div className="">rating: {review.rating}</div>
                    </div>
                    <div className="">{review.content}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center pt-5">No reviews yet!</div>
            )}
          </div>

          <div className="2xl:col-span-4">
            {user && user?.uid ? (
              <div className="">
                <h4 className="">Write a review</h4>
                <WriteReview bookId={id as string} />
              </div>
            ) : (
              <div className="">
                <h4 className="">Please login to write a review</h4>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <div className="bg-white border border-gray-300 xl:w-2/6 w-full relative z-30 xl:px-14 lg:px-28 md:px-16 px-4 py-10 grid items-center justify-center overflow-hidden  rounded-md">
          <div className=" text-center">
            <div className="flex gap-4 flex-col items-center flex-wrap justify-center">
              <h2 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 mt-3">
                <span className="text-red-600">Delete</span>{' '}
                <span className=" capitalize">"{title}"</span>?
              </h2>
              <h6 className="mb-2 text-lg tracking-tight text-gray-900 ">
                By:{' '}
                <a href="#" className="hover:underline text-purple-700">
                  {author}
                </a>
              </h6>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 mt-8">
            <button
              type="button"
              onClick={handleBookDelete}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              Delete
            </button>

            <button
              type="button"
              aria-label="no thanks"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
