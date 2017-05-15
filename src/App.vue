<template>
    <div id="app" class="bg-faded d-flex flex-column">
        <b-navbar toggleable type="inverse" variant="inverse" sticky="top">
            <b-nav-toggle target="nav_collapse"/>
            <a class="navbar-brand" href="#">
                {{$store.getters._r('appname', 'RU')}}
            </a>
            <b-collapse isNav id="nav_collapse">
                <b-nav isNavBar class="mr-auto">
                    <b-nav-item-dropdown text="Справочники" size="sm">
                        <b-dropdown-item @click.native="openEditor('objects')">{{$store.getters._r('objects','RU')}}</b-dropdown-item>
                        <b-dropdown-item @click.native="openEditor('properties')">{{$store.getters._r('meta', 'RU')}}</b-dropdown-item>
                        <b-dropdown-item >{{$store.getters._r('users', 'RU')}}</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-nav>
                <form class="form-inline ">
                    <my-filter></my-filter>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">{{$store.getters._r('search', 'RU')}}</button>
                </form>
            </b-collapse>
        </b-navbar>
        <form class="form-inline justify-content-end">
            <label class="mr-sm-2" for="viewSelector">{{$store.getters._r('view', 'RU')}}:</label>
            <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="viewSelector" v-model="currentView">
                <option value="viewScheme">{{$store.getters._r('scheme', 'RU')}}</option>
                <option value="viewTable">{{$store.getters._r('table', 'RU')}}</option>
            </select>
        </form>
        <transition name="fade" mode="out-in">
            <keep-alive>
                <component :is="currentView" ref="test"></component>
            </keep-alive>
        </transition>
        <editor ref="editor" :data="editorData"></editor>
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
        methods: {
            openEditor(target) {
                this.$store.commit('setEditorType', target);
                this.$set(this.editorData, 'dlgData', this.$root.appData.appSettings.editors[target]);
                this.$set(this.editorData, 'objects', this.$root.appData[target]);
                this.$nextTick(function () {
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