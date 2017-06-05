/* eslint-disable no-undef,no-prototype-builtins,arrow-body-style */
import 'font-awesome/scss/font-awesome.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vis/dist/vis.min.css'
import appData from './api/datamodel'
import App from './App.vue'
import {ClientTable} from 'vue-tables-2'
import * as types from './mutation-types'
import * as _lang from './lang'
import router from './routes'
// import Vuex from 'vuex'

Vue.use(ClientTable, {}, true, require('./template.js')('client'))
Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(Vuex)

window.NODE_POSITIONS_KEY = 'reestrius_app'

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

const objectsData = {
    state: {
        all: []
    },
    getters: {
        links: state => id => state.all.filter(el => el.id !== id).map(el => ({text: el.name, value: el.id})),
        objectById: state => id => state.all.find(el => el.id === id),
        nodes: state => state.all.map(el => ({id: el.id, label: el.name, group: el.type}))
    },
    mutations: {
        [types.objects.ADD_ITEM] (state, item) {
            state.all.push(item)
        },
        [types.objects.EDIT_ITEM] (state, {itemId, newData}){
            let item = state.all.find(el => el.id === itemId)
            newData.keys.forEach(function (key) {
                item[key] = newData[key]
            })
            state.all[itemId] = item
        }
    },
    actions: {}
}

const propertiesData = {
    state: {
        all: []
    },
    getters: {
// eslint-disable-next-line no-unused-vars
        meta: state => id => state.all.map(el => ({text: el.name, value: el.id})),
        propertyById: state => id => state.all.filter(el => el.id === id),
        propertyByCode: state => code => state.all.filter(el => el.code === code)
    },
    mutations: {
        [types.properties.ADD_ITEM] (state, item) {
            state.all.push(item)
        },
        [types.properties.EDIT_ITEM] (state, {itemId, newData}){
            let item = state.all.find(el => el.id === itemId)
            newData.keys.forEach(function (key) {
                item[key] = newData[key]
            })
            state.all[itemId] = item
        }
    }
}

const store = new Vuex.Store({
    // strict: process.env.NODE_ENV !== "production",
    state: {
        activeEditor: '',
        visPositions: null,
        lang: _lang
    },
    modules: {
        objects: objectsData,
        properties: propertiesData
    },
    mutations: {
        setEditorType(state, id){
            state.activeEditor = id
        },
        toggleItem(state, {id, active}){
            Vue.set(state[state.activeEditor].all.find(el => el.id === id), 'selected', active)
        }
    },
    getters: {
        getProps: (state, getters) => (tab, id) => {
            return getters[tab](id)
        },
        currentModule: state => state[state.activeEditor],
        editorItems: (state, getters) => {return state.activeEditor ? getters.currentModule.all : []},
        itemById: (state, getters) => id => getters.editorItems.find(el => el.id === id),
        activeItem: (state, getters) => {
            let items = getters.editorItems
            if (items.length === 0) {
                return null
            }
            let item = items.find(el => el.selected)
            return Object.hasOwnProperty.call(item, 'id') ? item.id : null
        },
        trans: state => (text, lang) => (state.lang[lang][text] ? state.lang[lang][text] : text)
    },
    actions: {
        addItem ({commit, state}, item) {
            commit(types[state.activeEditor].ADD_ITEM, item)
        }
    }
})

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