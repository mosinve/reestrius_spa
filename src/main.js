/* eslint-disable no-undef,no-prototype-builtins,arrow-body-style */
import 'font-awesome/scss/font-awesome.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vis/dist/vis.min.css'
import appData from './api/datamodel'
import App from './components/App.vue'
import {ClientTable} from 'vue-tables-2'
import {store} from './store'
import router from './routes'
// import Vuex from 'vuex'

Vue.use(ClientTable, {}, true, require('./template.js')('client'))
Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(Vuex)

window.NODE_POSITIONS_KEY = 'reestrius_app'

/**
 *
 * @type {{fetch: ((storeKey?)), save: ((settings?, storeKey?))}}
 */
window.reestriusStorage = {
    fetch(storeKey) {
        let settings = JSON.parse(localStorage.getItem(storeKey) || '[]')
        settings.forEach(function (setting, index) {
            setting.id = index
        })
        reestriusStorage.uid = settings.length
        // console.log(settings);
        return settings
    },
    save(settings, storeKey) {
        localStorage.setItem(storeKey, JSON.stringify(settings))
    }
}

Vue.http.options.root = '/api';

// eslint-disable-next-line no-unused-vars
let reestrius = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
    data: {
        appData
    }
})