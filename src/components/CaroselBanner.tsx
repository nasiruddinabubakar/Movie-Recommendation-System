import { getDiscoverMovies } from "@/lib/getMovies";
import HeroCarousel from "./HeroCarousel";

interface Props {
  id?: string;
  movies?: any[];
  keywords?: string;
}

const CaroselBanner = async ({ id, movies, keywords }: Props) => {
  // const movies = await getDiscoverMovies(id, keywords);

  return <HeroCarousel movies={movies}/>;
};

export default CaroselBanner;
