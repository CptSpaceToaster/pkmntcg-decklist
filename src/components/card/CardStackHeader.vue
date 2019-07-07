<template>
  <div class="card-stack-header">
    <span>{{ `${this.decklist.count}/60` }}</span>
    <input class="title" placeholder="Deck Title"/>
    <button class="transparent-light" @click="$emit('toggleDecklist')">
      <svgicon id="hamburger" name="hamburger" :original="true" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Decklist } from '@/types/decklist';

@Component({
  components: {
  },
})
export default class CardStackHeader extends Vue {
  get decklist(): Decklist {
    return this.$store.state.decklist.decklist;
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card-stack-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;

  > * {
    margin-left: 10px;
  }

  input {
    flex: 1 1 auto;
  }
}

.title {
  border: none;
  outline: none;
  min-width: 0;
  background-color: inherit;
}
</style>
