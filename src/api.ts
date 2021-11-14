const API_KEY: string = "962cebc1820ada99a807125b7f1fdcbf";
const BASE_PATH: string = "https://api.themoviedb.org/3";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieResult {
  dates: { maximum: string; minimum: string };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface ITV {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface ITVDetail {
  backdrop_path: string;
  created_by: {
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  next_episode_to_air: string | null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ITVResult {
  page: number;
  results: ITV[];
  total_pages: number;
  total_results: number;
}

export const getData = ({
  tvOrMovie,
  category,
  pageNum,
}: {
  tvOrMovie: string;
  category: string;
  pageNum?: number;
}) => {
  return fetch(
    `${BASE_PATH}/${tvOrMovie}/${category}?api_key=${API_KEY}&page=${
      pageNum ? pageNum : 1
    }`
  ).then((res) => res.json());
};

export const getDataDetail = ({
  tvOrMovie,
  id,
}: {
  tvOrMovie: string;
  id: string;
}) => {
  return fetch(`${BASE_PATH}/${tvOrMovie}/${id}?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
};

export const getSearchData = ({
  tvOrMovie,
  query,
  pageNum,
}: {
  tvOrMovie: string;
  query: string;
  pageNum?: number;
}) => {
  return fetch(
    `${BASE_PATH}/search/${tvOrMovie}?api_key=${API_KEY}&query=${query}&page=${
      pageNum ? pageNum : 1
    }`
  ).then((res) => res.json());
};
