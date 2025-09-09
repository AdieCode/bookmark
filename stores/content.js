// store/auth.js
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useTogglesStore } from "~/stores/toggles.js";


let abortController = null;

export const useContentStore = defineStore('content', {
  state: () => {
    return {
      initialized: false,
      data: [],
      planningData: [],
      searchedContentData:{
        searchTerm: '',
        currentPage: 0,
        hasNextPage: true,
        contentList: []
      },
      plannaningContentData:{
        currentPage: 0,
        hasNextPage: true,
        contentType: '',
        contentList: []
      },
      busyContentData:{
        currentPage: 0,
        hasNextPage: true,
        contentType: '',
        contentList: []
      },
      completedContentData:{
        currentPage: 0,
        hasNextPage: true,
        contentType: '',
        contentList: []
      },
      currentPage: 1,
      totalContent: 0,
      contentFetched: false,
      selected_content: {},
      searched_content: [],
      baseURL: useRuntimeConfig().public.baseUrl || 'http://localhost:3001',
    };
  },

  actions: {
    async init() {
      if (this.initialized) return;
      
      if (process.client) {
        const session = useCookie('session');
        this.token = session.value?.token || null;
      }

      const config = useRuntimeConfig();
      this.baseURL = config.public.baseUrl || 'http://localhost:3001';
      
      this.initialized = true;
    },

    clearData(){
      this.data = [];
    },

    clearSelectedContent(){
      this.selected_content = {};
    },

    updateLocalTrackedContent(id, updateData) {
      const updateItem = (list) => {
        const index = list.findIndex(item => item.anilist_content_id === id);
        if (index !== -1) {
          list[index] = {
            ...list[index],
            tracked: {
              ...list[index].tracked,
              ...updateData,   // merge new tracked values
            },
          };
        }
      };

      // update selected_content if it matches
      if (this.selected_content?.anilist_content_id === id) {
        this.selected_content = {
          ...this.selected_content,
          tracked: {
            ...this.selected_content.tracked,
            ...updateData,
          },
        };
      }

      // update tracked lists
      updateItem(this.plannaningContentData.contentList);
      updateItem(this.busyContentData.contentList);
      updateItem(this.completedContentData.contentList);

      // also update search or general data (optional, if needed)
      updateItem(this.data);
      updateItem(this.selected_content?.recommendations);
      updateItem(this.selected_content?.relations);
      updateItem(this.searched_content);
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
        this.clearSelectedContent()
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

    async getContentByText(text, page, perPage) {
      const { $api } = useNuxtApp();
      if (abortController) {
        abortController.abort(); 
      }

      abortController = new AbortController(); 
      try {
        const response = await $api.get(`${this.baseURL}/content/get_content_by_search`,{
            params: {
              search: text,
              page: page,
              perPage: perPage
            }
        });

        // this.searched_content = response.data.data.media;
        return response;
      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.log(error);
        }
      }
    },

    setSearchTerm(term) {
      this.searchedContentData.searchTerm = term;
      this.searchedContentData.contentList = [];
      this.searchedContentData.hasNextPage = true;
      this.searchedContentData.currentPage = 0;
    },

    async getContentBysearch(text){
      const response = await this.getContentByText(text, 1, 5);
      this.searched_content = response.data.data.media;
    },

    async getAllContentBysearch(){
      const searchTerm = this.searchedContentData.searchTerm;

      if (!searchTerm) {
        console.log('required data not provided to get tracked content')
        return null;
      }

      if (!this.searchedContentData.hasNextPage) {
        return this.searchedContentData;
      }

      this.searchedContentData.currentPage += 1;
      this.contentFetched = false;

      const response = await this.getContentByText(searchTerm, this.searchedContentData.currentPage, 50);

      this.searchedContentData.contentList = this.searchedContentData.contentList.concat(response.data.data.media);
      this.contentFetched = true;
      this.searchedContentData.hasNextPage = response.data.data.page.hasNextPage;

      return this.searchedContentData;

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
    },

    async trackContent(data){
      if (!data.content_id && !data.content_status && !data.content_type) {
        console.log('required data not provided to track content')
        return null;
      }

      const { $api } = useNuxtApp();
      if (abortController) {
        abortController.abort(); 
      }

      abortController = new AbortController(); 
      try {
        let response;
        if (data.content_type === "ANIME") {
          response = await $api.post(`${this.baseURL}/user_content/add_user_anime_content`, data);
          return null;
        }

        if (data.content_type === "MANGA") {
          response = await $api.post(`${this.baseURL}/user_content/add_user_manga_content`, data);
          return null;
        }

        console.log("neither tracking request was initiated");
        return null;

      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.log(error);
        }
      }
    },

    async getPlanningTrackedContent(status){
      if (!status) {
        console.log('required data not provided to get tracked content')
        return null;
      }

      this.currentPage = 1;
      const toggle = useTogglesStore();
      const { $api } = useNuxtApp();
      if (abortController) {
        abortController.abort(); 
      }

      abortController = new AbortController(); 
      try {
        let response;
        this.contentFetched = false;

        if (toggle.contentType === "Anime") {
          response = await $api.get(`${this.baseURL}/user_content/get_user_anime_content`, {
            params: {
              content_status: status
            }
          });
        }

        if (toggle.contentType === "Manga") {
          response = await $api.get(`${this.baseURL}/user_content/get_user_manga_content`, {
            params: {
              content_status: status
            }
          });
        }

        this.totalContent = response?.data?.data?.page?.total;
        this.contentFetched = true;
        this.planningData = response?.data?.data?.media;

      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          this.totalContent = 0;
          this.contentFetched = true;
          this.planningData = [];

          console.log('somthing went wrong while fetching tracked conten: ', error);
        }
      }
    },


    async getPlanningContent(contentType){
      const currentContentType = this.plannaningContentData.contentType;

      if (!contentType && !page) {
        console.log('required data not provided to get tracked content')
        return null;
      }

      if (contentType != currentContentType) {
        this.plannaningContentData.contentType = contentType;
        this.plannaningContentData.contentList = [];
        this.plannaningContentData.hasNextPage = true;
        this.plannaningContentData.currentPage = 0;
      }

      if (!this.plannaningContentData.hasNextPage) {
        return this.plannaningContentData;
      }

      this.plannaningContentData.currentPage += 1;
      this.contentFetched = false;

      const response = await this.getTrackedContentByStatusAndContentType(this.plannaningContentData.contentType, 'planning', this.plannaningContentData.currentPage);

      
      this.plannaningContentData.contentList = this.plannaningContentData.contentList.concat(response.data.media);
      this.contentFetched = true;
      this.plannaningContentData.hasNextPage = response.data.page.hasNextPage;

      return this.plannaningContentData;

    },

    async getBusyContent(contentType){
      const currentContentType = this.busyContentData.contentType;

      if (!contentType && !page) {
        console.log('required data not provided to get tracked content')
        return null;
      }

      if (contentType != currentContentType) {
        this.busyContentData.contentType = contentType;
        this.busyContentData.contentList = [];
        this.busyContentData.hasNextPage = true;
        this.busyContentData.currentPage = 0;
      }

      if (!this.busyContentData.hasNextPage) {
        return this.busyContentData;
      }

      this.busyContentData.currentPage += 1;
      this.contentFetched = false;

      const response = await this.getTrackedContentByStatusAndContentType(this.busyContentData.contentType, 'busy', this.busyContentData.currentPage);

      
      this.busyContentData.contentList = this.busyContentData.contentList.concat(response.data.media);
      this.contentFetched = true;
      this.busyContentData.hasNextPage = response.data.page.hasNextPage;

      return this.busyContentData;
    },

    async getCompletedContent(contentType){
      const currentContentType = this.completedContentData.contentType;

      if (!contentType && !page) {
        console.log('required data not provided to get tracked content')
        return null;
      }

      if (contentType != currentContentType) {
        this.completedContentData.contentType = contentType;
        this.completedContentData.contentList = [];
        this.completedContentData.hasNextPage = true;
        this.completedContentData.currentPage = 0;
      }

      if (!this.completedContentData.hasNextPage) {
        return this.completedContentData;
      }

      this.completedContentData.currentPage += 1;
      this.contentFetched = false;

      const response = await this.getTrackedContentByStatusAndContentType(this.completedContentData.contentType, 'completed', this.completedContentData.currentPage);

      
      this.completedContentData.contentList = this.completedContentData.contentList.concat(response.data.media);
      this.contentFetched = true;
      this.completedContentData.hasNextPage = response.data.page.hasNextPage;

      return this.completedContentData;
    },


    async getTrackedContentByStatusAndContentType(contentType, status, page){
      if (!contentType && !status) {
        console.log('required data not provided to get tracked content')
        return null;
      }

      const { $api } = useNuxtApp();
      if (abortController) {
        abortController.abort(); 
      }

      abortController = new AbortController(); 
      try {
        let response;

        if (contentType === "Anime") {
          response = await $api.get(`${this.baseURL}/user_content/get_user_anime_content`, {
            params: {
              content_status: status,
              page: page
            }
          });
        }

        if (contentType === "Manga") {
          response = await $api.get(`${this.baseURL}/user_content/get_user_manga_content`, {
            params: {
              content_status: status,
              page: page
            }
          });
        }

        return response.data;

      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.log('somthing went wrong while fetching tracked conten: ', error);
        }
        return {}
      }
    },

    async updateTrackedContent(id, contentType, updateData){
      if (!updateData) {
        console.log('required data not provided to get update tracked content')
        return null;
      }

      const { $api } = useNuxtApp();
      if (abortController) {
        abortController.abort(); 
      }

      abortController = new AbortController(); 
      try {
        let response;
        
        if (contentType === "ANIME") {
          const requestBody = {
            content_id: id,
            current_episode: updateData?.current_episode,
            personal_score: updateData?.personal_score,
            status: updateData?.status,
            start_date: updateData?.start_date,
            end_date: updateData?.end_date,
            user_comment: updateData?.comment,
            // deleted: updateData?.deleted,
          }
          
          response = await $api.post(`${this.baseURL}/user_content/update_user_anime_content`, requestBody);
        }
        
        if (contentType === "MANGA") {
          const requestBody = {
            content_id: id,
            current_volume: updateData?.current_volume,
            current_chapter: updateData?.current_chapter,
            current_page: updateData?.current_page,
            personal_score: updateData?.personal_score,
            status: updateData?.status,
            start_date: updateData?.start_date,
            end_date: updateData?.end_date,
            user_comment: updateData?.comment,
            // deleted: updateData?.deleted,
          }

          response = await $api.post(`${this.baseURL}/user_content/update_user_manga_content`, requestBody);
        }

        return true;

      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.log('somthing went wrong while updateting tracked content: ', error);
        }
        return false
      }
    }


  },
});
