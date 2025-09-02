<template>
    <div class="flex flex-col justify-center items-center mt-20">
       <img src="https://img.icons8.com/ios-filled/150/google-logo.png" alt="" class="sway-animation">
       <h2 class="text-xl font-bold mt-4 bounce-down">Login in with Google</h2>
    </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute();
const authStore = useAuthStore();
const token = route.query.token || 'no token';

await authStore.oAuthLogin(token)
if (authStore.checkAuth()){
    // router.back();
    router.push("/mainpage");
} else {
    router.push("/auth/sign-up");
}
</script>

<style lang="css" scoped>
@keyframes sway {
  0% {
    transform: rotateZ(0deg);
  }
  20% {
    transform: rotateZ(10deg);
  }
  60% {
    transform: rotateZ(-10deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}

@keyframes bounceDown {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(4px);
  }
  100% {
    transform: translateY(0);
  }
}

.bounce-down {
    animation: bounceDown 0.7s ease-out infinite;
}

.sway-animation {
  animation: sway 3s ease-out infinite;
}

</style>