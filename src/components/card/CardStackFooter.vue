<template>
  <div class="card-stack-footer">
    <button class="transparent-light" @click="copyToClipboard">
      <svgicon id="copy_to_clipboard" name="copy_to_clipboard" :original="true" />
    </button>
    <button class="transparent-light" @click="$emit('saveToFile')">
      <svgicon id="save_to_text" name="save_to_text" :original="true" />
    </button>
    <button class="transparent-light" @click="$emit('trash')">
      <svgicon id="trash" name="trash" :original="true" />
    </button>
    <button class="transparent-light" @click="$emit('saveToDisk')">
      <svgicon id="save_to_disk" name="save_to_disk" :original="true" />
    </button>
    <button v-if="false" class="transparent-light" @click="$emit('importFromDisk')">
      <svgicon id="import_from_disk" name="import_from_disk" :original="true" />
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
export default class CardStackFooter extends Vue {
  private showCopy = false;

  get disableCopy(): boolean {
    return !(!!this.$store.state.sets && this.$store.state.sets.length > 0);
  }
  get decklist(): Decklist {
    return this.$store.state.decklist.decklist;
  }

  private copyToClipboard() {
    this.showCopy = true;
    this.$emit('copyToClipboard');
    setTimeout(() => this.showCopy = false, 1500);
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card-stack-footer {
  display: flex;
  flex-direction: row;
  background-color: $secondary;
  button {
    flex: 1 1 auto;
  }
}
</style>
