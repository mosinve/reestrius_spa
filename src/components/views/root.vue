<template>
    <div class="d-flex flex-column">
        <form class="form-inline justify-content-end">
            <label class="mr-sm-2" for="viewSelector">{{$store.getters.trans('view', 'RU')}}:</label>
            <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="viewSelector" v-model="currentView">
                <option value="viewScheme">{{$store.getters.trans('scheme', 'RU')}}</option>
                <option value="viewTable">{{$store.getters.trans('table', 'RU')}}</option>
            </select>
        </form>
        <transition name="fade" mode="out-in">
            <keep-alive>
                <component :is="currentView" ref="view"></component>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import viewScheme from './scheme.vue';
    import viewTable from './table.vue';

    export default {
        name: 'View',
        components: {
            viewScheme,
            viewTable
        },
        data() {
            return {
                currentView: 'viewScheme',
            }
        }
    }
</script>

<style scoped>
    .d-flex {
        flex: 1;
        min-height: 100%;
    }
</style>