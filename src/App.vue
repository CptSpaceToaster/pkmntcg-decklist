<template>
  <div>
    <navigation-header id="header-container"/>
    <router-view id="router-container"/>
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
  overflow-x: hidden;
  > div {
    min-height: 100vh;

    display: flex;
    flex-direction: column;
  }
}

#header-container {
  //box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}

#router-container {
  flex: 1 0 auto;
}

#footer-container {
  // box-shadow: 0 -2px 4px 0px rgba(0, 0, 0, 0.5);
}
</style>
