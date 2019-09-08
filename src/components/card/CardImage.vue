<template>
  <span class="card-image-holder" @click="$emit('imageClicked')">
    <picture>
      <img :src="src">
    </picture>
  </span>
</template>
<script lang="ts">
import Vue from 'vue';
import CardInfo from '@/components/card/CardInfo.vue';
import { Component, Prop } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

@Component
export default class CardImage extends Vue {
  @Prop() public src!: string;
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card-image-holder {
  width: 280px;
  height: 385px;

  background: $new-card-back;
  border-radius: 12px;

  img {
    width: 280px;
    max-height: 385px;
    border-radius: 12px;

    box-shadow: 0 2px 4px 0 #888;
  }
}
</style>
