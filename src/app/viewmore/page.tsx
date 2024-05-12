import MovieContainer from "@/components/MovieContainer";
import {
  fetcher,
  getRecommendedMovies,
 
} from "@/lib/getMovies";
import jsonData from '@/data.json'
interface Props {
  searchParams: {
    title: string;
  };
}


const ViewMorePage = async ({ searchParams: { title } }: Props) => {
  let movies: any = null;
  const modifiedData = jsonData.map(movie => {
  
    if (movie.Poster_Link && typeof movie.Poster_Link === 'string') {
      
        const index = movie.Poster_Link.indexOf('_V');
        
        if (index !== -1) {
            movie.Poster_Link = movie.Poster_Link.substring(0, index) + '.jpg';
        }
    }
    
    return movie;
  });

  if (title === "Recommended For You") {
    movies = await getRecommendedMovies();
    console.log(movies);
    const moviesNew = modifiedData.filter((movie) => movies?.includes(movie.Series_Title));
    movies = moviesNew;
  } else if (title === "Classics") {
    movies = modifiedData.filter((movie) => movie.Genre === "Comedy");
  } else if (title === "Top Rated") {
    movies = modifiedData.slice(5,10);
  } else if (title === "Drama") {
    movies =  modifiedData.filter((movie) => movie.Genre === "Drama");
  }

  return (
    <div className="py-10">
      <h2 className="text-4xl font-bold px-10 mb-5">Results of {title}</h2>
      <MovieContainer movies={movies} isVertical={true} />
    </div>
  );
};

export default ViewMorePage;
