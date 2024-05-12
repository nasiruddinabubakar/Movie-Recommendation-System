import { SearchResults } from "../../type";
export const fetcher = async (cacheTime?: number) => {


  const options: RequestInit = {
    method: "POST",
    headers: {
      accept: "application/json",
     
    },
    body: JSON.stringify({
      user_id: 'asgasasdasdasdasda',
    }),
    next: {
      revalidate: cacheTime || 60 * 60 * 24,
    },
  };

  const response = await fetch("http://localhost:8000/get-user-movies", options);
  const data = (await response.json()) ;

  return data;
};

export const getRecommendedMovies = async () => {
  try {
  const response = await  fetch("http://localhost:8000/get-user-movies",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 'asgasasdasdasdasda',
      }),
      next: {
        revalidate:1,
      },
  });
  console.log("hello 123");
  const data = await response.json();
  console.log(data);
  return data;
} catch (error) {
  console.log(error);
 
};
}

