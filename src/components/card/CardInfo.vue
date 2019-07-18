<template>
  <div class="card-info">
    <h2>
      {{card.name}}
      <template v-if="!!card.hp && card.hp !== 'None'">
        &ndash; {{card.hp}}
      </template>
      <template v-if="!!card.types">
        <svgicon v-for="type in card.types" :id="type" :name="type" :original="true" :key="type"/>
      </template>
    </h2>
    <template v-if="!!card.evolvesFrom">
      <p>Evolves from {{card.evolvesFrom}}</p>
    </template>
    <template v-if="!!card.text">
      <p>{{card.supertype}} &ndash; {{card.subtype}}</p>
      <blockquote v-for="(text, index) in card.text" :key="[card.id, 'text', index].join('-')">
        {{text}}
      </blockquote>
    </template>
    <template v-if="!!card.ability">
      <h3>
        {{card.ability.type}}: {{card.ability.name}}
      </h3>
      <p>{{card.ability.text}}</p>
    </template>
    <template v-if="!!card.attacks">
      <div v-for="attack in card.attacks" :key="[card.id, attack.name].join('-')">
        <h3>
          <svgicon v-for="(type, index) in attack.cost" :id="type" :name="type" :original="true" :key="[card.id, attack.name, index.toString()].join('-')"/>
          {{attack.name}}
          <template v-if="!!attack.damage">
            &ndash; {{attack.damage}}
          </template>
        </h3>
        <p>{{attack.text}}</p>
      </div>
    </template>
    <template v-if="!!card.weaknesses">
      <h5>
        Weakness
        <span v-for="(weak, index) in card.weaknesses" :key="[card.id, 'weak', index].join('-')">
          <svgicon :id="weak.type" :name="weak.type" :original="true"/>
          {{weak.value}}
        </span>
      </h5>
    </template>
    <template v-if="!!card.resistances">
      <h5>
        Resistance
        <span v-for="(res, index) in card.resistances" :key="[card.id, 'res', index].join('-')">
          <svgicon :id="res.type" :name="res.type" :original="true"/>
          {{res.value}}
        </span>
      </h5>
    </template>
    <template v-if="card.supertype === 'Pokémon'">
      <h5>
        Retreat Cost
        <svgicon v-for="(type, index) in card.retreatCost" :id="type" :name="type" :original="true" :key="[card.id, 'retreat', index].join('-')"/>
      </h5>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { Component, Prop } from 'vue-property-decorator';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

@Component({
  components: {
  },
})
export default class CardInfo extends Vue {
  @Prop() public card!: PokemonTCG.Card;
}
</script>

<style lang="scss">
@import "@style/_structure.scss";
@import "@style/_colors.scss";

.card-info {
  max-width: 500px;
  h2 {
    margin-top: 0px;
  }
  h5 {
    margin-top: 3px;
    margin-bottom: 3px;
  }
}
</style>
