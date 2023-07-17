import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractStringsFromParentheses = (text: string): string => {
  const regex = /\((.*?)\)/g;
  const matches = text.match(regex);
  const str = '';
  if (matches) {
    return str.concat(
      matches.map((match) => match.replace(/[()]/g, '')).toString()
    );
  }
  return str;
};
export const BOOK_GENRE_LIST: string[] = [
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
