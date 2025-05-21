// utils/transformFilters.js
export function transformFiltersData(filtersData) {
  const transformed = {};
  for (const key in filtersData) {
    transformed[key] = filtersData[key].map(option => ({
      option,
      selected: false,
    }));
  }
  return transformed;
}

const sortMap = {
  Title: 'TITLE_ROMAJI',
  Popularity: 'POPULARITY_DESC',
  'Average Score': 'SCORE_DESC',
  Trending: 'TRENDING_DESC',
  Favorites: 'FAVOURITES_DESC',
  'Date Added': 'UPDATED_AT_DESC',
  'Release Date': 'START_DATE_DESC'
};

const statusMap = {
  Releasing:        'RELEASING',
  Finished:         'FINISHED',
  'Not Yet Released': 'NOT_YET_RELEASED',
  Hiatus:           'HIATUS',
  Cancelled:        'CANCELLED',
};

const formatMap = {
  Manga:      'MANGA',
  'Light Novel': 'NOVEL',
  'One-Shot': 'ONE_SHOT',
};

const animeStatusMap = {
  Airing:        'RELEASING',
  Finished:         'FINISHED',
  'Not Yet Aired': 'NOT_YET_RELEASED',
  Cancelled:        'CANCELLED',
};

const animeFormatMap = {
  'TV Show': 'TV',
  'TV Short': 'TV_SHORT',
  Movie: 'MOVIE',
  OVA: 'OVA',
  ONA: 'ONA',
  Special: 'SPECIAL',
  Music: 'MUSIC',
  // Add more as needed
};


export function transformSelectedDataForReqManga(selectedFilters) {
  const result = {};
  let country = null; // Only one country allowed

  if (selectedFilters.sort) {
    result.sort = sortMap[selectedFilters.sort[0]] || selectedFilters.sort;
  }

  // Genres (list)
  if (selectedFilters.genres) {
    result.genre_in = selectedFilters.genres;
  }

  // Years (list)
  if (selectedFilters.year) {
    result.seasonYear_in = selectedFilters.year;
  }

  // Publishing status (string)
  if (selectedFilters.publishingStatus) {
    result.status = statusMap[selectedFilters.publishingStatus[0]] || selectedFilters.publishingStatus;
  }

  // Formats & special types
  const formats = [];
  (selectedFilters.type || []).forEach(t => {
    if (formatMap[t]) {
      formats.push(formatMap[t]);
      if (t === 'Manga') {
        country = 'JP';
      }
    } else {
      switch (t) {
        case 'Manhwa':
          formats.push('MANGA');
          country = 'KR';
          break;
        case 'Manhua':
          formats.push('MANGA');
          country = 'CN';
          break;
        case 'Doujinshi':
          formats.push('MANGA');
          result.source_in = ['DOUJIN'];
          break;
        // add more special cases here...
      }
    }
  });

  if (formats.length) result.format_in = [...new Set(formats)];
  if (country) result.countryOfOrigin = country;

  return result;
}

export function transformSelectedDataForReqAnime(selectedFilters) {
  const result = {};
    // Formats & special types
  if (selectedFilters.sort) {
    result.sort = sortMap[selectedFilters.sort[0]] || selectedFilters.sort;
  }

  // Genres (list)
  if (selectedFilters.genres) {
    result.genre_in = selectedFilters.genres;
  }

  // Years (list)
  if (selectedFilters.year) {
    result.seasonYear_in = selectedFilters.year;
  }

  // Publishing status (string)
  if (selectedFilters.status) {
    result.status = animeStatusMap[selectedFilters.status[0]] || selectedFilters.status;
  }

  // Formats & special types
  if (selectedFilters.type) {
    result.format = animeFormatMap[selectedFilters.type[0]] || selectedFilters.type;
  }

  return result;
}

