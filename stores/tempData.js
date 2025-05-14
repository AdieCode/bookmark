// store/toggles.js
import { defineStore } from 'pinia';

const filtersData = {
    'genres': [
        'Action',
        'Adventure',
        'Comedy',
        'Drama',
        'Ecchi',
        'Fantasy',
        'Horror',
        'Mahou Shoujo',
        'Mecha',
        'Music',
        'Mystery',
        'Psychological',
        'Romance',
        'Sci-Fi',
        'Slice of Life',
        'Sports',
        'Supernatural',
        'Thriller'
    ],
    'type': [
        'Manga',
        'Manhwa',
        'Manhua',
        'One-Shot',
        'Doujinshi',
        'Novel'
    ],
    'publishingStatus': [
        'Releasing',
        'Finished',
        'Not Yet Released',
        'Hiatus',
        'Cancelled'
    ],
    'countryOfOrigin': [
        'Japan',
        'South Korea',
        'China',
        'Taiwan'
    ],
    'year': Array.from({ length: 87 }, (_, i) => 2026 - i)
};


export const useExtraDataStore = defineStore('extraData', {
  state: () => {
    const transformedFiltersData = {};

    Object.keys(filtersData).forEach((key) => {
        transformedFiltersData[key] = filtersData[key].map(option => ({
          option,
          selected: false
        }))
      })

    return {
        filters: transformedFiltersData,
        tags: [],
        extraTags: []
    };
  },

  actions: {
    addTag(tag) {
        if (!this.tags.some(existingTag => existingTag.text === tag)) {
            this.tags.push(
                {
                    text: tag,
                    id: this.generateId()
                }
            );
        }
    },

    removeTag(id) {
        this.tags = this.tags.filter(tag => tag.id !== id);
    },

    clearTags() {
        this.tags = [];
    },

    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    },

    toggleFilter(category, option) {
        console.log(category, option)
        const categoryList = this.filters[category]
        if (!categoryList) return

        const item = categoryList.find(item => item.option === option)
        if (item) item.selected = !item.selected
    },

    getSelectedFilters() {
        const selected = {}

        for (const category in this.filters) {
        const selectedOptions = this.filters[category]
            .filter(item => item.selected)
            .map(item => item.option)

        if (selectedOptions.length > 0) {
            selected[category] = selectedOptions
        }
        }

        return selected
    },

    clearAllFilters() {
        for (const category in this.filters) {
          this.filters[category].forEach(item => {
            item.selected = false;
          });
        }
    }
  },
});
