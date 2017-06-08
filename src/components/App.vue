<template>
    <div id="app" class="bg-faded d-flex flex-column">
        <b-navbar toggleable type="inverse" variant="inverse" sticky="top">
            <b-nav-toggle target="nav_collapse"/>
            <a class="navbar-brand" href="#">
                {{$store.getters.trans('appname', 'RU')}}
            </a>
            <b-collapse isNav id="nav_collapse">
                <b-nav isNavBar class="mr-auto">
                    <b-nav-item-dropdown text="Справочники" size="sm">
                        <b-dropdown-item @click.native="openEditor('objects')">{{$store.getters.trans('objects','RU')}}</b-dropdown-item>
                        <b-dropdown-item to="/properties">{{$store.getters.trans('meta', 'RU')}}</b-dropdown-item>
                        <b-dropdown-item >{{$store.getters.trans('users', 'RU')}}</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-nav>
                <form class="form-inline ">
                    <my-filter></my-filter>
                </form>
            </b-collapse>
        </b-navbar>
        <keep-alive>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </keep-alive>
        <editor ref="editor" :data="editorData"></editor>
    </div>
</template>
<script>
    import viewScheme from './views/scheme.vue';
    import viewTable from './views/table.vue';
    import editor from './editor.vue'

    const filter = {
        template: `<input ref="filter" class="form-control mr-sm-2" type="text" placeholder="Поиск" autofocus="true" id="filter" @input="sendQuery($event.target.value)" v-model="value">`,
        data(){
            return {
                value: ''
            }
        },
        methods: {
            sendQuery(value) {
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

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }


</style>