/* eslint-disable arrow-body-style,no-undef */
import * as types from './mutation-types'
import {objectsData} from './objects'
import propertiesData from './properties'
import * as _lang from './../lang'
Vue.use(Vuex)

export const store = new Vuex.Store({
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
