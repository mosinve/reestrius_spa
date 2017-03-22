<template>
    <div id="app" class="bg-faded d-flex flex-column">
        <b-navbar toggleable type="inverse" variant="inverse" stickyn="top">
            <b-nav-toggle target="nav_collapse"/>
            <a class="navbar-brand" href="/">
                РеестрИУС
            </a>
            <b-collapse isNav id="nav_collapse">
                <b-nav isNavBar class="mr-auto">
                    <b-nav-item class="active" href="/">Главная</b-nav-item>
                    <b-nav-item-dropdown text="Справочники" size="sm">
                        <a class="dropdown-item" href
                           @click.stop.prevent="openModal('dlgObjects')">Объекты</a>
                        <a class="dropdown-item" href @click.stop.prevent="openModal('dlgProps')">Свойства</a>
                        <a class="dropdown-item" href
                           @click.stop.prevent="openModal('dlgObjects')">Пользователи</a>
                    </b-nav-item-dropdown>
                </b-nav>
                <form class="form-inline ">
                    <my-filter></my-filter>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Поиск</button>
                </form>
            </b-collapse>
        </b-navbar>
        <form class="form-inline justify-content-end">
            <label class="mr-sm-2" for="viewSelector">Вид:</label>
            <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="viewSelector" v-model="currentView">
                <option value="viewScheme">Схема</option>
                <option value="viewTable">Таблица</option>
            </select>
        </form>
        <transition name="fade" mode="out-in">
            <keep-alive>
                <component v-bind:is="currentView" ref="test"></component>
            </keep-alive>
        </transition>
        <editor id="dlgObjects" title="Объекты" />
        <editor id="dlgProps" title="Свойства" />
    </div>


</template>

<script>
    import viewScheme from './viewScheme.vue';
    import viewTable from './viewTable.vue';
    import editor from './editor.vue';
//    import bCollapse from 'bootstrap-vue/lib/components/collapse.vue';
//    import bModal from 'bootstrap-vue/lib/components/modal.vue'
//    import bNavItem from 'bootstrap-vue/lib/components/nav-item.vue';
//    import bNavItemDropdown from 'bootstrap-vue/lib/components/nav-item-dropdown.vue';
//    import bNavToggle from 'bootstrap-vue/lib/components/nav-toggle.vue';
//    import bNavbar from 'bootstrap-vue/lib/components/navbar.vue';
//    import bNav from 'bootstrap-vue/lib/components/nav.vue';
//    import bButton from 'bootstrap-vue/lib/components/button.vue';

    //import BootstrapVue from 'bootstrap-vue';
    const filter = {
        template: `<input ref="filter" class="form-control mr-sm-2" type="text" placeholder="Поиск" autofocus="true" id="filter" @input="sendQuery($event.target.value)" v-model="value">`,
        data(){
            return {
                value: ''
            }
        },
        methods: {
            sendQuery: function (value) {
                this.$root.$emit('query', value)
            }
        }
    };

    export default {
        name: 'App',
        components:{
            viewScheme,
            viewTable,
            'my-filter': filter,
//            bModal,
//            bNavItem,
//            bNavItemDropdown,
//            bNavToggle,
//            bNavbar,
//            bCollapse,
//            bNav,
//            'b-btn': bButton,
            editor
        },
        data () {
            return {
                currentView: 'viewScheme',
            }
        },
        methods: {
            openModal(target) {
                this.$root.$emit('shown::dropdown', target);
                this.$root.$emit('show::modal', target);
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>