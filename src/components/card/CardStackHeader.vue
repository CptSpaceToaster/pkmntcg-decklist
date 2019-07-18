<template>
  <div class="card-stack-header">
    <span>{{ `${this.decklist.count}/60` }}</span>
    <input @input="changeTitle" class="title" placeholder="Deck Title" v-model="decklist.title"/>
    <button class="transparent-light" @click="$emit('toggleDecklist')">
      <svgicon id="hamburger" name="hamburger" :original="true" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Decklist } from '@/types/decklist';
import { DECKLIST } from '@/store/actions';

@Component({
  components: {
  },
})
export default class CardStackHeader extends Vue {
  get decklist(): Decklist {
    return this.$store.state.decklist.decklist;
  }

  private changeTitle(event: any) {
    this.$store.commit(DECKLIST.TITLE, event.target.value);
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
  background-color: $secondary;

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
