/* eslint-disable arrow-body-style */
/**
 * Created by MosinVE on 08.06.2017.
 */
import {properties} from './mutation-types'
import api from '../api'

const getters =  {
// eslint-disable-next-line no-unused-vars
        meta: state => id => state.items.map(el => ({text: el.name, value: el.id})),
        propertyById: state => id => state.items.filter(el => el.id === id),
        propertyByCode: state => code => state.items.filter(el => el.code === code)
    }

const mutations = {
    [properties.ADD_ITEM] (state, item) {
        state.items.push(item)
    },
    [properties.EDIT_ITEM] (state, {itemId, newData}){
        let item = state.items.find(el => el.id === itemId)
        newData.keys.forEach(function (key) {
            item[key] = newData[key]
        })
        state.items[itemId] = item
    },
    [properties.GET_ITEMS](state, data) {
        state.items = data.items
        state.headers = data.headers
    }
}
const actions = {
    getProperties ({commit}) {
        api.getPropertiesTable().then(response => {
            commit(properties.GET_ITEMS, {response})
        }, response => {
            return response
        })
    }
}

const state = {
    items: [],
    headers:[]
};

export default {
    state,
    getters,
    mutations,
    actions
}