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
                        <b-form-input v-model="filter" typeplaceholder="Фильтр:">
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
                    <b-tab :id="tab.id" :title="tab.text" v-for="tab in tabs" :key="tab.id" v-if="tab.dialogs.includes(id)">
                        <b-form-fieldset horizontal :label="key" class="col" :label-size="2" v-for="key in propkeys"
                                         :key="key">
                            <b-form-input v-model="props[key]"></b-form-input>
                        </b-form-fieldset>
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
//    import bModal from 'bootstrap-vue/lib/components/modal.vue'
//    import bListGroup from 'bootstrap-vue/lib/components/list-group.vue'
//    import bListGroupItem from 'bootstrap-vue/lib/components/list-group-item.vue'
//    import bButton from 'bootstrap-vue/lib/components/button.vue'
//    import bNavItem from 'bootstrap-vue/lib/components/nav-item.vue'
//    import bNav from 'bootstrap-vue/lib/components/nav.vue'
//    import bCard from 'bootstrap-vue/lib/components/card.vue'
//    import bFormInput from 'bootstrap-vue/lib/components/form-input.vue'
//    import bTab from 'bootstrap-vue/lib/components/tab.vue'
//    import bTabs from 'bootstrap-vue/lib/components/tabs.vue'
//    import bFormFieldset from 'bootstrap-vue/lib/components/form-fieldset.vue'

    export default {
//        components: {
//            bModal,
//            bListGroup,
//            bListGroupItem,
//            'b-btn': bButton,
//            bNavItem,
//            bNav,
//            bCard,
//            bFormInput,
//            bTab,
//            bTabs,
//            bFormFieldset
//        },
        data(){
            return {
                filter: '',
                tabs: this.$root.appData.appSettings.tabs,
                props: this.$root.appData.appSettings.properties
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
            },
            editSingle: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            addItem: function () {

            }
        },
        watch: {
            filter: function (value) {
                console.info(value)
            }
        },
        computed: {
            propkeys: function () {
                return Object.keys(this.$root.appData.appSettings.properties[0])
            }
        }
    }
</script>

<style scoped>
</style>