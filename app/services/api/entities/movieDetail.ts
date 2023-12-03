export interface IMovieDetail {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: IMovieProductionCompany[]
  production_countries: IMovieProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: IMovieSpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  credits: IMovieCredits
  videos: IMovieVideos
}

interface IMovieProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

interface IMovieProductionCountry {
  iso_3166_1: string
  name: string
}

interface IMovieSpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

interface IMovieCredits {
  cast: IMovieCast[]
  crew: IMovieCrew[]
}

interface IMovieCast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

interface IMovieCrew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  credit_id: string
  department: string
  job: string
}

interface IMovieVideos {
  results: {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
  }[]
}
