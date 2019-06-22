<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
</style>
