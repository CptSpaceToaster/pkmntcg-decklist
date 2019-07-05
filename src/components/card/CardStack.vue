<template>
  <div class="card-stack">
    <span class="card-stack-header">
      <span>50/60</span>
      <input class="title" placeholder="Deck Title"/>
      <button class="transparent-light" @click="$emit('toggleDecklist')">
        <svgicon id="hamburger" name="hamburger" :original="true" />
      </button>
    </span>
    <div v-for="bundle in this.bundles" :key="bundle.card.id">
      <span>{{bundle.count}}</span><span>{{bundle.card.name}}</span>
    </div>

    <div class="blade"/>
    <div class="blade"/>
    <div class="blade"/>
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
  align-items: stretch;
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
  flex: 1 1 auto;
}

.blade {
  height: $default--min-clickable-height;
  width: 100%;
  background-color: lightgray;
}
</style>
