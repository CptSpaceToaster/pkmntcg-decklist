<template>
  <div class="card-price" >
    <a :href="this.cardPrice.url" target="_blank" @click="priceClicked">
      <button id="open-to-tcg" class="transparent-light">
        <svgicon id="open" name="open" :original="true"/>
      </button>
      <div>
        <h3 v-show="cardPrice.normal_marketPrice">Normal: {{cardPrice.normal_marketPrice | toCurrency}}</h3>
        <h5 v-show="cardPrice.normal_marketPrice">{{cardPrice.normal_lowPrice | toCurrency}} • {{cardPrice.normal_midPrice | toCurrency}} • {{cardPrice.normal_highPrice | toCurrency}}</h5>
        <h3 v-show="cardPrice.holofoil_marketPrice">Holofoil: {{cardPrice.holofoil_marketPrice | toCurrency}}</h3>
        <h5 v-show="cardPrice.holofoil_marketPrice">{{cardPrice.holofoil_lowPrice | toCurrency}} • {{cardPrice.holofoil_midPrice | toCurrency}} • {{cardPrice.holofoil_highPrice | toCurrency}}</h5>
        <h3 v-show="cardPrice.reverse_holofoil_marketPrice">Reverse Holofoil: {{cardPrice.reverse_holofoil_marketPrice | toCurrency}}</h3>
        <h5 v-show="cardPrice.reverse_holofoil_marketPrice">{{cardPrice.reverse_holofoil_lowPrice | toCurrency}} • {{cardPrice.reverse_holofoil_midPrice | toCurrency}} • {{cardPrice.reverse_holofoil_highPrice | toCurrency}}</h5>
      </div>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { Component, Prop } from 'vue-property-decorator';
import { CardPrice } from '@/types/network';

@Component({
  components: {
  },
})
export default class CardInfo extends Vue {
  @Prop() public cardPrice!: CardPrice;

  public priceClicked() {
    window.open(this.cardPrice.url);
  }
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card-price {
  text-align: center;
  position: relative;
  top: 10px;
  padding-top: 10px;
}

a {
  color: darkslategray;
  text-decoration: none;
}

.card-price:hover {
  cursor: pointer;
}

h3 {
  margin: 0;
}
h5 {
  margin: 10px;
}

#open-to-tcg {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
