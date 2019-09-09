<template>
  <div class="card-pile">
    <div class="card-pile-image-holder">
      <CardImage :src="card.imageUrl" v-for="n in count" :key="card.id + n" :style="offsetStyle(n - 1)"/>
    </div>
    <div class="single-line">{{card.name}}</div>
    <div class="single-line subhead">{{cardCode}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/card/Card.vue';
import CardInfo from '@/components/card/CardInfo.vue';
import CardImage from '@/components/card/CardImage.vue';
import { Component, Prop } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { CardBundle } from '@/types/bundle';

@Component({
  components: {
    Card,
    CardInfo,
    CardImage,
  },
})
export default class CardPile extends Vue {
  @Prop() public bundle!: CardBundle;

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

  private offsetStyle(n: number) {
    if (n > 0) {
      return `margin-left:${-240}px;`;
    }
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card-pile {
  margin: 10px;
  text-align: center;
  >:first-child {
    margin-bottom: 10px;
  }
}


</style>
