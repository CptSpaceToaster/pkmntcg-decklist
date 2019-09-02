<template>
  <div class="card-pile" @click="$emit('cardClicked')">
    <!-- <v-popover class="card-popover-container" trigger="hover" :disabled="!isCardInfoVisible" placement="right" :delay="{show: 300, hide: 0}" :offset="5"> -->
    <div class="card-pile-image-container">
      <picture v-for="n in count" :key="card.id + n">
        <source media="(min-width: 550px)" :srcset="card.imageUrl">
        <img :src="card.imageUrlHiRes" :style="offsetStyle(n - 1)">
      </picture>
    </div>
      <!-- <CardInfo :card="card" slot="popover"/> -->
    <!-- </v-popover> -->
    <div class="card-name" :style="offsetStyle(count-1)">{{card.name}}</div>
    <div class="card-code subhead">{{cardCode}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/card/Card.vue';
import CardInfo from '@/components/card/CardInfo.vue';
import { Component, Prop } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { CardBundle } from '@/types/bundle';

@Component({
  components: {
    Card,
    CardInfo,
  },
})
export default class CardPile extends Vue {
  @Prop() public bundle!: CardBundle;

  get isCardInfoVisible(): boolean {
    return this.$store.state.windowWidth > 550;
  }

  get card(): PokemonTCG.Card {
    return this.bundle.card;
  }

  get count(): number {
    return this.bundle.count;
  }

  get set(): PokemonTCG.Set {
    return this.$store.state.sets.find((set: PokemonTCG.Set) => this.card.setCode === set.code);
  }

  get cardCode(): string {
    if (!!this.set) {
      return `${this.set.name} ${this.card.number}/${this.set.totalCards}`;
    } else {
      return `${this.card.number}`;
    }
  }

  get tooltipContent(): string {
    return `${this.card.name}`;
  }

  private offsetStyle(n: number) {
    return `left:${n * 30}px;`;
  }

  private offsetStyle2(n: number) {
    return `left:${n * 30}px;`;
    // return `margin-right:${n * -30}px;margin-top:${n * -100}px;`;
    // return `margin-right:${n * -30}px;`;
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card-pile {
  position: relative;
  // @include stack($spacing: 5px);
  margin: 10px;
  text-align: center;

  .card-pile-image-container {
    position: relative;
    width: 240px;
    height: 0;
    padding-top: calc(340 / 240 * 100%);
  }

  img {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }

  @media (max-width: 550px) {
    width: 100%;
    .card-image-container {
      width: 100%;
      margin-bottom: 10px;
    }
    .card-popover-container {
      display: contents;
    }
    img {
      border-radius: 8px;
    }
  }
}
</style>
