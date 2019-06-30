<template>
  <div class="card-list">
    <span class="title">Card List</span>
    <span class="sep"></span>
    <div v-for="bundle in this.bundles" :key="bundle.card.id">
      <span>{{bundle.count}}</span><span>{{bundle.card.name}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import globals from '@/globals';
import { Component } from 'vue-property-decorator';
import { DECKLIST } from '@/store/actions';
import { Decklist, CardBundle } from '@/types/decklist';

@Component({
  components: {
  },
})
export default class CardList extends Vue {
  get decklist(): Decklist {
    return this.$store.state.decklist.decklist;
  }
  get bundles(): CardBundle[] {
    return this.decklist.bundles;
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card-list {
  @include stack($spacing: 5px);
  box-sizing: border-box;
  padding: 10px;
}

.title {
  font-size: 20px;
}

.sep {
  height: 2px;
  background: dimgray;
}
</style>
