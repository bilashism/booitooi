import React, { useEffect, useState } from 'react';

import { BOOK_GENRE_LIST } from '../pages/AddNewBook';

interface SelectProps {
  onSelect: (query: string) => void;
}

export const GenreFilter: React.FC<SelectProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      onSelect(query);
    }, 100); // Adjust the delay as needed (e.g., 300ms)
    console.log('filter');
    return () => {
      clearTimeout(delayTimer);
    };
  }, [query, onSelect]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="">
      <select
        // defaultValue={query}
        onChange={handleChange}
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
    </form>
  );
};
