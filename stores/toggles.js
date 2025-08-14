// store/toggles.js
import { defineStore } from 'pinia';

export const useTogglesStore = defineStore('toggles', {
  state: () => {
    return {
      isMobile: false,
      notification: {
        isVisible: false,
        text: "",
        type: 0
      },
      contentType: 'Anime',
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
      },
      showFilters: false,
      selectedFilter:[
        {
          type: 'genre',
          selected: false
        },
        {
          type: 'type',
          selected: false
        },
        {
          type: 'releaseStatus',
          selected: false
        },
        {
          type: 'country',
          selected: false
        },
        {
          type: 'year',
          selected: false
        },
        {
          type: 'sort',
          selected: false
        }
      ],
      editContent: true,
    };
  },

  actions: {
    checkMobile() {
      this.isMobile = window.innerWidth < 880;
    },

    toggleContentType() {
      const useContent = useContentStore();
      useContent.data = [];
      useContent.planningData = [];
      if (this.contentType === 'Anime') {
        this.contentType = "Manga";
      } else {
        this.contentType = "Anime";
      }
    },

    toggleSearchShow() {
      this.searchShow = !this.searchShow;
    },

    toggleEditShow() {
      this.editContent = !this.editContent;
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
    },

    toggleFilters() {
      this.showFilters = !this.showFilters;
      this.selectedFilter.forEach(f => f.selected = false);
    },

    getFilterStatus(type) {
      const filter = this.selectedFilter.find(f => f.type === type);
      return filter ? filter.selected : null;
    },

    toggleFilterStatus(type) {
      const filter = this.selectedFilter.find(f => f.type === type);
      if (filter) {
        if (!filter.selected) {
          this.selectedFilter.forEach(f => f.selected = false);
          filter.selected = true;
        } else {
          filter.selected = false;
        }
      }
    }, 

    clearFilter(){
      this.selectedFilter.forEach(f => f.selected = false);
    },

    setNotification(text, type = 0) {
      this.notification.text = text;
      this.notification.type = type;
      this.notification.isVisible = true;
    },

    hideNotification() {
      this.notification.isVisible = false;
    }
  },
});
