/* eslint-disable no-undef */
import "font-awesome/scss/font-awesome.scss";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vis/dist/vis.min.css';
import appData from './api/datamodel';
import App from "./App.vue";
import {ClientTable} from "vue-tables-2";
import * as types from './mutation-types'
import * as lang from './lang'
Vue.use(VueResource);
Vue.use(BootstrapVue);

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
    getters: {
        getObject: (state, getters) => (id) => {
            return state.all.find(el => el.id === id)
        }
    },
    mutations: {
        [types.objects.ADD_ITEM] (state, item) {
            state.all.push(item)
        },
        [types.objects.EDIT_ITEM] (state, {itemId, newData}){
            let item = state.all.find(el => el.id === itemId);
            newData.keys.forEach(function (key) {
                item[key] = newData[key]
            });
            state.all[itemId] = item
        }
    },
    actions: {

    }
};

const propertiesData = {
    state: {
        all :[]
    },
    // getters: {
    //
    // },
    mutations: {
        [types.properties.ADD_ITEM] (state, item) {
            state.all.push(item)
        },
        [types.properties.EDIT_ITEM] (state, {itemId, newData}){
            let item = state.all.find(el => el.id === itemId);
            newData.keys.forEach(function (key) {
                item[key] = newData[key]
            });
            state.all[itemId] = item
        }
    }
};

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        activeEditor: null,
        visPositions: null,
        lang: lang
    },
    modules:{
        objects : objectsData,
        properties: propertiesData,
    },
    mutations: {
        setEditorType(state, id){
            state.activeEditor = id
        }
    },
    getters: {
        editorItems : (state, getters) => state.activeEditor? state[state.activeEditor].all: null,
        itemById: (state, getters) => (id) => {
            return state[state.activeEditor].all.find(el => el.id === id)
        }
    },
    actions: {
        addItem ({commit, state}, item) {
            commit(types[state.activeEditor].ADD_ITEM, item)
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