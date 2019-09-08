<template>
  <transition name="modal">
    <div class="modal-mask" @click="maskPressed">
      <div class="modal-container">
        <div class="modal-header" :class="$mq">
          <slot name="header">default header</slot>
        </div>
        <div class="modal-body" :class="$mq">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer" :class="$mq">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  private maskPressed(event: any) {
    if (!event.target.className.startsWith || !event.target.className.startsWith('modal-mask')) {
      event.preventDefault();
      return;
    }
    this.$emit('close');
  }
}
</script>

<style lang="scss" scoped>
@import '@style/_structure.scss';
@import '@style/_colors.scss';

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;

  display: flex;
  justify-content: center;
  align-items: stretch;
}

.modal-container {
  display: flex;
  flex-direction: column;
  margin: 100px;
  flex: 1 1 auto;

  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  background-color: white;

  @include sm {
    margin: 0;
    border-radius: 0;
  }
}

.modal-header {
  flex: 0 0 auto;
}

.modal-body {
  overflow-y: auto;
}

.modal-footer {
  flex: 0 0 auto;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  @include sm {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
}
</style>
