<template>
  <div class="modal-footer">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class ModalFooter extends Vue {
}
</script>
