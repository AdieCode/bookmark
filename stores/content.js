// store/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

let abortController = null; // Declare outside of the Pinia state

export const useContentStore = defineStore('content', {
  state: () => {
    return {
      data: [],
      currentPage: 1,
      contentFetched: false,
      selected_content: {}
    };
  },

  actions: {
    async getContentData(page=1) {
      if (abortController) {
        abortController.abort(); // Cancel the previous request
      }

      abortController = new AbortController(); // Create a new controller for this request

      try {
        this.contentFetched = false;
        const response = await axios.get("http://localhost:3001/content/get_manga_content", {
          params: { page: page },  // Send 'page' as query parameter
          signal: abortController.signal // Pass the signal to axios
        });
        
        this.contentFetched = true;
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

      abortController = new AbortController(); // Create a new controller for this request

      try {
        this.contentFetched = false;
        console.log('this is the page num : ', this.currentPage);
        const response = await axios.get("http://localhost:3001/content/get_manga_content", {
          params: { page: this.currentPage },  // Send 'page' as query parameter
          signal: abortController.signal // Pass the signal to axios
        });
        this.contentFetched = true;
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
      if (abortController) {
        abortController.abort(); 
      }

      abortController = new AbortController(); 
      try {
        const response = await axios.post("http://localhost:3001/content/get_manga_content_by_id",{
            id: id
          });

        this.selected_content = response.data.data.media[0];
      } catch (error) {
        if (error.name === 'CanceledError') {
          console.log("Previous request canceled");
        } else {
          console.log(error);
        }
      }
    },
    async nextContent() {
      this.currentPage = this.currentPage + 1;
      const newContent = await this.getNextPageData();
      this.data = this.data.concat(newContent);
    }
  },
});
