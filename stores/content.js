// store/auth.js
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useTogglesStore } from "~/stores/toggles.js";


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
    init() {
			if (process.client) {
			const session = useCookie('session');
			this.token = session.value?.token || null;
			}

			const config = useRuntimeConfig();
			this.baseURL = config.public.baseUrl || 'http://localhost:3001';
		},

    clearData(){
      this.data = [];
    },

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

    async getMangaContentByFilters(filters, page=1) {
      const { $api } = useNuxtApp();
      if (abortController) {
        abortController.abort(); 
      }

      abortController = new AbortController(); 
      this.contentFetched = false;
      try {
        const response = await $api.post(`${this.baseURL}/content/get_manga_content_by_filters`,{
            filters: filters,
            page: page
        });
        console.log('manga filter getting')

        this.totalContent = response?.data?.data?.page?.total;
        this.contentFetched = true;
        return response;
      } catch (error) {
        this.contentFetched = true;
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.error('API Error:', error);
          // router.push('/error');
        }
      }
    },

    async getAnimeContentByFilters(filters, page=1) {
      const { $api } = useNuxtApp();
      if (abortController) {
        abortController.abort(); 
      }

      abortController = new AbortController(); 
      this.contentFetched = false;
      try {
        const response = await $api.post(`${this.baseURL}/content/get_anime_content_by_filters`,{
            filters: filters,
            page: page
        });

        this.totalContent = response?.data?.data?.page?.total;
        this.contentFetched = true;
        return response;
      } catch (error) {
        this.contentFetched = true;
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.error('API Error:', error);
          // router.push('/error');
        }
      }
    },

    async getNextPageData() {
      if (abortController) {
        abortController.abort(); // Cancel the previous request
      }
      const useExtra = useExtraDataStore();
      const toggle = useTogglesStore();
      abortController = new AbortController(); // Create a new controller for this request

      const filters = useExtra.reqFilters;

        const hasFilters =
        filters &&
        typeof filters === 'object' &&
        Object.values(filters).some(
          v => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)
        );

      try {
        let response;
        if (toggle.contentType === "Manga") {
          if (hasFilters){
            response = await this.getMangaContentByFilters(filters, this.currentPage);
          } else {
            response = await this.getMangaContent(this.currentPage);
          }
        }

        if (toggle.contentType === "Anime") {
          if (hasFilters){
            response = await this.getAnimeContentByFilters(filters, this.currentPage);
          } else {

            response = await this.getAnimeContent(this.currentPage);
          }
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
      const toggle = useTogglesStore();
      const { $api } = useNuxtApp();
      if (abortController) {
        abortController.abort(); 
      }

      abortController = new AbortController(); 
      try {
        toggle.setNotification('fetching content', 0);
        const response = await $api.post(`${this.baseURL}/content/get_content_by_id`,{
            id: id
        });

        toggle.hideNotification();
        this.selected_content = response.data.data.media[0];
        localStorage.setItem('selectedContent', JSON.stringify(this.selected_content));
      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.error('API Error:', error);
          // router.push('/error');
        }
      }
    },

    async getContentDataByFilters(filters) {
      const toggle = useTogglesStore();
      if (abortController) {
        abortController.abort(); 
      }

      abortController = new AbortController(); 
      this.currentPage = 1;
      this.contentFetched = false;
      this.data = [];
      try {
        let response;

        if (toggle.contentType === "Manga") {
          response = await this.getMangaContentByFilters(filters, this.currentPage);
        }

        if (toggle.contentType === "Anime") {
          response = await this.getAnimeContentByFilters(filters, this.currentPage);
        }
        // const response = await $api.post(`${this.baseURL}/content/get_content_by_filters`,{
        //     filters: filters,
        //     page: this.currentPage
        // });

        this.totalContent = response?.data?.data?.page?.total;
        this.contentFetched = true;
        this.data = response.data.data.media;
      } catch (error) {
        this.contentFetched = true;
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
        const response = await $api.get(`${this.baseURL}/content/get_content_by_search`,{
            params: {
              search: text
            }
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
