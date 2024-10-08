// store/auth.js
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import axios from 'axios';

export const useContent = defineStore('content', {
  state: () => {
    return {
      data: [],
    };
  },

  actions: {
        async getContentData() {
          const authStore = useAuthStore(); 
          const response = await axios.get("http://localhost:3001/content/get_manga_content");
          // console.log(response.data.data.media)
          this.data = response.data.data.media;
        },
  	},
});
