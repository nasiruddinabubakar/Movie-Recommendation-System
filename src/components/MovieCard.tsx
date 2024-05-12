'use client';
import { Movie } from '../../type';
import Image from 'next/image';
import { getImagePath } from '@/lib/getImagePath';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';
import { Button } from './ui/button';
import { Video } from 'lucide-react';

const MovieCard = ({ movie }: { movie: any }) => {
  const router = useRouter();
  const hanldeRoute = () => {
    router.push(`/movie/${movie?.Series_Title}`);
  };
  return (
    <div
      onClick={hanldeRoute}
      className="relative flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-300 dark:to-[#1A1C29]/80 z-10" />
      <p className="absolute z-20 bottom-5 left-5">{movie?.Series_Title}</p>
      <Image
        src={movie.Poster_Link}
        alt={movie?.Series_Title}
        width={1920}
        height={1080}
        className="w-fit lg:min-w-[400px] h-56 object-contain shadow-md bg-black shadow-gray-900 drop-shadow-xl"
      />
      
    </div>
  );
};

export default MovieCard;
