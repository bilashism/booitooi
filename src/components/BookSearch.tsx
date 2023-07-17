import React, { useEffect, useState } from 'react';

import { BOOK_GENRE_LIST } from '../pages/AddNewBook';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const BookSearch: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      onSearch(query);
    }, 300); // Adjust the delay as needed (e.g., 300ms)

    return () => {
      clearTimeout(delayTimer);
    };
  }, [query, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="">
      <input
        type="text"
        list="book-genre-datalist"
        value={query}
        className="w-full h-full border border-slate-300 px-4 py-2 rounded"
        onChange={handleChange}
        placeholder="Search..."
      />
      <datalist id="book-genre-datalist">
        {BOOK_GENRE_LIST.map((genre) => (
          <option key={`${genre}`.replaceAll(' ', '')} value={genre}>
            {genre}
          </option>
        ))}
      </datalist>
    </form>
  );
};
