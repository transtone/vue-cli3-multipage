<template>
  <div class="home">
    <img alt="Vue logo"
         src="@/assets/logo.png">
    <HelloWorld msg="Welcome to Your page1.html" />
    我是page1的home
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
