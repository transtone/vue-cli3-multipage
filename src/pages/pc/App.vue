<template>
  <div id="app"
       :version="COMMIT_HASH"
       ref="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import '@/assets/css/airbnb_base.css'
import '@/assets/css/index.styl'
import '@/assets/css/style.css'
import { Component, Vue } from 'vue-property-decorator'
import { wsbaseURL, COMMIT_HASH } from '@/config'

@Component
export default class App extends Vue {
  COMMIT_HASH: string = COMMIT_HASH
}
</script>
