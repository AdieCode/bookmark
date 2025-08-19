import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  // Get initial theme safely
  const getInitialTheme = () => {
    if (typeof window === "undefined") return false; // SSR safety
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // fallback: system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const isDarkMode = ref(getInitialTheme());

  // Apply theme immediately
  if (typeof window !== "undefined") {
    if (isDarkMode.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Watch for changes & persist
    watch(isDarkMode, (val) => {
      if (val) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    });
  }

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
  }

  return { isDarkMode, toggleTheme };
});
