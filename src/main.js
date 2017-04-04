/* eslint-disable no-undef */
import "font-awesome/scss/font-awesome.scss";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vis/dist/vis.min.css';
import appData from './api/datamodel';
import App from "./App.vue";
import {ClientTable} from "vue-tables-2";

Vue.use(BootstrapVue);
Vue.use(VueResource);

let STORAGE_KEY = 'reestrius_app';

let reestriusStorage = {
    fetch() {
        let settings = JSON.parse(localStorage(STORAGE_KEY) || '[]');
        settings.forEach(function (setting, index) {
            setting.id = index
        });
        reestriusStorage.uid = settings.length;
        return settings
    },
    save(settings) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    }
};

const objectsData = {
    state: {
        all: []
    },
};

const propertiesData = {
    state: {
        all :[]
    },
};

const appData = {
    state: {
        current
    }
}

const store = new Vuex.Store({
    mutations: {
        increment (state) {
            state.count++
        }
    }
});

let DataProperty = function (data) {
    this.id = data.id;
    this.properties = {
        main: [
            {
                id: 'name',
                name: 'Наименование',
                value: data.name
            },
            {
                id: 'code',
                name: 'Код',
                value: data.code
            },
            {
                id: 'type',
                name: 'Тип',
                value: data.type
            }
        ]
    }
};

let getProperties = function() {
    return Object.keys(this.properties).map(prop => this.properties[prop])
};

DataProperty.prototype.getProperties = getProperties;

let DataObject = function (data) {
    this.id = data.id;
    this.links = [];
    this.properties = []
};

DataObject.prototype.addProperty = function(propData) {
    this.properties.push(propData)
};
DataObject.prototype.getProperties = getProperties;

let Data = function(type, data = {}) {
    switch (type) {
        case 'objects':
            return new DataObject(data);
        case 'properties':
            return new DataProperty(data);
        case 'users':
            break;
    }
};

Vue.use(ClientTable, {}, true, require('./template.js')('client'));

//noinspection Eslint
let reestrius = new Vue({
    el: '#app',
    store,
    render: h => h(App),
    data: {
        appData
    },
    methods:{
        Data
    }
});