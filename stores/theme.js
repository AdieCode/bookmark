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
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          this.isDarkMode = savedTheme === 'dark';
        } else {
          this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        this.applyTheme(this.isDarkMode);
        

        // Watcher logic — just inline reactivity here
        this.$subscribe(() => {
          if (this.initialLoad) {
            this.applyTheme(this.isDarkMode);
            localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
          }
        });

        // Mark initial load complete after hydration
        window.addEventListener('load', () => {
          this.initialLoad = true;
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
