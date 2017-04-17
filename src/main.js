/* eslint-disable no-undef,no-prototype-builtins */
import "font-awesome/scss/font-awesome.scss";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vis/dist/vis.min.css';
import appData from './api/datamodel';
import App from "./App.vue";
import {ClientTable} from "vue-tables-2";
import * as types from './mutation-types'
import * as _lang from './lang'
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
        links: state => (id) => state.all.filter(el => el.id !== id).map(el=> {
            return {text: el.name, value: el.id}
        }),
        objectById: (state, getters) => (id) => {
            return state.all.find(el => el.id === id)
        },
        nodes: (state, getters) => {
            return state.all.map(el => {
                return {id: el.id, label: el.name, group: el.type}
            })
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
    getters: {
        meta: state => (id) => state.all.map(el=> {
            return {text: el.name, value: el.code}
        }),
        propertyById: state => (id) => state.all.filter(el => el.id === id),
        propertyByCode: state => (code) => state.all.filter(el => el.code === code),
    },
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
    // strict: process.env.NODE_ENV !== "production",
    state: {
        activeEditor: "",
        visPositions: null,
        lang: _lang,
    },
    modules:{
        objects : objectsData,
        properties: propertiesData,
    },
    mutations: {
        setEditorType(state, id){
            state.activeEditor = id
        },
        toggleItem(state, {id, active}){
            Vue.set(state[state.activeEditor].all.find(el => el.id === id), "selected", active)
        },
    },
    getters: {
        getProps: (state, getters) => {
            return function(tab,id){
                return getters[tab](id)
            }
        },
        currentModule: state => state[state.activeEditor],
        editorItems : (state, getters) => state.activeEditor ? getters.currentModule.all : [],
        itemById: (state, getters) => (id) => {
            return getters.editorItems.find(el => el.id === id)
        },
        activeItem: (state, getters) => {
            let item = getters.editorItems.find(el => el.selected);
            if (item === undefined) {
                return null
            }
            return item.hasOwnProperty("id")? item.id : null
        },
        _r : (state, getters) => (text) => state.lang.RU[text]
    },
    actions: {
        addItem ({commit, state}, item) {
            commit(types[state.activeEditor].ADD_ITEM, item)
        }
    }

});

Vue.use(ClientTable, {}, true, require('./template.js')('client'));

//noinspection Eslint
let reestrius = new Vue({
    el: '#app',
    store,
    render: h => h(App),
    data: {
        appData
    }
});