<template>
  <Modal class="import-deck-modal" @close="close">
    <ModalHeader slot="header" @close="close">Import Decklist</ModalHeader>
    <ModalBody input="decklistText" cols="1000" slot="body">
      <textarea v-model="decklistText" placeholder="Copy decklist text here"/>
      <button class="transparent-light" @click="importList">
        Import
        <svgicon id="import_from_clipboard" name="import_from_clipboard" :original="true"/>
      </button>
    </ModalBody>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Modal from '@/components/modals/Modal.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalBody from '@/components/modals/ModalBody.vue';
import { Decklist } from '@/types/decklist';
import { MODAL, DECKLIST } from '@/store/actions';

@Component({
  components: {
    Modal,
    ModalHeader,
    ModalBody,
  },
})
export default class ImportDecklistModal extends Vue {
  private decklistText: string = '';

  get decklist(): Decklist {
    return this.$store.state.decklist.decklist;
  }

  private close() {
    if (this.$store.state.modal.closeNormal) {
      this.$router.go(-1);
    } else {
      this.$router.replace('/');
      this.$store.commit(MODAL.IMPORT_DECKLIST, false);
    }
  }

  private async importList() {
    this.$store.dispatch(DECKLIST.LOAD_FROM_STRING, this.decklistText);
    this.decklistText = '';
    this.close();
  }
}
</script>


<style lang="scss">
@import '@style/_structure.scss';
@import '@style/_colors.scss';

.modal-mask {
  @include lg {
    align-items: stretch;
  }
}

.modal-container {
  @include lg {
    margin: 100px;
    flex: 1 1 auto;
  }
}

.import-deck-modal {
  .modal-body {
    flex: 1 1 auto;
    @include stack();
    textarea {
      flex: 1 1 auto;
    }
  }
}
</style>
