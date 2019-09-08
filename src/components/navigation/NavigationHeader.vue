<template>
  <div class="navigation-header">
    <div class="single-line title">{{ this.$route.meta.navigationTitle }}</div>
    <div class="routes">
      <router-link :to="{ path: 'builder' }">Creator</router-link>
      <router-link :to="{ path: 'inspector' }">Inspector</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import globals from '@/globals';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class NavigationHeader extends Vue {
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.navigation-header {
  @include row();
  padding: 10px;
  background-color: $primary;
  flex-wrap: wrap;

  .title {
    color: $text-color-inverted;
    font-size: 26px;
    padding: 10px;
  }

  .routes {
    @include row();
    flex: 1 0 auto;
    justify-content: flex-end;

    a {
      text-align: right;
      color: $text-color-inverted;
      font-size: 20px;
      padding: 5px;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
