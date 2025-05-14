// store/auth.js
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import {useTogglesStore} from "~/stores/toggles.js";


let abortController = null;

export const useContentStore = defineStore('content', {
  state: () => {
    return {
      data: [],
      currentPage: 1,
      totalContent: 0,
      contentFetched: false,
      selected_content: {},
      searched_content: [],
      baseURL: useRuntimeConfig().public.baseUrl || 'http://localhost:3001',
    };
  },

  actions: {
    async getMangaContent(page=1) {
      const { $api } = useNuxtApp();
      if (abortController) {
        abortController.abort(); // Cancel the previous request
      }

      abortController = new AbortController(); // Create a new controller for this request

      try {
        this.contentFetched = false;
        const response = await $api.get(`${this.baseURL}/content/get_manga_content`, {
          params: { page: page },  // Send 'page' as query parameter
          signal: abortController.signal // Pass the signal to axios
        });

        console.log(response);
        this.totalContent = response?.data?.data?.page?.total;
        this.contentFetched = true;
        return response;
      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.log(error);
        }
      }
    },

    async getAnimeContent(page=1) {
      const { $api } = useNuxtApp();
      if (abortController) {
        abortController.abort(); // Cancel the previous request
      }

      abortController = new AbortController(); // Create a new controller for this request

      try {
        this.contentFetched = false;
        const response = await $api.get(`${this.baseURL}/content/get_anime_content`, {
          params: { page: page },  // Send 'page' as query parameter
          signal: abortController.signal // Pass the signal to axios
        });

        this.totalContent = response?.data?.data?.page?.total;
        this.contentFetched = true;
        return response;
      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.log(error);
        }
      }
    },

    async getContentData(page=1) {
      const toggle = useTogglesStore();

      this.currentPage = page;
      try {
        let response;
        if (toggle.contentType === "Manga") {
          response = await this.getMangaContent(this.currentPage);
        }

        if (toggle.contentType === "Anime") {
          response = await this.getAnimeContent(this.currentPage);
        }

        this.data = response.data.data.media;
      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.log(error);
        }
      }
    },

    async getNextPageData() {
      if (abortController) {
        abortController.abort(); // Cancel the previous request
      }
      const toggle = useTogglesStore();
      abortController = new AbortController(); // Create a new controller for this request

      try {
        let response;
        if (toggle.contentType === "Manga") {
          response = await this.getMangaContent(this.currentPage);
        }

        if (toggle.contentType === "Anime") {
          response = await this.getAnimeContent(this.currentPage);
        }

        return response.data.data.media;
      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.log(error);
        }
      }
    },

    async getContentDataById(id) {
      const { $api } = useNuxtApp();
      if (abortController) {
        abortController.abort(); 
      }

      abortController = new AbortController(); 
      try {
        const response = await $api.post(`${this.baseURL}/content/get_manga_content_by_id`,{
            id: id
          });

        this.selected_content = response.data.data.media[0];
      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.error('API Error:', error);
          // router.push('/error');
        }
      }
    },

    async nextContent() {
      this.currentPage = this.currentPage + 1;
      const newContent = await this.getNextPageData();
      this.data = this.data.concat(newContent);
    },

    async getContentByText(text) {
      const { $api } = useNuxtApp();
      if (abortController) {
        abortController.abort(); 
      }

      abortController = new AbortController(); 
      try {
        this.searched_content = [];
        const response = await $api.post(`${this.baseURL}/content/get_manga_content_specific`,{
            search: text
          });

        this.searched_content = response.data.data.media;
      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.log(error);
        }
      }
    },

    mapNewContentData(data) {
      console.log(data)   
      // for (const key in data) {
      //   if (data.hasOwnProperty(key) && this.selected_content.hasOwnProperty(key)) {
      //     this.selected_content[key] = data[key];
      //   }
      // }
      this.selected_content = data
      console.log(this.selected_content)
    }
  },
});
