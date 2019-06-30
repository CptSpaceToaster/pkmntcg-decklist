<template>
  <span class="navigation-header">
    {{ this.$route.meta.navigationTitle }}
  </span>
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
  padding: 20px;
  background-color: $primary;
  color: $text-color-inverted;
  font-size: 26px;
}
</style>
