import CaroselBanner from "@/components/CaroselBanner";
import MovieContainer from "@/components/MovieContainer";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/getMovies";

export default async function Home() {
  const nowPlayingMovies = await getNowPlayingMovies();
  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main>
      <CaroselBanner />
      <div className="flex flex-col space-y-2">
        <MovieContainer movies={nowPlayingMovies} title="Recommended For You ❤" />
        <MovieContainer movies={upcomingMovies} title="Upcoming ⬇" />
        <MovieContainer movies={topRatedMovies} title="Top Rated 🌟" />
        <MovieContainer movies={popularMovies} title="Popular ↗" />
      </div>
    </main>
  );
}
