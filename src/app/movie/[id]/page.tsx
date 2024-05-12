'use client'
import MovieContainer from '@/components/MovieContainer';
import VideoPlayer from '@/components/VideoPlayer';
import { getImagePath } from '@/lib/getImagePath';
import {
  
} from '@/lib/getMovies';
import { Metadata } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import jsonData from '@/data.json';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

interface Props {
  params: {
    name: string;
  };
}

const MovieDetails = async ({ params: id }: any) => {
  console.log(id);
  id = decodeURIComponent(id.id);
  const movie: any = jsonData.find((movie) => movie.Series_Title === id);
  const index = movie.Poster_Link.indexOf('_V');

  if (index !== -1) {
    movie.Poster_Link = movie.Poster_Link.substring(0, index) + '.jpg';
  }

  const handleMovie = async () => {
    console.log('Movie Watched');
    const res = await fetch('http://localhost:8000/savemovie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 'asgasasdasdasdasda',
        movie: movie.Series_Title,
      }),
    });
  };

  return (
    <div>
      <div className="px-10">
        <div className="py-10 flex flex-col lg:flex-row items-center gap-0">
          <div className="w-[33rem]  min-h-96 rounded-md overflow-hidden group">
            <Image
              src={movie.Poster_Link}
              alt={movie?.Series_Title}
              width={1920}
              height={108}
              className="w-[30rem] h-full object-cover shadow-md shadow-gray-900 drop-shadow-xl group-hover:scale-110 duration-500"
            loading='lazy'
      />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold  decoration-[1px]">
              {movie?.Series_Title}
            </h2>
            <p className="text-m leading-6 tracking-wide mt-3">
              {movie?.Overview}
            </p>
            <p className="text-200 text-m">
              IMDB: <span className=" font-medium">{movie.IMDB_Rating}</span>
            </p>
            <p className="text-200 text-m">
              Votes: <span className=" font-medium">{movie.No_of_Votes}</span>
            </p>
            <p className="text-200 text-m">
              Release Year:{' '}
              <span className=" font-medium">{movie.Released_Year}</span>
            </p>
            <p className="text-200 text-m">
              Genres:{' '}
              <span className=" font-medium mr-1">
                {movie?.Genre?.split(',')},
              </span>
            </p>
            <p className="text-200 text-m">
              BOX Office: <span className=" font-medium"> $ {movie.Gross}</span>
            </p>
            <div className="mt-3 flex">
              <Button
                variant={'secondary'}
                className="flex gap-2"
                onClick={handleMovie}
              >
                Watched <Video size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
