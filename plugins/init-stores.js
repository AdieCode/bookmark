export default defineNuxtPlugin(async () => {
  const content = useContentStore();
  await content.init();
});
