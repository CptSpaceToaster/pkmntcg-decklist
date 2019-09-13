<template>
  <div class="card-blade">
    <div class="crop" :style="cropStyle" @click="showCardInfo()">
      <span class="outline bundle-count">{{bundle.count}}</span>
      <span class="outline">{{card.name}}</span>
    </div>
    <div class="controls">
      <button class="transparent-dark" @click="addCard()">
        <svgicon id="plus" name="plus" :original="true"/>
      </button>
      <button class="transparent-dark" @click="removeCard()">
        <svgicon id="minus" name="minus" :original="true"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CardInfo from '@/components/card/CardInfo.vue';
import { Component, Prop } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { DECKLIST, MODAL } from '@/store/actions';
import { CardBundle } from '@/types/bundle';

@Component({
  components: {
    CardInfo,
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
      background-position: -24px ${this.cropHeight};
      `;
  }

  private showCardInfo() {
    this.$store.commit(MODAL.SET_CARD_INFO, this.card);
    this.$router.push({ path: this.$route.name, query: { card: this.card.id }});
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
  flex: 1 1 auto;
  min-width: 0;
  height: 50px;
  display: flex;
  align-items: center;

  .bundle-count {
    flex: 0 0 auto;
  }

  .outline {
    margin: 4px;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
