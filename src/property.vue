<template>
    <label>
        <slot></slot>
        <input class="form-control" ref="input" :is="component" :value="value" @input="update($event.target.value)" >
    </label>
</template>

<script>
export default {
    props: ['value'],
    methods: {
        update (value){
            this.$emit('input', value)
        }
    },
    data (){
        return {
            component: 'input'
        }
    }
}
</script>

<style scoped>
</style>