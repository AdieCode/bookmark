// store/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

let abortController = null; // Declare outside of the Pinia state

export const useContentStore = defineStore('content', {
  state: () => {
    return {
      data: [],
      contentFetched: false
    };
  },

  actions: {
    async getContentData() {
      if (abortController) {
        abortController.abort(); // Cancel the previous request
      }

      abortController = new AbortController(); // Create a new controller for this request

      try {
        this.contentFetched = false;
        const response = await axios.get("http://localhost:3001/content/get_manga_content", {
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
  },
});
