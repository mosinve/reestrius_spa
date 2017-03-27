<template>
    <b-modal :ref="id"
             :id="id"
             :title="title"
             size="lg"
             closeTitle="Отмена"
             saveTitle="Сохранить"
             :closeOnBackdrop="true"
             :fade="fade"
             @ok="modalOK"
             @cancel="modalCancel"
    >
        <div class="row">
            <div class="col">
                <div class="row my-2">
                    <div class="col">
                        <b-form-input v-model="filter" typeplaceholder="Фильтр:">
                        </b-form-input>
                    </div>
                    <div class="col-3">
                        <b-btn @click="addItem(type)"><i class="fa fa-plus" aria-hidden="true"></i></b-btn>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <b-list-group tag="div">
                            <b-list-group-item @click="select" :ref="type" tag="button"
                                               v-for="object in data" :key="object.id">
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
    export default {
        data(){
            return {
                filter: '',
                tabs: this.$root.appData.appSettings.editorTabs,
                selectedItem: null
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
            },
            type: {
                type: String,
                default: null
            },
            data: {
                type: Array,
                default: () => []
            },
            value: {
                type: Number,
                default: 0
            }
        },
        methods: {
            addItem(type) {
                let newobj = this.$root.Data(type);
                newobj.id = this.data.length+1;
                this.data.push(newobj);
                this.$nextTick( function () {
                    this.setActive(newobj.id-1)
                    }
                );
            },
            setActive(index) {
                const activeItem = this.getActive();
                if (activeItem !== -1) {
                    this.$refs[this.type][activeItem].active = false
                }
                this.$refs[this.type][index].active = true;
                this.selectedItem = index
            },
            getActive(){
                let active = -1;
                this.$refs[this.type].forEach((item, index) => {
                    if (item.active) {
                        active = index;
                    }
                });
                return active;
            },
            modalOK(){
                console.log('modalOk');
            },
            modalCancel(){
                console.log(this)
            }
        },
        watch: {
            filter(value) {
                console.info(value)
            },
        },
        computed:{
            propkeys(){
                return this.selectedItem ? Object.keys(this.data[this.selectedItem]): []
            }
        }
    }
</script>

<style scoped>
</style>