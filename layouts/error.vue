<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">Page Not Found</h1>
    <h1 v-else>Something Went Wrong</h1>
    <p>{{ error.message }}</p>
    <nuxt-link to="/">Go Back to Home</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  background-color: #f9f9f9;
  color: #333;
}
</style>
