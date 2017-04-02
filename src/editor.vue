<template>
    <b-modal id="editor"
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
                            <b-list-group-item @click="setActive(index)" :ref="type" tag="button" action
                                               v-for="(object, index) in objects" :key="object.id">
                                {{object.name}}
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <b-card no-block>
                    <b-tabs card small>
                    <b-tab :title="tab" v-for="(tab,index) in tabs" :key="index">
                        {{tab}}
                        <b-form-fieldset horizontal :label="prop.name" class="col" :label-size="2" v-for="prop in props[index]"
                                         :key="prop.id">
                            <b-form-input v-model="prop.value"></b-form-input>
                        </b-form-fieldset>
                    </b-tab>
                </b-tabs>
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
    export default {
        data(){
            return {
                filter: '',
                selectedItem: null,
                objects: []
            }
        },
        props: {
            fade: {
                type: Boolean,
                default: true
            },
            editSingle: {
                type: Boolean,
                default: false
            },
            data: {
                type: Object,
                default: () => {}
            },
            value: {
                type: Number,
                default: 0
            }
        },
        methods: {
            addItem(type) {
                let newobj = this.$root.Data(type);
                newobj.id = this.objects.length+1;
                this.objects.push(newobj);
                this.$nextTick( function () {
                    this.setActive(newobj.id-1)
                    }
                );
            },
            setActive(index) {
                const activeItem = this.getActive();
                if (activeItem !== -1) {
                    this.$set(this.$refs[this.type][activeItem],'active',false);
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
        computed: {
            props() {
//                return this.selectedItem ? Object.keys(this.data[this.selectedItem]) : []
                return this.selectedItem ? this.objects[this.selectedItem]:[];
            },
            type() {
                return this.data.hasOwnProperty('type') ? this.data.type: null;
            },
            tabs() {
                return this.data.hasOwnProperty('dlgData') && this.data.dlgData.tabs.length? this.data.dlgData.tabs.map(tab => this.$root.appData.appSettings.editorTabs[tab]): null;
            },
            title() {
                return this.data.hasOwnProperty('dlgData') ? this.data.dlgData.title: 'test';
            }
        }
    }
</script>

<style scoped>
</style>
