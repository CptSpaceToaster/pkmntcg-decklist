import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import SvgIcon from 'vue-svgicon';
import VueMq from 'vue-mq';
import VueTippy from 'vue-tippy';

// import all SVG's
import '@svg';

Vue.use(SvgIcon, {
  tagName: 'svgicon',
});

Vue.use(VueMq, {
  // These breakpoint should match those in _structure.scss
  breakpoints: {
    sm: 550,
    md: 1050,
    lg: Infinity,
  },
});

Vue.use(VueTippy, {
  directive: 'tippy',
  flipDuration: 0,
  trigger: 'click',
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
