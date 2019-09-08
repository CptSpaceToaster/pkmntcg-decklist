declare module 'vue-mq' {
  import Vue, { VueConstructor } from 'vue';
  export function install(Vue: VueConstructor<Vue>, options?: any): void;
}
