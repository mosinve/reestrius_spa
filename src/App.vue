<template>
  <div id="app" class="bg-faded d-flex flex-column">
    <b-navbar toggleable type="inverse" variant="inverse" fixed="top">

      <b-nav-toggle target="nav_collapse"/>

      <a class="navbar-brand" href="/">
        РеестрИУС
      </a>
      <b-collapse isNav id="nav_collapse">
        <b-nav isNavBar class="mr-auto">
          <b-nav-item class="active">Главная</b-nav-item>
          <b-nav-item-dropdown text="" size="sm" class="active">
            Справочники
            <a slot="dropdown-menu" class="dropdown-item" @click="openObjects">Объекты</a>
            <a slot="dropdown-menu" class="dropdown-item" href="#">Свойства</a>
            <a slot="dropdown-menu" class="dropdown-item" href="#">Пользователи</a>

          </b-nav-item-dropdown>
        </b-nav>
        <form class="form-inline">
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
    <b-modal ref="modal" id="modaldlg" title="Окно" size="lg" closeTitle="Отмена" saveTitle="Сохранить" closeOnBackdrop="false">Test</b-modal>
  </div>


</template>

<script>
    import viewScheme from './viewScheme.vue';
    import viewTable from './viewTable.vue';
//    import bCollapse from 'bootstrap-vue/components/collapse.vue';
//    import bModal from 'bootstrap-vue/components/modal.vue'
//    import bNavItem from 'bootstrap-vue/components/nav-item.vue';
//    import bNavItemDropdown from 'bootstrap-vue/components/nav-item-dropdown.vue';
//    import bNavToggle from 'bootstrap-vue/components/nav-toggle.vue';
//    import bNavbar from 'bootstrap-vue/components/navbar.vue';
//    import bNav from 'bootstrap-vue/components/nav.vue';
//    import bButton from 'bootstrap-vue/components/button.vue';

    //import BootstrapVue from 'bootstrap-vue';
    const filter = {
        template:
            `<input ref="filter" class="form-control mr-sm-2" type="text" placeholder="Поиск" autofocus="true" id="filter" v-bind:value="value" v-on:input="sendQuery($event.target.value)">`,
        props: ['value'],
        methods: {
            sendQuery (value){
                Event.$emit('query', value)
            }
        }
    };

    export default {
        name: 'App',
        components:{
            viewScheme, viewTable, 'my-filter' : filter, /*bModal, bNavItem, bNavItemDropdown, bNavToggle, bNavbar, bCollapse, bNav, 'b-btn': bButton*/
        },
        data () {
            return {
                currentView: 'viewScheme',
            }
        },
        methods: {
            openObjects() {
                this.$root.$emit('show::modal', 'modaldlg');
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