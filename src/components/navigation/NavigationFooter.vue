<template>
  <div class="navigation-footer"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import globals from '@/globals';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class NavigationFooter extends Vue {
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.navigation-footer {
  @include row();
  padding: 20px;
  background-color: $primary;
  color: $text-color-inverted;
  font-size: 14px;
}
</style>
