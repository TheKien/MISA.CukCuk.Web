import Vue from 'vue'
import App from './App.vue'
import store from './store'

import { router } from './router/index'
import vSelect from 'vue-select'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
import { VTooltip } from 'v-tooltip'
import money from 'v-money'

/* Thư viện tooltip */
Vue.directive('tooltip', VTooltip)
Vue.config.productionTip = false
/* Thư viện combobox */
Vue.component('v-select', vSelect)
/* Thư viện validate */
Vue.use(Vuelidate)
/* Thư viện format input */
Vue.use(VueMask);
export const eventBus = new Vue()
 
// Thư viện convert money
Vue.use(money, {precision: 4})
new Vue({
  store,
  router,
  vSelect,
  render: h => h(App)
}).$mount('#app')
