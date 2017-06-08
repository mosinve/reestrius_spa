<template>
    <div class="container-fluid">
        <b-table striped hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage"
                 :filter="filter">
            <template slot="name" scope="item">
                {{item.value.first}} {{item.value.last}}
            </template>
            <template slot="isActive" scope="item">
                {{item.value ? 'Yes :)' : 'No :('}}
            </template>
            <template slot="actions" scope="item">
                <b-btn size="sm" @click="details(item.item)">Details</b-btn>
            </template>
        </b-table>
    </div>
</template>

<script>
    /* eslint-disable no-console,arrow-body-style */
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'properties',
        data(){
            return {
//                items: null,
//                fields: null,
                currentPage: 0,
                perPage: 10,
                filter: '',
                error: ''
            }
        },
        methods: {
            ...mapActions([
                'getProperties'
            ])
        },
        created (){
            if (this.items.length < 1) {
                this.getProperties()
            }
        },
        computed: {
            ...mapState({
                items: ({propertiesData}) => propertiesData.items,
                headers: ({propertiesData}) => propertiesData.headers
            })
        }
    }
</script>

<style scoped>
</style>