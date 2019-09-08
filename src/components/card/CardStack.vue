<template>
  <div class="card-stack">
    <CardStackHeader @toggleInspector="$emit('toggleInspector')" @toggleDecklist="$emit('toggleDecklist')"/>
    <span class="header-info">
      <span class="outline">Pokemon<br/>{{decklist.pokemonCount}}</span>
      <span class="outline">Trainers<br/>{{decklist.trainerCount}}</span>
      <span class="outline">Energy<br/>{{decklist.energyCount}}</span>
    </span>
    <div class="bundle">
      <CardBlade v-for="bundle in decklist.pokemonBundles" :key="bundle.card.id" :bundle="bundle"/>
    </div>
    <div class="bundle">
      <CardBlade v-for="bundle in decklist.trainerBundles" :key="bundle.card.id" :bundle="bundle"/>
    </div>
    <div class="bundle">
      <CardBlade v-for="bundle in decklist.energyBundles" :key="bundle.card.id" :bundle="bundle"/>
    </div>
    <CardStackFooter
      @copyToClipboard="copyToClipboard"
      @saveToFile="saveToFile"
      @trash="trash"
      @saveToDisk="saveToDisk"
      />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import globals from '@/globals';
import CardStackHeader from '@/components/card/CardStackHeader.vue';
import CardBlade from '@/components/card/CardBlade.vue';
import CardStackFooter from '@/components/card/CardStackFooter.vue';
import { Component } from 'vue-property-decorator';
import { DECKLIST } from '@/store/actions';
import { Decklist } from '@/types/decklist';
import { CardBundle } from '@/types/bundle';

@Component({
  components: {
    CardStackHeader,
    CardBlade,
    CardStackFooter,
  },
})
export default class CardStack extends Vue {
  get decklist(): Decklist {
    return this.$store.state.decklist.decklist;
  }
  get decklistText(): string {
    return this.decklist.toString();
  }

  private copyToClipboard() {
    this.decklist.sort();
    const textArea = document.createElement('textarea');
    textArea.value = this.decklistText;
    document.body.appendChild(textArea);
    // textArea.focus();
    textArea.select();
    document.execCommand('copy');
    // window.getSelection().removeAllRanges();
    document.body.removeChild(textArea);
  }

  private saveToFile() {
    this.decklist.sort();
    const pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.decklistText));
    pom.setAttribute('download', this.decklist.title || 'New Deck');

    pom.style.display = 'none';
    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
  }

  private trash() {
    this.$store.commit(DECKLIST.EMPTY);
  }

  private saveToDisk() {
    this.decklist.sort();
    this.$store.commit(DECKLIST.SAVE);
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card-stack {
  display: flex;
  flex-direction: column;
  background-color: $decklist-background-color;
  overflow-y: overlay;

  .card-stack-header {
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .card-stack-footer {
    position: sticky;
    bottom: 0;
    z-index: 100;
  }
}

.title {
  border: none;
  outline: none;
  min-width: 0;
}

.header-info {
  @include row(0, $justify: space-around);
  margin: 4px 0;
  .outline {
    text-align: center;
    font-size: 18px;
  }
}

.bundle {
  & > :first-child {
    margin-top: 12px;
  }
}
</style>
