import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import SvgIcon from 'vue-svgicon';
// tslint:disable-next-line
const VTooltip = require('v-tooltip');

// import all SVG's
import '@svg';

Vue.use(SvgIcon, {
  tagName: 'svgicon',
});

Vue.use(VTooltip);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
