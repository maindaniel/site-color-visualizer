import Vue from 'vue'
import App from './App.vue'
import UUID from "vue-uuid";
import {ColorPicker, ColorPanel} from 'one-colorpicker'
import Dragula from 'vue-dragula';

Vue.use(UUID);

Vue.config.productionTip = false

Vue.use(ColorPanel)
Vue.use(ColorPicker)
Vue.use(Dragula)

new Vue({
  render: h => h(App),
}).$mount('#app')
