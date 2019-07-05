<template>
  <div class="card-stack">
    <CardStackHeader @toggleDecklist="$emit('toggleDecklist')"/>
    <div v-for="bundle in this.bundles" :key="bundle.card.id">
      <CardBlade :bundle="bundle"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import globals from '@/globals';
import CardStackHeader from '@/components/card/CardStackHeader.vue';
import CardBlade from '@/components/card/CardBlade.vue';
import { Component } from 'vue-property-decorator';
import { DECKLIST } from '@/store/actions';
import { Decklist, CardBundle } from '@/types/decklist';

@Component({
  components: {
    CardStackHeader,
    CardBlade,
  },
})
export default class CardStack extends Vue {
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

.card-stack {
  display: flex;
  flex-direction: column;
}

.card-stack-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;

  > * {
    margin-left: 10px;
  }
}

.title {
  border: none;
  outline: none;
  min-width: 0;
}
</style>
