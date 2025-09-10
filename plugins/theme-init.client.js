export default defineNuxtPlugin(() => {
  // Initialize theme immediately on client side to prevent flash
  if (process.client) {
    const savedTheme = localStorage.getItem('theme');
    let isDarkMode;
    
    if (savedTheme) {
      isDarkMode = savedTheme === 'dark';
    } else {
      isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Apply theme immediately to prevent flash
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Initialize the theme store with the determined theme
    const themeStore = useThemeStore();
    themeStore.isDarkMode = isDarkMode;
    
    // Set initialLoad to true after a brief delay to allow proper hydration
    nextTick(() => {
      themeStore.initialLoad = true;
    });
  }
});