<template>
  <Modal class="load-decklist-modal" @close="close">
    <ModalHeader slot="header" @close="close">Load Decklist</ModalHeader>
    <ModalBody slot="body">
      <template v-if="availableLists.length > 0">
        <div class="deck-storage">
          <div class="deck" v-for="deck in availableLists" :key="deck">
            <div class="deckbox"></div>
            <span class="deck-control">
              <button class="transparent-light" @click="deckLoad(deck)">
                <svgicon id="import_from_disk" name="import_from_disk" :original="true" />
              </button>
              <button class="transparent-light" @click="deckTrash(deck)">
                <svgicon id="trash" name="trash" :original="true" />
              </button>
            </span>
            <span>{{deck}}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <span class="empty">No Decklists in storage</span>
      </template>
    </ModalBody>
  </Modal>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Modal from '@/components/modals/Modal.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalBody from '@/components/modals/ModalBody.vue';
import { MODAL, DECKLIST } from '@/store/actions';

@Component({
  components: {
    Modal,
    ModalHeader,
    ModalBody,
  },
})
export default class LoadDecklistModal extends Vue {
  get availableLists(): string[] {
    return this.$store.state.decklist.slots;
  }
  private close() {
    this.$store.commit(MODAL.LOAD_DECKLIST, false);
  }

  private deckLoad(deck: string) {
    this.$store.commit(DECKLIST.LOAD, deck);
    this.$store.commit(MODAL.LOAD_DECKLIST, false);
  }

  private deckTrash(deck: string) {
    this.$store.commit(DECKLIST.DELETE, deck);
  }
}
</script>


<style lang="scss">
@import '@style/_structure.scss';
@import '@style/_colors.scss';

.load-decklist-modal {
  .modal-body {
    @include stack($align: stretch);
    margin: 10px;
    .empty {
      flex: 1 1 auto;
      text-align: center;
    }
    .deck-storage {
      @include row();
      flex-wrap: wrap;
      .deck {
        @include stack($spacing: 0, $align: center);
        padding: 5px;
        transition: background-color $default--transition-duration;
        .deckbox {
          background: $primary;
          width: 100px;
          height: 100px;
          margin: 5px;
        }
        .deck-control {
          @include row();
        }
      }
    }
  }
}
</style>
