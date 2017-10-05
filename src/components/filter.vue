<template>
    <input ref="filter" class="form-control mr-sm-2" type="text" placeholder="Поиск" autofocus="true" id="filter" @input="sendQuery($event.target.value)" v-model="value">
</template>

<script>

    export default {
        name: 'filter',
        data () {
            return {
                value: ''
            }
        },
        methods: {
            sendQuery (value) {
                this.$root.$emit('query', value)
            }
        }
    }
</script>
