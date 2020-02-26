<template>
  <Modal class="card-info-modal" @close="close">
    <ModalHeader slot="header" @close="close">{{card.name}}</ModalHeader>
    <ModalBody slot="body">
      <CardInfo :card="card"/>
      <div>
        <CardImage :src="card.imageUrl"/>
        <CardPrice :cardPrice="$store.state.modal.cardPrice"/>
      </div>
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
import CardPrice from '@/components/card/CardPrice.vue';
import { MODAL, DECKLIST } from '@/store/actions';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

@Component({
  components: {
    Modal,
    ModalHeader,
    ModalBody,
    CardImage,
    CardInfo,
    CardPrice,
  },
})
export default class LoadCardModal extends Vue {
  @Prop() public card!: PokemonTCG.Card;

  private close() {
    if (this.$store.state.modal.closeNormal) {
      this.$router.go(-1);
    } else {
      this.$router.replace('/');
      this.$store.commit(MODAL.SHOW_CARD_INFO, false);
    }
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
