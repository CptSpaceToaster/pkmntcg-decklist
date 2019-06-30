<template>
  <div>
    <navigation-header id="header-container"/>
    <router-view id="router-container"/>
    <navigation-footer id="footer-container"/>
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
    NavigationFooter,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";
@import "@style/common.scss";

$header-height: 70px;

body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}

#header-container {
  position: relative;
  z-index: 200;
  flex: 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}

#router-container {
  position: relative;
  z-index: 100;
  flex: 1 1 auto;
}

#footer-container {
  position: relative;
  z-index: 200;
  flex: 0;
  box-shadow: 0 -2px 4px 0px rgba(0, 0, 0, 0.5);
}
</style>
