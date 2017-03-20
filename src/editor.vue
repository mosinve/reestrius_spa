<template>
    <b-modal :ref="id"
             :id="id"
             :title="title"
             size="lg"
             closeTitle="Отмена"
             saveTitle="Сохранить"
             :closeOnBackdrop="false"
             :fade="fade"
    >
        <div class="row">
            <div class="col">
                <div class="row my-2">
                    <div class="col">
                        <b-form-input v-model="findobj" placeholder="Фильтр:"
                                      @input="filterobj($event.target.value)">
                        </b-form-input>
                    </div>
                    <div class="col-3">
                        <b-btn @click=""><i class="fa fa-plus" aria-hidden="true"></i></b-btn>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <b-list-group tag="div">
                            <b-list-group-item tag="a" href="#" class="list-group-item-action" active
                                               v-for="object in objects" :key="object.id">
                                {{object.name}}
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <b-tabs>
                    <b-tab :id="tab.id" title="tab.text" v-for="tab in tabs" :key="tab.id">
                    </b-tab>
                </b-tabs>

                <div id="main">

                </div>
                <div id="props">

                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
    import bModal from 'bootstrap-vue/lib/components/modal.vue'
    import bListGroup from 'bootstrap-vue/lib/components/list-group.vue'
    import bListGroupItem from 'bootstrap-vue/lib/components/list-group-item.vue'
    import bButton from 'bootstrap-vue/lib/components/button.vue'
    import bNavItem from 'bootstrap-vue/lib/components/nav-item.vue'
    import bNav from 'bootstrap-vue/lib/components/nav.vue'
    import bCard from 'bootstrap-vue/lib/components/card.vue'
    import bFormInput from 'bootstrap-vue/lib/components/form-input.vue'
    import bTab from 'bootstrap-vue/lib/components/tab.vue'
    import bTabs from 'bootstrap-vue/lib/components/tabs.vue'

    export default {
        components: {
            bModal,
            bListGroup,
            bListGroupItem,
            'b-btn': bButton,
            bNavItem,
            bNav,
            bCard,
            bFormInput,
            bTab,
            bTabs
        },
        data(){
            return {
                findobj: '',
                tabs: tabs
            }
        },
        props: {
            id: {
                type: String,
                default: null
            },
            title: {
                type: String,
                default: ''
            },
            fade: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            filterobj (value){
                console.log(value)
            }
        }
    }
</script>

<style scoped>
</style>