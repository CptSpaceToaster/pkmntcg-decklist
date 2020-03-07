<template>
  <div class="decklist-inspector">
    <DeckGrid id="deck-grid-container"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DeckGrid from '@/components/card/DeckGrid.vue';
import { Component } from 'vue-property-decorator';
import { Decklist } from '@/types/decklist';
import { MODAL } from '@/store/actions';

@Component({
  components: {
    DeckGrid,
  },
})
export default class DecklistInspector extends Vue {
  private isCardStackShown = window.innerWidth > 550;

  get decklist(): Decklist {
    return this.$store.state.decklist.decklist;
  }

  private gotoBuilder() {
    this.$store.commit(MODAL.SET_CLOSE_INFO_NORMAL);
    this.$router.push('builder');
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

$card-stack-width: 300px;

#card-stack-header-container {
  position: fixed;
  right: 0;
  width: $card-stack-width;
  bottom: 0;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border: 1px solid $border-color;
}
</style>
