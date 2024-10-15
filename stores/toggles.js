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
      },
      selected_content: {
        anilist_content_id: null,
        title: {
            romaji: "",
            english: "",
            native: ""
        },
        genres: [
        ],
        description: "",
        cover_image_url: "",
        release_date: "",
        type: "",
        average_score: 0,
        volumes: 0,
        chapters: 0,
        isAdult: false,
        consumed_status: "untracked"
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
    },
    mapNewContentData(data) {
      for (const key in data) {
        if (data.hasOwnProperty(key) && this.selected_content.hasOwnProperty(key)) {
          this.selected_content[key] = data[key];
        }
      }
      console.log(this.selected_content)
    }
  },
});
