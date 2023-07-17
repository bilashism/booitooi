import { useState } from 'react';

import { BookCard, IBook } from '../components/BookCard';
import { useGetBooksQuery } from '../redux/features/books/bookApi';

export const RecentlyAddedBooks = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);

  return (
    <section>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold underline underline-offset-8 pb-4 mb-12">
          Recently Added Books
        </h2>
        <div className="flex flex-wrap justify-center gap-16">
          {!isLoading
            ? data?.data
                ?.slice(0, 10)
                .map((book: IBook) => <BookCard key={book.id} book={book} />)
            : false}
        </div>
      </div>
    </section>
  );
};
