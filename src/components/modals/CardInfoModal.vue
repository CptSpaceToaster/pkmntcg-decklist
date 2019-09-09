<template>
  <Modal class="card-info-modal" @close="close">
    <ModalHeader slot="header" @close="close">{{card.name}}</ModalHeader>
    <ModalBody slot="body">
      <CardInfo :card="card"/>
      <CardImage :src="card.imageUrl"/>
    </ModalBody>
  </Modal>
</template>


<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Modal from '@/components/modals/Modal.vue';
import ModalHeader from '@/components/modals/ModalHeader.vue';
import ModalBody from '@/components/modals/ModalBody.vue';
import CardImage from '@/components/card/CardImage.vue';
import CardInfo from '@/components/card/CardInfo.vue';
import { MODAL, DECKLIST } from '@/store/actions';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

@Component({
  components: {
    Modal,
    ModalHeader,
    ModalBody,
    CardImage,
    CardInfo,
  },
})
export default class LoadDecklistModal extends Vue {
  @Prop() public card!: PokemonTCG.Card;

  private close() {
    this.$store.commit(MODAL.SHOW_CARD_INFO, false);
  }
}
</script>


<style lang="scss">
@import '@style/_structure.scss';
@import '@style/_colors.scss';

.card-info-modal {
  .modal-body {
    @include row($spacing: 20px, $justify: center, $align:stretch);
    padding: 10px;
    @include sm {
      @include stack($spacing: 20px, $align: center);
    }
  }
}
</style>
