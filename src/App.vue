<template>
  <div>
    <navigation-header/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavigationHeader from '@/components/navigation/NavigationHeader.vue';
import NavigationFooter from '@/components/navigation/NavigationFooter.vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    NavigationHeader,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";
@import "@style/common.scss";
@import "@style/tooltip.scss";

body {
  margin: 0;
  min-height: 100vh;
}
</style>
