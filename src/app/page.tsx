
import CaroselBanner from '@/components/CaroselBanner';
import MovieContainer from '@/components/MovieContainer';
import {
 fetcher,
 getRecommendedMovies
} from '@/lib/getMovies';
import jsonData from '@/data.json';
import { useEffect, useState } from 'react';
import { LogIn } from 'lucide-react';
import Login from '@/components/Login';
import { useRouter } from 'next/router';

export default async function Home() {

  const modifiedData = jsonData.map((movie, index) => {
    if (movie.Poster_Link && typeof movie.Poster_Link === 'string') {
      const index = movie.Poster_Link.indexOf('_V');

      if (index !== -1) {
        movie.Poster_Link = movie.Poster_Link.substring(0, index) + '.jpg';
      }
    }

    return {
      ...movie,
      id: index + 1,
    };
  });

  const carosalMovies = modifiedData.slice(1, 6);

  let Recommended = await getRecommendedMovies();
  console.log(Recommended);
  const moviesNew = modifiedData.filter((movie) => Recommended?.includes(movie.Series_Title));
  Recommended = moviesNew;
  const Classics = modifiedData.filter((movie) => movie.Genre?.includes('Thriller'));
  const Drama = modifiedData.filter((movie:any) => movie.Genre?.includes('Action'));
  // console.log(Drama);
  const TopRated = modifiedData.slice(5, 10);
  return (
    <main>
      <CaroselBanner movies={carosalMovies} />
      <div className="flex flex-col space-y-2">
        <MovieContainer
          movies={Recommended}
          title="Recommended For You"
        />
        <MovieContainer movies={Classics} title="Classics" />
        <MovieContainer movies={TopRated} title="Top Rated" />
        <MovieContainer movies={Drama} title="Action" />
      </div>
    </main>
  );
}
