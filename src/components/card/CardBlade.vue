<template>
  <div class="card-blade">
    <div class="crop" :style="cropStyle">
      <span class="outline">{{bundle.count}}</span>
      <span class="outline">{{card.name}}</span>
    </div>
    <div class="controls">
      <button class="transparent-light" @click="addCard()">
        <svgicon id="plus" name="plus" :original="true" />
      </button>
      <button class="transparent-light" @click="removeCard()">
        <svgicon id="minus" name="minus" :original="true" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { DECKLIST } from '@/store/actions';
import { CardBundle } from '@/types/decklist';

@Component({
  components: {
  },
})
export default class Card extends Vue {
  @Prop() public bundle!: CardBundle;

  get card(): PokemonTCG.Card {
    return this.bundle.card;
  }

  get cropHeight(): string {
    switch (this.card.supertype) {
      case 'Trainer':
        return '-80px';
      case 'Energy':
        switch (this.card.subtype) {
          case 'Basic': return '-180px';
          case 'Special': return '-120px';
          default: return '-180px';
        }
      default:
        return '-40px';
    }
  }

  get cropStyle(): string {
    return `
      background: url(${this.card.imageUrl});
      background-repeat: no-repeat;
      background-position: -20px ${this.cropHeight};
      `;
  }

  private addCard() {
    this.$store.commit(DECKLIST.ADD_CARD, this.card);
  }

  private removeCard() {
    this.$store.commit(DECKLIST.REMOVE_CARD, this.card);
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card-blade {
  background-color: $decklist-background-color;
  display: flex;
}

.crop {
  box-shadow:inset 0 0 6px 4px $decklist-background-color;
  height: 50px;
  width: 200px;
  display: flex;
  align-items: center;

  .outline {
    margin-left: 8px;
    font-size: 20px;
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  > :first-child {
    flex: 0 0 auto;
  }
}

.controls {
  flex: 1 1 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > :last-child {
    transform: rotate(180deg)
  }
}
</style>
