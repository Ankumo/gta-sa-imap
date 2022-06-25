import Vue from 'vue';
import App from './App.vue';
import store from './lib/store';
import { Objectives } from './lib/constants';

Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();

const dict = {};

Object.values(Objectives).forEach((k) => (dict[k] = []));

Vue.prototype.$dict = dict;
Vue.prototype.$v = '0.1';

store.dispatch('init');

new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app');
