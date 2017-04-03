<template>
    <div id="app" class="bg-faded d-flex flex-column">
        <b-navbar toggleable type="inverse" variant="inverse" sticky="top">
            <b-nav-toggle target="nav_collapse"/>
            <a class="navbar-brand" href="/">
                РеестрИУС
            </a>
            <b-collapse isNav id="nav_collapse">
                <b-nav isNavBar class="mr-auto">
                    <b-nav-item class="active" href="/">Главная</b-nav-item>
                    <b-nav-item-dropdown text="Справочники" size="sm">
                        <b-dropdown-item href="#" @click.stop.prevent="openEditor('objects')">Объекты</b-dropdown-item>
                        <b-dropdown-item href="#" v-b-modal.editor @click="openEditor('properties')">Свойства</b-dropdown-item>
                        <b-dropdown-item href="#">Пользователи</b-dropdown-item>
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
        <editor ref="editor" :data="editorData" :title="editorData.title"></editor>

    </div>


</template>

<script>
    import viewScheme from './viewScheme.vue';
    import viewTable from './viewTable.vue';
    import editor from './editor.vue'

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
            editor,
        },
        data () {
            return {
                currentView: 'viewScheme',
                editorData: {}
            }
        },
//        computed: {
//            dlgData(){
//                return this.$root.appData[this.type]
//            }
//        },
        methods: {
            openEditor(target) {
                this.$set(this.editorData, 'dlgData', this.$root.appData.appSettings.editors[target]);
                this.$set(this.editorData, 'type', target);
                this.$set(this.editorData, 'objects', this.$root.appData[target]);
//                this.$forceUpdate();
                this.$nextTick(function () {
                    this.$root.$emit('initTabs');
                    this.$root.$emit('show::modal', 'editor');
                })
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