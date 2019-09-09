<template>
  <div class="card">
    <CardImage :src="card.imageUrl" @imageClicked="$emit('cardClicked')"/>
    <div class="card-info">
      <div class="card-info-text">
        <div class="single-line">{{card.name}}</div>
        <div class="single-line subhead">{{cardCode}}</div>
      </div>
      <button class="transparent-light" @click="$emit('showCardInfo')">
        <svgicon id="mag" name="mag" :original="true" />
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CardInfo from '@/components/card/CardInfo.vue';
import CardImage from '@/components/card/CardImage.vue';
import { Component, Prop } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

@Component({
  components: {
    CardInfo,
    CardImage,
  },
})
export default class Card extends Vue {
  @Prop() public card!: PokemonTCG.Card;

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
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card {
  @include stack($spacing: 5px);
  margin: 10px;
  text-align: center;
  width: 280px;

  >:first-child {
    margin-bottom: 10px;
  }

  .card-info {
    @include row($justify: center);
    .card-info-text {
      min-width: 0;
    }
  }
}
</style>
