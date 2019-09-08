<template>
  <div class="modal-body">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class ModalBody extends Vue {
}
</script>
