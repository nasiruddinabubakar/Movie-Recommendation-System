import CaroselBanner from "@/components/CaroselBanner";
import MovieContainer from "@/components/MovieContainer";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/getMovies";
import jsonData from '@/data.json'

export default async function Home() {

const modifiedData = jsonData.map((movie,index) => {
  
  if (movie.Poster_Link && typeof movie.Poster_Link === 'string') {
    
      const index = movie.Poster_Link.indexOf('_V');
      
      if (index !== -1) {
          movie.Poster_Link = movie.Poster_Link.substring(0, index) + '.jpg';
      }
  }
  
  return {
      ...movie,
      id:index+1
  };
});

  const carosalMovies = modifiedData.slice(1,6);
  const Recommended = await getNowPlayingMovies();
  const Classics = modifiedData.filter((movie) => movie.Genre === "Comedy");
  const Drama = modifiedData.filter((movie) => movie.Genre === "Drama");
  const TopRated = modifiedData.slice(5,10);
  return (
    <main>
      <CaroselBanner movies={carosalMovies}/>
      <div className="flex flex-col space-y-2">
        <MovieContainer movies={[]} title="Recommended For You" />
        <MovieContainer movies={Classics}  title="Classics" />
        <MovieContainer movies = {TopRated} title="Top Rated" />
        <MovieContainer movies={Drama}  title="Drama" />
      </div>
    </main>
  );
}
