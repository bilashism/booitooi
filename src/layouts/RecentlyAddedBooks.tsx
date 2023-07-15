import { useState } from 'react';

import { BookCard } from '../components/BookCard';

export const RecentlyAddedBooks = () => {
  const [first, setFirst] = useState(0);
  return (
    <section>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold underline underline-offset-8 pb-4 mb-12">
          Recently Added Books
        </h2>
        <div className="flex flex-wrap justify-center gap-16">
          {Array.from(Array(10)).map((newItem, id) => (
            // eslint-disable-next-line react/no-array-index-key
            <BookCard key={id + 1} book={{ name: `Book ${id + 1}` }} />
          ))}
        </div>
      </div>
    </section>
  );
};
