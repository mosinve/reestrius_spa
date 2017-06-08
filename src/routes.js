/**
 * Created by MosinVE on 05.06.2017.
 */
import propEditor from './components/views/properties.vue'
import View from './components/views/root.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const routes = [
    { path: '/', component: View },
    { path: '/properties', component: propEditor },
    // { path: '/objects', component: objectsEditor },
    // { path: '/users', component: usersEditor }
]

export default new VueRouter({
    routes
})