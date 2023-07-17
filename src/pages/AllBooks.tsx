/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, EventHandler, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { BookCard, IBook } from '../components/BookCard';
import { BookSearch } from '../components/BookSearch';
import { useGetBooksQuery } from '../redux/features/books/bookApi';
import { setPriceRange } from '../redux/features/books/bookSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface BookSearchFormInputs {
  searchTerm: string;
}
export const AllBooks = () => {
  const [productsData, setProductsData] = useState<IBook[]>();
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  const { status, priceRange } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();

  const [books, setBooks] = useState<IBook[]>([]);

  const handleSearch = (query: string) => {
    const filteredBooks = data?.data?.filter(
      (book: IBook) =>
        book.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        book.author.toLowerCase().includes(query.trim().toLowerCase()) ||
        book.genre.toLowerCase().includes(query.trim().toLowerCase())
    ) as IBook[];
    setBooks(filteredBooks);
  };

  return (
    <section>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold underline underline-offset-8 pb-4 mb-12">
          All Books
        </h2>

        <div className="flex 2xl:flex-nowrap gap-10">
          <div className="max-w-xs w-full">
            <BookSearch onSearch={handleSearch} />
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
