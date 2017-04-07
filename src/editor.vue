<template>
    <b-modal ref="modal"
             id="editor"
             :title="title"
             size="lg"
             closeTitle=""
             saveTitle="Сохранить"
             :closeOnBackdrop="false"
             :fade="fade"
             @ok="modalOK"
             @cancel="modalCancel"
             @hidden="hidden"
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
                            <b-list-group-item @click.native="setActive(object.id)" :ref="type" tag="button" action :active="object.selected"
                                               v-for="(object, index) in objects" :key="object.id">
                                {{object.name}}
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <b-card no-block>
                    <b-tabs card small noFade v-model="tabIndex">
                        <b-tab :title="tab" v-for="(tab,index) in tabs" :key="index">
                        <b-form-fieldset horizontal :label="prop.name" class="col" :label-size="2" v-for="(prop, index) in props[index]"
                                         :key="prop.id">
                            <b-form-input v-model="prop.value"></b-form-input>
                        </b-form-fieldset>
                        </b-tab>
                    </b-tabs>
                </b-card>
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
                tabIndex:null
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
        computed: {
            props() {
                return this.selectedItem !== null ? this.$store.getters.itemById(this.selectedItem).getProperties() : [];
            },
            type() {
                return this.$store.state.activeEditor
            },
            tabs() {
                return this.data.hasOwnProperty('dlgData') && this.data.dlgData.tabs.length? this.data.dlgData.tabs.map(tab => this.$root.appData.appSettings.editorTabs[tab]): null;
            },
            title() {
                return this.$store.state.lang.RU[this.type]
            },
            objects() {
                    return this.$store.getters.editorItems
                }
        },
        methods: {
            addItem(type) {
                let newobj = this.$root.Data(type, {id: this.objects.length+1});
                this.$store.dispatch('addItem', newobj);
                this.$nextTick( function () {
                        this.setActive(newobj.id)
                    }
                );
            },
            setActive(id) {
                const activeItem = this.getActive();
                if (activeItem !== -1) {
                    this.$store.commit('toggleItem', {id: activeItem, active: false})
                }
//                this.$set(this.$refs[this.type][index], 'active', true);
                this.$store.commit('toggleItem', {id: id, active: true})
//                this.$refs[this.type][index].active = true;
                this.selectedItem = id
            },

            getActive(){
                let active = -1;
                this.$refs[this.type].forEach((item, index) => {
                    if (item.active) {
                        active = this.$store.getters.editorItems[index].id;
                    }
                });
                return active;
            },
            modalOK(){
                console.log('modalOk');
            },
            modalCancel(){
                console.log(this)
            },
            hidden(){
                this.selectedItem = null;
                this.tabIndex = 0;
                console.log('im closed')
            }
        },
        watch: {
            filter(value) {
                console.info(value)
            }
        }
    }
</script>

<style scoped>
</style>
