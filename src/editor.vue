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
                            <b-list-group-item tag="a" href="#" class="list-group-item-action" active>
                                ИУС 1
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <b-tabs>

                    <b-tab></b-tab>
                </b-tabs>
                <b-card>
                    <div class="card-header">
                        <b-nav :tabs="true" type="a" class="card-header-tabs">
                            <b-nav-item :active="true" href="#main">Главная</b-nav-item>
                            <b-nav-item href="#props">Свойства</b-nav-item>
                        </b-nav>
                    </div>
                    <div class="card-block">
                        <h4 class="card-title">Special title treatment</h4>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>

                </b-card>

                <div id="main">

                </div>
                <div id="props">

                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
    import bModal from 'bootstrap-vue/components/modal.vue'
    import bListGroup from 'bootstrap-vue/components/list-group.vue'
    import bListGroupItem from 'bootstrap-vue/components/list-group-item.vue'
    import bButton from 'bootstrap-vue/components/button.vue'
    import bNavItem from 'bootstrap-vue/components/nav-item.vue'
    import bNav from 'bootstrap-vue/components/nav.vue'
    import bCard from 'bootstrap-vue/components/card.vue'
    import bFormInput from 'bootstrap-vue/components/form-input.vue'
    import bTab from 'bootstrap-vue/components/tab.vue'
    import bTabs from 'bootstrap-vue/components/tabs.vue'

    export default {
        components: {bModal, bListGroup, bListGroupItem, 'b-btn': bButton, bNavItem, bNav, bCard, bFormInput},
        data(){
            return {
                findobj: ''
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