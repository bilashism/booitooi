import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { Logo } from '../components/Logo';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface AddNewBookFormInputs {
  [key: string]: string | AddNewBookFormInputs;
  title: string;
  author: string;
  authorId: string;
  genre: string;
  publicationDate: string;
  description: string;
}

function trimObjectProperties(
  formData: AddNewBookFormInputs
): AddNewBookFormInputs {
  return Object.keys(formData).reduce(
    (trimmedData: AddNewBookFormInputs, key: string) => {
      const value = formData[key];

      if (typeof value === 'string') {
        trimmedData[key] = value.trim();
      } else if (typeof value === 'object' && value !== null) {
        trimmedData[key] = trimObjectProperties(value);
      } else {
        trimmedData[key] = value;
      }

      return trimmedData;
    },
    {} as AddNewBookFormInputs
  );
}

const BOOK_GENRE_LIST: string[] = [
  'Fantasy',
  'Science Fiction',
  'Mystery',
  'Thriller',
  'Romance',
  'Young Adult',
  'Children',
  'Literary Fiction',
  'Historical',
  'Dystopian',
];
export const AddNewBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddNewBookFormInputs>();
  const { user } = useAppSelector((state) => state.user);
  const onSubmit = (formData: AddNewBookFormInputs) => {
    axios({
      method: 'post',
      url: `http://localhost:5000/api/v1/books/`,
      headers: {
        authorization: `${user.accessToken}`,
      },
      data: trimObjectProperties(formData),
    })
      .then((data) => {
        toast(`${data?.data?.message}`);
        reset();
      })
      .catch((error) => {
        toast(`Something went wrong! ${error?.message}`);
      });
  };

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="w-full px-4">
          <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
            <div className="mb-10 text-center md:mb-16">
              <Logo />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <input
                type="hidden"
                value={user.id}
                readOnly
                hidden
                aria-hidden
                {...register('authorId', {
                  required: 'Please enter your author id',
                })}
              />
              <input
                type="text"
                placeholder="Book name"
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                {...register('title', {
                  required: 'Please enter book title',
                })}
              />
              {errors.title && <p>{errors.title.message}</p>}
              <input
                type="text"
                placeholder="Author name"
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                {...register('author', {
                  required: 'Please enter author name',
                })}
              />
              {errors.author && <p>{errors.author.message}</p>}
              <datalist id="book-genre-datalist">
                {BOOK_GENRE_LIST.map((genre) => (
                  <option value={genre}>{genre}</option>
                ))}
              </datalist>
              <select
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                {...register('genre', {
                  required: 'Please select genre name',
                })}
              >
                <option value="">Please select genre name</option>
                {BOOK_GENRE_LIST.map((genre) => (
                  <option value={genre}>{genre}</option>
                ))}
              </select>
              {errors.genre && <p>{errors.genre.message}</p>}
              <input
                type="date"
                placeholder="Publication Date"
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                {...register('publicationDate', {
                  required: 'Please enter publication date',
                  pattern: {
                    value: /^(0?[1-9]|[12]\d|3[01])-(0?[1-9]|1[0-2])-\d{4}$/,
                    message: 'Date must be in the format DD-MM-YYYY',
                  },
                })}
              />
              {errors.publicationDate && (
                <p>{errors.publicationDate.message}</p>
              )}
              <textarea
                placeholder="description"
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                {...register('description', {
                  required: 'Please enter description',
                  minLength: {
                    value: 2,
                    message: 'Please enter description at least 2 characters',
                  },
                  maxLength: {
                    value: 120,
                    message:
                      'Description more than 120 characters are not allowed',
                  },
                })}
              />
              {errors.description && <p>{errors.description.message}</p>}
              <div className="mb-10">
                <button
                  className="border-primary w-full cursor-pointer rounded-md border bg-primary py-3 px-5 text-base text-white transition bg-purple-500 hover:bg-opacity-90"
                  type="submit"
                >
                  Add book
                </button>
              </div>
            </form>

            <div>
              <span className="absolute top-1 right-1 animate-pulse">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="1.39737"
                    cy="38.6026"
                    r="1.39737"
                    transform="rotate(-90 1.39737 38.6026)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="1.39737"
                    cy="1.99122"
                    r="1.39737"
                    transform="rotate(-90 1.39737 1.99122)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="13.6943"
                    cy="38.6026"
                    r="1.39737"
                    transform="rotate(-90 13.6943 38.6026)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="13.6943"
                    cy="1.99122"
                    r="1.39737"
                    transform="rotate(-90 13.6943 1.99122)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="25.9911"
                    cy="38.6026"
                    r="1.39737"
                    transform="rotate(-90 25.9911 38.6026)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="25.9911"
                    cy="1.99122"
                    r="1.39737"
                    transform="rotate(-90 25.9911 1.99122)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="38.288"
                    cy="38.6026"
                    r="1.39737"
                    transform="rotate(-90 38.288 38.6026)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="38.288"
                    cy="1.99122"
                    r="1.39737"
                    transform="rotate(-90 38.288 1.99122)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="1.39737"
                    cy="26.3057"
                    r="1.39737"
                    transform="rotate(-90 1.39737 26.3057)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="13.6943"
                    cy="26.3057"
                    r="1.39737"
                    transform="rotate(-90 13.6943 26.3057)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="25.9911"
                    cy="26.3057"
                    r="1.39737"
                    transform="rotate(-90 25.9911 26.3057)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="38.288"
                    cy="26.3057"
                    r="1.39737"
                    transform="rotate(-90 38.288 26.3057)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="1.39737"
                    cy="14.0086"
                    r="1.39737"
                    transform="rotate(-90 1.39737 14.0086)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="13.6943"
                    cy="14.0086"
                    r="1.39737"
                    transform="rotate(-90 13.6943 14.0086)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="25.9911"
                    cy="14.0086"
                    r="1.39737"
                    transform="rotate(-90 25.9911 14.0086)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="38.288"
                    cy="14.0086"
                    r="1.39737"
                    transform="rotate(-90 38.288 14.0086)"
                    fill="#3056D3"
                  />
                </svg>
              </span>
              <span className="absolute left-1 bottom-1 animate-pulse">
                <svg
                  width="29"
                  height="40"
                  viewBox="0 0 29 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="2.288"
                    cy="25.9912"
                    r="1.39737"
                    transform="rotate(-90 2.288 25.9912)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="14.5849"
                    cy="25.9911"
                    r="1.39737"
                    transform="rotate(-90 14.5849 25.9911)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="26.7216"
                    cy="25.9911"
                    r="1.39737"
                    transform="rotate(-90 26.7216 25.9911)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="2.288"
                    cy="13.6944"
                    r="1.39737"
                    transform="rotate(-90 2.288 13.6944)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="14.5849"
                    cy="13.6943"
                    r="1.39737"
                    transform="rotate(-90 14.5849 13.6943)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="26.7216"
                    cy="13.6943"
                    r="1.39737"
                    transform="rotate(-90 26.7216 13.6943)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="2.288"
                    cy="38.0087"
                    r="1.39737"
                    transform="rotate(-90 2.288 38.0087)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="2.288"
                    cy="1.39739"
                    r="1.39737"
                    transform="rotate(-90 2.288 1.39739)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="14.5849"
                    cy="38.0089"
                    r="1.39737"
                    transform="rotate(-90 14.5849 38.0089)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="26.7216"
                    cy="38.0089"
                    r="1.39737"
                    transform="rotate(-90 26.7216 38.0089)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="14.5849"
                    cy="1.39761"
                    r="1.39737"
                    transform="rotate(-90 14.5849 1.39761)"
                    fill="#3056D3"
                  />
                  <circle
                    cx="26.7216"
                    cy="1.39761"
                    r="1.39737"
                    transform="rotate(-90 26.7216 1.39761)"
                    fill="#3056D3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
