export default defineNuxtPlugin(async () => {
  const content = useContentStore();
  // const theme = useThemeStore();
  await content.init();
  // theme.initTheme();
});
