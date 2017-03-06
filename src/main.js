import 'font-awesome/scss/font-awesome.scss';    
import Vue from 'vue'
//import jquery from 'jquery'
import jqueryui from 'jqueryui'
import App from './App.vue'
require('bootstrap-loader');
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
//import cytoscape from 'cytoscape';
// var viewUtilities = require('cytoscape-view-utilities');

// var cydagre = require('cytoscape-dagre');
// cydagre( cytoscape ); // register extension
//viewUtilities( cytoscape, jQuery ); // register extension

Vue.use(ClientTable, [], false, require('./template.js')('client'));

let app = new Vue({
  el: '#app',
  render: h => h(App)
})