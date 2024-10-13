// store/toggles.js
import { defineStore } from 'pinia';

export const useTogglesStore = defineStore('toggles', {
  state: () => {
    return {
      searchShow: false,
      content: {
        discover: true,
        planningToRead: false,
        reading: false,
        completed: false
      }
    };
  },

  actions: {
    toggleSearchShow() {
      this.searchShow = !this.searchShow;
    },
    toggleContentDiscover() {
      this.content.discover = true;
      this.content.planningToRead = false;
      this.content.reading = false;
      this.content.completed = false;
    },
    toggleContentPlanningToRead() {
      this.content.discover = false;
      this.content.planningToRead = true;
      this.content.reading = false;
      this.content.completed = false;
    },
    toggleContentReading() {
      this.content.discover = false;
      this.content.planningToRead = false;
      this.content.reading = true;
      this.content.completed = false;
    },
    toggleContentCompleted() {
      this.content.discover = false;
      this.content.planningToRead = false;
      this.content.reading = false;
      this.content.completed = true;
    }
  },
});
