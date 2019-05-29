import axios from 'axios';

/**
 * API url
 */
const apiUrl = 'https://api.themoviedb.org/3';

/**
 * Image url
 */
export const apiImgUrl = 'https://image.tmdb.org/t/p';

/**
 * Different types of lists
 */
const lists = {
  movie: [
    { title: 'Trending Movies', query: 'trending' },
    { title: 'Popular Movies', query: 'popular' },
    { title: 'Top Rated Movies', query: 'top_rated' },
    { title: 'Upcoming Movies', query: 'upcoming' },
    { title: 'Now Playing Movies', query: 'now_playing' },
  ],
  tv: [
    { title: 'Trending TV Shows', query: 'trending' },
    { title: 'Popular TV Shows', query: 'popular' },
    { title: 'Top Rated TV Shows', query: 'top_rated' },
    { title: 'Currently Airing TV Shows', query: 'on_the_air' },
    { title: 'TV Shows Airing Today', query: 'airing_today' },
  ],
};

/**
 * Different languages with full name
 */
export const languages = [
  { 'iso_639_1': 'xx', 'english_name': 'No Language' },
  { 'iso_639_1': 'aa', 'english_name': 'Afar' },
  { 'iso_639_1': 'af', 'english_name': 'Afrikaans' },
  { 'iso_639_1': 'ak', 'english_name': 'Akan' },
  { 'iso_639_1': 'an', 'english_name': 'Aragonese' },
  { 'iso_639_1': 'as', 'english_name': 'Assamese' },
  { 'iso_639_1': 'av', 'english_name': 'Avaric' },
  { 'iso_639_1': 'ae', 'english_name': 'Avestan' },
  { 'iso_639_1': 'ay', 'english_name': 'Aymara' },
  { 'iso_639_1': 'az', 'english_name': 'Azerbaijani' },
  { 'iso_639_1': 'ba', 'english_name': 'Bashkir' },
  { 'iso_639_1': 'bm', 'english_name': 'Bambara' },
  { 'iso_639_1': 'bi', 'english_name': 'Bislama' },
  { 'iso_639_1': 'bo', 'english_name': 'Tibetan' },
  { 'iso_639_1': 'br', 'english_name': 'Breton' },
  { 'iso_639_1': 'ca', 'english_name': 'Catalan' },
  { 'iso_639_1': 'cs', 'english_name': 'Czech' },
  { 'iso_639_1': 'ce', 'english_name': 'Chechen' },
  { 'iso_639_1': 'cu', 'english_name': 'Slavic' },
  { 'iso_639_1': 'cv', 'english_name': 'Chuvash' },
  { 'iso_639_1': 'kw', 'english_name': 'Cornish' },
  { 'iso_639_1': 'co', 'english_name': 'Corsican' },
  { 'iso_639_1': 'cr', 'english_name': 'Cree' },
  { 'iso_639_1': 'cy', 'english_name': 'Welsh' },
  { 'iso_639_1': 'da', 'english_name': 'Danish' },
  { 'iso_639_1': 'de', 'english_name': 'German' },
  { 'iso_639_1': 'dv', 'english_name': 'Divehi' },
  { 'iso_639_1': 'dz', 'english_name': 'Dzongkha' },
  { 'iso_639_1': 'eo', 'english_name': 'Esperanto' },
  { 'iso_639_1': 'et', 'english_name': 'Estonian' },
  { 'iso_639_1': 'eu', 'english_name': 'Basque' },
  { 'iso_639_1': 'fo', 'english_name': 'Faroese' },
  { 'iso_639_1': 'fj', 'english_name': 'Fijian' },
  { 'iso_639_1': 'fi', 'english_name': 'Finnish' },
  { 'iso_639_1': 'fr', 'english_name': 'French' },
  { 'iso_639_1': 'fy', 'english_name': 'Frisian' },
  { 'iso_639_1': 'ff', 'english_name': 'Fulah' },
  { 'iso_639_1': 'gd', 'english_name': 'Gaelic' },
  { 'iso_639_1': 'ga', 'english_name': 'Irish' },
  { 'iso_639_1': 'gl', 'english_name': 'Galician' },
  { 'iso_639_1': 'gv', 'english_name': 'Manx' },
  { 'iso_639_1': 'gn', 'english_name': 'Guarani' },
  { 'iso_639_1': 'gu', 'english_name': 'Gujarati' },
  { 'iso_639_1': 'ht', 'english_name': 'Haitian; Haitian Creole' },
  { 'iso_639_1': 'ha', 'english_name': 'Hausa' },
  { 'iso_639_1': 'sh', 'english_name': 'Serbo-Croatian' },
  { 'iso_639_1': 'hz', 'english_name': 'Herero' },
  { 'iso_639_1': 'ho', 'english_name': 'Hiri Motu' },
  { 'iso_639_1': 'hr', 'english_name': 'Croatian' },
  { 'iso_639_1': 'hu', 'english_name': 'Hungarian' },
  { 'iso_639_1': 'ig', 'english_name': 'Igbo' },
  { 'iso_639_1': 'io', 'english_name': 'Ido' },
  { 'iso_639_1': 'ii', 'english_name': 'Yi' },
  { 'iso_639_1': 'iu', 'english_name': 'Inuktitut' },
  { 'iso_639_1': 'ie', 'english_name': 'Interlingue' },
  { 'iso_639_1': 'ia', 'english_name': 'Interlingua' },
  { 'iso_639_1': 'id', 'english_name': 'Indonesian' },
  { 'iso_639_1': 'ik', 'english_name': 'Inupiaq' },
  { 'iso_639_1': 'is', 'english_name': 'Icelandic' },
  { 'iso_639_1': 'it', 'english_name': 'Italian' },
  { 'iso_639_1': 'jv', 'english_name': 'Javanese' },
  { 'iso_639_1': 'ja', 'english_name': 'Japanese' },
  { 'iso_639_1': 'kl', 'english_name': 'Kalaallisut' },
  { 'iso_639_1': 'kn', 'english_name': 'Kannada' },
  { 'iso_639_1': 'ks', 'english_name': 'Kashmiri' },
  { 'iso_639_1': 'kr', 'english_name': 'Kanuri' },
  { 'iso_639_1': 'kk', 'english_name': 'Kazakh' },
  { 'iso_639_1': 'km', 'english_name': 'Khmer' },
  { 'iso_639_1': 'ki', 'english_name': 'Kikuyu' },
  { 'iso_639_1': 'rw', 'english_name': 'Kinyarwanda' },
  { 'iso_639_1': 'ky', 'english_name': 'Kirghiz' },
  { 'iso_639_1': 'kv', 'english_name': 'Komi' },
  { 'iso_639_1': 'kg', 'english_name': 'Kongo' },
  { 'iso_639_1': 'ko', 'english_name': 'Korean' },
  { 'iso_639_1': 'kj', 'english_name': 'Kuanyama' },
  { 'iso_639_1': 'ku', 'english_name': 'Kurdish' },
  { 'iso_639_1': 'lo', 'english_name': 'Lao' },
  { 'iso_639_1': 'la', 'english_name': 'Latin' },
  { 'iso_639_1': 'lv', 'english_name': 'Latvian' },
  { 'iso_639_1': 'li', 'english_name': 'Limburgish' },
  { 'iso_639_1': 'ln', 'english_name': 'Lingala' },
  { 'iso_639_1': 'lt', 'english_name': 'Lithuanian' },
  { 'iso_639_1': 'lb', 'english_name': 'Letzeburgesch' },
  { 'iso_639_1': 'lu', 'english_name': 'Luba-Katanga' },
  { 'iso_639_1': 'lg', 'english_name': 'Ganda' },
  { 'iso_639_1': 'mh', 'english_name': 'Marshall' },
  { 'iso_639_1': 'ml', 'english_name': 'Malayalam' },
  { 'iso_639_1': 'mr', 'english_name': 'Marathi' },
  { 'iso_639_1': 'mg', 'english_name': 'Malagasy' },
  { 'iso_639_1': 'mt', 'english_name': 'Maltese' },
  { 'iso_639_1': 'mo', 'english_name': 'Moldavian' },
  { 'iso_639_1': 'mn', 'english_name': 'Mongolian' },
  { 'iso_639_1': 'mi', 'english_name': 'Maori' },
  { 'iso_639_1': 'ms', 'english_name': 'Malay' },
  { 'iso_639_1': 'my', 'english_name': 'Burmese' },
  { 'iso_639_1': 'na', 'english_name': 'Nauru' },
  { 'iso_639_1': 'nv', 'english_name': 'Navajo' },
  { 'iso_639_1': 'nr', 'english_name': 'Ndebele' },
  { 'iso_639_1': 'nd', 'english_name': 'Ndebele' },
  { 'iso_639_1': 'ng', 'english_name': 'Ndonga' },
  { 'iso_639_1': 'ne', 'english_name': 'Nepali' },
  { 'iso_639_1': 'nl', 'english_name': 'Dutch' },
  { 'iso_639_1': 'nn', 'english_name': 'Norwegian Nynorsk' },
  { 'iso_639_1': 'nb', 'english_name': 'Norwegian Bokmål' },
  { 'iso_639_1': 'no', 'english_name': 'Norwegian' },
  { 'iso_639_1': 'ny', 'english_name': 'Chichewa; Nyanja' },
  { 'iso_639_1': 'oc', 'english_name': 'Occitan' },
  { 'iso_639_1': 'oj', 'english_name': 'Ojibwa' },
  { 'iso_639_1': 'or', 'english_name': 'Oriya' },
  { 'iso_639_1': 'om', 'english_name': 'Oromo' },
  { 'iso_639_1': 'os', 'english_name': 'Ossetian; Ossetic' },
  { 'iso_639_1': 'pi', 'english_name': 'Pali' },
  { 'iso_639_1': 'pl', 'english_name': 'Polish' },
  { 'iso_639_1': 'pt', 'english_name': 'Portuguese' },
  { 'iso_639_1': 'qu', 'english_name': 'Quechua' },
  { 'iso_639_1': 'rm', 'english_name': 'Raeto-Romance' },
  { 'iso_639_1': 'ro', 'english_name': 'Romanian' },
  { 'iso_639_1': 'rn', 'english_name': 'Rundi' },
  { 'iso_639_1': 'ru', 'english_name': 'Russian' },
  { 'iso_639_1': 'sg', 'english_name': 'Sango' },
  { 'iso_639_1': 'sa', 'english_name': 'Sanskrit' },
  { 'iso_639_1': 'si', 'english_name': 'Sinhalese' },
  { 'iso_639_1': 'sk', 'english_name': 'Slovak' },
  { 'iso_639_1': 'sl', 'english_name': 'Slovenian' },
  { 'iso_639_1': 'se', 'english_name': 'Northern Sami' },
  { 'iso_639_1': 'sm', 'english_name': 'Samoan' },
  { 'iso_639_1': 'sn', 'english_name': 'Shona' },
  { 'iso_639_1': 'sd', 'english_name': 'Sindhi' },
  { 'iso_639_1': 'so', 'english_name': 'Somali' },
  { 'iso_639_1': 'st', 'english_name': 'Sotho' },
  { 'iso_639_1': 'es', 'english_name': 'Spanish' },
  { 'iso_639_1': 'sq', 'english_name': 'Albanian' },
  { 'iso_639_1': 'sc', 'english_name': 'Sardinian' },
  { 'iso_639_1': 'sr', 'english_name': 'Serbian' },
  { 'iso_639_1': 'ss', 'english_name': 'Swati' },
  { 'iso_639_1': 'su', 'english_name': 'Sundanese' },
  { 'iso_639_1': 'sw', 'english_name': 'Swahili' },
  { 'iso_639_1': 'sv', 'english_name': 'Swedish' },
  { 'iso_639_1': 'ty', 'english_name': 'Tahitian' },
  { 'iso_639_1': 'ta', 'english_name': 'Tamil' },
  { 'iso_639_1': 'tt', 'english_name': 'Tatar' },
  { 'iso_639_1': 'te', 'english_name': 'Telugu' },
  { 'iso_639_1': 'tg', 'english_name': 'Tajik' },
  { 'iso_639_1': 'tl', 'english_name': 'Tagalog' },
  { 'iso_639_1': 'th', 'english_name': 'Thai' },
  { 'iso_639_1': 'ti', 'english_name': 'Tigrinya' },
  { 'iso_639_1': 'to', 'english_name': 'Tonga' },
  { 'iso_639_1': 'tn', 'english_name': 'Tswana' },
  { 'iso_639_1': 'ts', 'english_name': 'Tsonga' },
  { 'iso_639_1': 'tk', 'english_name': 'Turkmen' },
  { 'iso_639_1': 'tr', 'english_name': 'Turkish' },
  { 'iso_639_1': 'tw', 'english_name': 'Twi' },
  { 'iso_639_1': 'ug', 'english_name': 'Uighur' },
  { 'iso_639_1': 'uk', 'english_name': 'Ukrainian' },
  { 'iso_639_1': 'ur', 'english_name': 'Urdu' },
  { 'iso_639_1': 'uz', 'english_name': 'Uzbek' },
  { 'iso_639_1': 've', 'english_name': 'Venda' },
  { 'iso_639_1': 'vi', 'english_name': 'Vietnamese' },
  { 'iso_639_1': 'vo', 'english_name': 'Volapük' },
  { 'iso_639_1': 'wa', 'english_name': 'Walloon' },
  { 'iso_639_1': 'wo', 'english_name': 'Wolof' },
  { 'iso_639_1': 'xh', 'english_name': 'Xhosa' },
  { 'iso_639_1': 'yi', 'english_name': 'Yiddish' },
  { 'iso_639_1': 'za', 'english_name': 'Zhuang' },
  { 'iso_639_1': 'zu', 'english_name': 'Zulu' },
  { 'iso_639_1': 'ab', 'english_name': 'Abkhazian' },
  { 'iso_639_1': 'zh', 'english_name': 'Mandarin' },
  { 'iso_639_1': 'ps', 'english_name': 'Pushto' },
  { 'iso_639_1': 'am', 'english_name': 'Amharic' },
  { 'iso_639_1': 'ar', 'english_name': 'Arabic' },
  { 'iso_639_1': 'bg', 'english_name': 'Bulgarian' },
  { 'iso_639_1': 'cn', 'english_name': 'Cantonese' },
  { 'iso_639_1': 'mk', 'english_name': 'Macedonian' },
  { 'iso_639_1': 'el', 'english_name': 'Greek' },
  { 'iso_639_1': 'fa', 'english_name': 'Persian' },
  { 'iso_639_1': 'he', 'english_name': 'Hebrew' },
  { 'iso_639_1': 'hi', 'english_name': 'Hindi' },
  { 'iso_639_1': 'hy', 'english_name': 'Armenian' },
  { 'iso_639_1': 'en', 'english_name': 'English' },
  { 'iso_639_1': 'ee', 'english_name': 'Ewe' },
  { 'iso_639_1': 'ka', 'english_name': 'Georgian' },
  { 'iso_639_1': 'pa', 'english_name': 'Punjabi' },
  { 'iso_639_1': 'bn', 'english_name': 'Bengali' },
  { 'iso_639_1': 'bs', 'english_name': 'Bosnian' },
  { 'iso_639_1': 'ch', 'english_name': 'Chamorro' },
  { 'iso_639_1': 'be', 'english_name': 'Belarusian' },
  { 'iso_639_1': 'yo', 'english_name': 'Yoruba' },
];

/**
 * Get list item
 */
export function getListItem (type, query) {
  if (type === 'movie') {
    return lists.movie.find(list => list.query === query);
  } else if (type === 'tv') {
    return lists.tv.find(list => list.query === query);
  }
};

/**
 * Get movies (listing)
 */
export function getMovies (query, page = 1) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/movie/${query}`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
        page,
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get movie (single)
 */
export function getMovie (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/movie/${id}`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
        append_to_response: 'videos,credits,images,external_ids,release_dates',
        include_image_language: 'en',
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get movie recommended (single)
 */
export function getMovieRecommended (id, page = 1) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/movie/${id}/recommendations`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
        page,
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get TV shows (listing)
 */
export function getTvShows (query, page = 1) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/tv/${query}`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
        page,
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get TV show (single)
 */
export function getTvShow (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/tv/${id}`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
        append_to_response: 'videos,credits,images,external_ids,content_ratings',
        include_image_language: 'en',
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get TV show recommended (single)
 */
export function getTvShowRecommended (id, page = 1) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/tv/${id}/recommendations`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
        page,
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get TV show episodes from season (single)
 */
export function getTvShowEpisodes (id, season) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/tv/${id}/season/${season}`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get trending
 */
export function getTrending (media, page = 1) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/trending/${media}/week`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
        page,
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Discover media by genre
 */
export function getMediaByGenre (media, genre, page = 1) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/discover/${media}`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
        with_genres: genre,
        page,
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
* Get credits
*/
export function getCredits (id, type) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/person/${id}/${type}`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get genre list
 */
export function getGenreList (media) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/genre/${media}/list`, {
      params: {
        api_key: process.env.API_KEY,
      },
    }).then((response) => {
      resolve(response.data.genres);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get person (single)
 */
export function getPerson (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/person/${id}`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
        append_to_response: 'images,combined_credits,external_ids',
        include_image_language: 'en',
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Search (searches movies, tv and people)
 */
export function search (query, page = 1) {
  return new Promise((resolve, reject) => {
    axios.get(`${apiUrl}/search/multi`, {
      params: {
        api_key: process.env.API_KEY,
        language: process.env.API_LANG,
        query,
        page,
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get YouTube video info
 */
export function getYouTubeVideo (id) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        key: process.env.API_YOUTUBE_KEY,
        id,
        part: 'contentDetails',
      },
    }).then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
};
