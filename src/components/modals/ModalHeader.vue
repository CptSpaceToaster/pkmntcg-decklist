<template>
  <div class="modal-header">
    <span>
      <slot>Title</slot>
    </span>
    <button class="transparent-light" @click="$emit('close')">
      <svgicon id="x" name="x" :original="true"/>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class ModalHeader extends Vue {
}
</script>

<style lang="scss" scoped>
@import '@style/_colors.scss';
@import '@style/_structure.scss';

.modal-header {
  @include row();
  padding-left: 10px;
  padding-right: 10px;
  background: $secondary;
  border-bottom: 1px solid $border-color;
  font-size: 20px;

  &>:first-child {
    flex: 1 1 auto;
  }

  @include lg {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
}
</style>
