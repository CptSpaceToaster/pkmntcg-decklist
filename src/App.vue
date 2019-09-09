<template>
  <div>
    <navigation-header/>
    <router-view/>
    <LoadDecklistModal v-show="$store.state.modal.loadDecklist"/>
    <CardInfoModal v-show="$store.state.modal.cardInfo" :card="$store.state.modal.card"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavigationHeader from '@/components/navigation/NavigationHeader.vue';
import NavigationFooter from '@/components/navigation/NavigationFooter.vue';
import LoadDecklistModal from '@/components/modals/LoadDecklistModal.vue';
import CardInfoModal from '@/components/modals/CardInfoModal.vue';
import { Component } from 'vue-property-decorator';
import { ROOT, SEARCH } from '@/store/actions.ts';

@Component({
  components: {
    NavigationHeader,
    LoadDecklistModal,
    CardInfoModal,
  },
})
export default class App extends Vue {
  private mounted() {
    this.$store.dispatch(ROOT.INITIALIZE_SETS);
    this.$store.dispatch(SEARCH.REQUEST);
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";
@import "@style/common.scss";

body {
  margin: 0;
  min-height: 100vh;
}
</style>
