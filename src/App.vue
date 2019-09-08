<template>
  <div>
    <navigation-header/>
    <router-view/>
    <LoadDecklistModal v-show="$store.state.modal.loadDecklist"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NavigationHeader from '@/components/navigation/NavigationHeader.vue';
import NavigationFooter from '@/components/navigation/NavigationFooter.vue';
import LoadDecklistModal from '@/components/modals/LoadDecklistModal.vue';
import { Component } from 'vue-property-decorator';
import { ROOT, SEARCH } from '@/store/actions.ts';

@Component({
  components: {
    NavigationHeader,
    LoadDecklistModal,
  },
})
export default class App extends Vue {
  private mounted() {
    // hacky responsiveness
    window.addEventListener('resize', this.handleResize);

    this.$store.dispatch(ROOT.INITIALIZE_SETS);
    this.$store.dispatch(SEARCH.REQUEST);
  }

  private destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }

  private handleResize(event: Event) {
    this.$store.commit(ROOT.WINDOW_WIDTH, window.innerWidth);
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
