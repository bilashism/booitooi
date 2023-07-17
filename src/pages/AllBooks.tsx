/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEventHandler } from 'react';

import { BookCard, IBook } from '../components/BookCard';
import { useGetBooksQuery } from '../redux/features/books/bookApi';
import {
  setSearchGenre,
  setSearchTerm,
  setSearchYear,
} from '../redux/features/books/bookSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { BOOK_GENRE_LIST } from '../utils/utils';

interface BookSearchFormInputs {
  searchTerm: string;
}
export const AllBooks = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  const { searchTerm, searchGenre, searchYear } = useAppSelector(
    (state) => state.book
  );
  const dispatch = useAppDispatch();
  const uniqueYears = Array.from(
    new Set(
      data?.data?.map(
        (item: IBook) => item.publicationDate.slice(0, 4) as string
      )
    )
  ) as string[];
  let books;

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (ev) => {
    dispatch(setSearchTerm(ev?.target.value));
  };
  const handleGenreChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
    dispatch(setSearchGenre(ev.target.value));
  };
  const handleYearChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
    dispatch(setSearchYear(ev.target.value));
  };
  books = data?.data;

  if (searchTerm) {
    const filteredBooks = data?.data?.filter(
      (book: IBook) =>
        book.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.trim().toLowerCase())
    ) as IBook[];
    books = filteredBooks;
  }
  if (searchGenre) {
    const filteredBooks = data?.data?.filter((book: IBook) =>
      book.genre.toLowerCase().includes(searchGenre.trim().toLowerCase())
    ) as IBook[];
    books = filteredBooks;
  }
  if (searchYear) {
    const filteredBooks = data?.data?.filter((book: IBook) =>
      book.publicationDate.includes(searchYear.trim().toLowerCase())
    ) as IBook[];
    books = filteredBooks;
  }
  if (searchGenre && searchYear) {
    const filteredBooks = data?.data?.filter(
      (book: IBook) =>
        book.genre.toLowerCase().includes(searchGenre.trim().toLowerCase()) &&
        book.publicationDate.includes(searchYear.trim().toLowerCase())
    ) as IBook[];
    books = filteredBooks;
  }

  return (
    <section>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold underline underline-offset-8 pb-4 mb-12">
          All Books
        </h2>

        <div className="flex 2xl:flex-nowrap gap-10">
          <div className="max-w-xs w-full flex flex-col gap-4">
            <div className="">
              <input
                type="text"
                // list="book-genre-datalist"
                className="w-full h-full border border-slate-300 px-4 py-2 rounded"
                onChange={handleSearch}
                placeholder="Search..."
              />
              {/* <datalist id="book-genre-datalist">
                {BOOK_GENRE_LIST.map((genre) => (
                  <option key={`${genre}`.replaceAll(' ', '')} value={genre}>
                    {genre}
                  </option>
                ))}
              </datalist> */}
            </div>
            <h4 className="">Filters</h4>

            <div className="">
              <select
                onChange={handleGenreChange}
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                name="filter-genre"
              >
                <option value="">Select genre</option>
                {BOOK_GENRE_LIST.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
              <select
                onChange={handleYearChange}
                className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                name="filter-year"
              >
                <option value="">Select year</option>
                {uniqueYears.map((year: string) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-start gap-16">
            {!isLoading
              ? books?.map((book: IBook) => (
                  <BookCard key={book.id} book={book} />
                ))
              : false}
          </div>
        </div>
      </div>
    </section>
  );
};
