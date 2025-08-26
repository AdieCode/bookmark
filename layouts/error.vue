<template>
  <div class="error-page">
    <div>
        <slot/>
    </div>
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
