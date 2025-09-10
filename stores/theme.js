// stores/theme.js
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false,
    initialLoad: false,
  }),

  actions: {
    applyTheme(val) {
      if (val) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    initTheme() {
      if (process.client) {
        // Theme is already initialized by the plugin, just set up the watcher
        this.$subscribe(() => {
          if (this.initialLoad) {
            this.applyTheme(this.isDarkMode);
            localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
          }
        });
      }
    },

    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme(this.isDarkMode);
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }
});
