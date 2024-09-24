// store/auth.js
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import axios from 'axios';

export const useTogglesStore = defineStore('toggles', {
  state: () => {
    return {
      seacrhShow: false,
    };
  },

  actions: {
        async toggleSearchShow() {
          this.seacrhShow = !this.seacrhShow;
        },
  	},
});
