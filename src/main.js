import "font-awesome/scss/font-awesome.scss";
import Vue from "vue";
import App from "./App.vue";
import {ClientTable, Event} from "vue-tables-2";
/*import BootstrapVue from 'bootstrap-vue';
 Vue.use(BootstrapVue);*/

//require('bootstrap-loader');

window.Event = Event;

Vue.use(ClientTable, [], false, require('./template.js')('client'));

//noinspection Eslint
let reestrius = new Vue({
    el: '#app',
    render: h => h(App)
});