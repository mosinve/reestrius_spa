import "font-awesome/scss/font-awesome.scss";
// import Vue from "vue";
import App from "./App.vue";
import {ClientTable, Event} from "vue-tables-2";
/*import BootstrapVue from 'bootstrap-vue';
 Vue.use(BootstrapVue);*/
/**
 * I use the "babel-plugin-add-module-exports" package
 * If not use it, you have to change it to: Vue.default.use(...)
 * You can read more info about "babel-plugin-add-module-exports" package at github or npmjs.com
 */
Vue.use(vueresource);
//require('bootstrap-loader');

window.Event = Event;

Vue.use(ClientTable, [], false, require('./template.js')('client'));

//noinspection Eslint
let reestrius = new Vue({
    el: '#app',
    render: h => h(App)
});