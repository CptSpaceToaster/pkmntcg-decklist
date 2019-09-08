import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import SvgIcon from 'vue-svgicon';

// import all SVG's
import '@svg';

Vue.use(SvgIcon, {
  tagName: 'svgicon',
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
