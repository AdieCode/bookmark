export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  });
});
