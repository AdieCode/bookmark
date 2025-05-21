// store/extraData.js
import { defineStore } from 'pinia';
import { mangaFiltersData, animeFiltersData } from '@/constants/filters';
import { transformFiltersData, transformSelectedDataForReqManga, transformSelectedDataForReqAnime } from '@/utils/transformFilters';

export const useExtraDataStore = defineStore('extraData', {
  state: () => ({
    filters: transformFiltersData(animeFiltersData),
    tags: [],
    extraTags: [],
    reqFilters: {}
  }),

  actions: {
    loadFilters(contentType) {
      console.log(contentType)
      if (contentType === "Anime") {
        this.filters = transformFiltersData(animeFiltersData);
        return;
      } 

      this.filters = transformFiltersData(mangaFiltersData);
    },

    addTag(tag) {
      if (!this.tags.some(t => t.text === tag)) {
        this.tags.push({ text: tag, id: this.generateId() });
      }
    },

    removeTag(id) {
      this.tags = this.tags.filter(tag => tag.id !== id);
    },

    clearTags() {
      this.tags = [];
    },

    generateId() {
      return crypto.randomUUID?.() || '_' + Math.random().toString(36).slice(2, 9);
    },

    toggleFilter(category, option, single = true) {
      const categoryList = this.filters[category];
      if (!categoryList) return;
      const item = categoryList.find(i => i.option === option);
      if (!item) return;

      if (single) {
        // Unselect all except the toggled one
        categoryList.forEach(i => {
          i.selected = (i.option === option) ? !i.selected : false;
        });
      } else {
        item.selected = !item.selected;
      }
    },

    getSelectedFilters() {
      const useToggle = useTogglesStore();
      const selected = {};
      for (const category in this.filters) {
        const options = this.filters[category].filter(i => i.selected).map(i => i.option);
        if (options.length) selected[category] = options;
      }
      if (useToggle.contentType === 'Anime'){
        this.reqFilters = transformSelectedDataForReqAnime(selected);
      } else {
        this.reqFilters = transformSelectedDataForReqManga(selected);
      }
      return selected;
    },

    clearAllFilters() {
      for (const category in this.filters) {
        this.filters[category].forEach(item => (item.selected = false));
      }
    }
  },
});
