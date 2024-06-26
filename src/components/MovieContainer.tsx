'use client';
import Link from 'next/link';
import { Movie } from '../../type';
import MovieCard from './MovieCard';
import { cn } from '@/lib/utils';
import jsonData from '../data.json';
import { Button } from './ui/button';
import { Video } from 'lucide-react';

type Props = {
  title?: string;
  movies?: any[];
  isVertical?: boolean;
};

const MovieContainer = ({ title, movies, isVertical }: Props) => {
  const handleMovie = async (movie:String) => {
    console.log('Movie Watched');
    const res = await fetch('http://localhost:8000/savemovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 'asgasasdasdasdasda',
        movie,
      }),
    });
  };
  console.log(movies);
  return (
    <div>
      <div className="mx-10 py-2 flex items-center justify-between border-b border-b-gray-500 relative mb-4">
        <h2 className="text-sm uppercase font-bold tracking-wider">{title}</h2>
        <Link
          href={{ pathname: '/viewmore', query: { title: title } }}
          className="bg-gray-800 text-xs text-white uppercase px-2 py-1 rounded-md border-indigo-600 font-semibold hover:bg-black duration-300"
        >
          View more
        </Link>
        <span className="w-16 h-1 bg-red-600 inline-block absolute left-0 -bottom-[1.5px] z-10" />
      </div>
      <div
        className={cn(
          'flex space-x-4 overflow-scroll px-5 lg:px-10 py-5 scrollbar-hide',
          isVertical && 'flex-col space-x-0 space-y-12'
        )}
      >
        {isVertical
          ? movies?.map((movie, index) => (
              <div
                key={index}
                className={cn(
                  isVertical &&
                    'flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5'
                )}
              >
                <MovieCard movie={movie} />
                <div className="max-w-2xl">
                  <p className="font-bold">{movie?.Series_Title}</p>
                  <hr className="mb-3" />
                  <p>{movie?.Overview}</p>
                  <div className="mt-4 flex">
                    <Button variant="secondary" className="flex gap-2" onClick={()=>handleMovie(movie?.Series_Title)}>
                      Watched <Video size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          : movies?.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
      </div>
    </div>
  );
};

export default MovieContainer;
