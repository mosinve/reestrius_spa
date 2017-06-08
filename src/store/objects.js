/**
 * Created by MosinVE on 08.06.2017.
 */
import {objects} from './mutation-types'

export const objectsData = {
    state: {
        all: []
    },
    getters: {
        links: state => id => state.all.filter(el => el.id !== id).map(el => ({text: el.name, value: el.id})),
        objectById: state => id => state.all.find(el => el.id === id),
        nodes: state => state.all.map(el => ({id: el.id, label: el.name, group: el.type}))
    },
    mutations: {
        [objects.ADD_ITEM] (state, item) {
            state.all.push(item)
        },
        [objects.EDIT_ITEM] (state, {itemId, newData}){
            let item = state.all.find(el => el.id === itemId)
            newData.keys.forEach(function (key) {
                item[key] = newData[key]
            })
            state.all[itemId] = item
        }
    },
    actions: {}
}