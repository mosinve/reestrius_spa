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
                        <b-btn @click="addItem(type)"><i class="fa fa-plus-circle" aria-hidden="true"></i></b-btn>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <b-list-group tag="div">
                            <b-list-group-item class="btn-sm btn" @click.native="setActive(object.id)" :ref="type" tag="button" action :active="object.selected"
                                               v-for="(object, index) in objects" :key="object.code">
                                {{object.name}}
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <b-card no-block>
                    <b-tabs card small noFade v-model="tabIndex">

                        <b-tab :title="tab.title" v-for="(tab,index) in tabs" :key="tab.id">
                            <b-form-fieldset horizontal :label="$store.getters._r(prop.code)"
                                         class="col "
                                         :label-size="4"
                                         v-for="prop in props[tab.id]"
                                         :key="prop.code">

                            <b-form-input v-model="prop.value" v-if="prop.type === String.name"></b-form-input>

                            <b-form-select v-model="prop.value"
                                           :options="prop.options"
                                           v-if="prop.type === Array.name"
                            ></b-form-select>

                            <b-btn v-if="tab.id != 'main'">
                                <i class="fa fa-minus-circle" aria-hidden="true"></i>
                            </b-btn>
                        </b-form-fieldset>

                            <div class="input-group mb-3">
                                <b-form-select v-model="newProp[tab.id]"
                                               :options="$store.getters.getProps(tab.id, selectedItemId)"
                                               v-if="tab.id != 'main'"
                                ></b-form-select>
                                <b-btn v-if="tab.id != 'main'"
                                       @click="selectedItem.addProperty({type:tab.id, value:{objid:selectedItemId, propId:newProp[tab.id]}})">
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                </b-btn>
                            </div>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
        </div>
    </b-modal>
</template>

<script>

    let DataProperty = function ({id,name='',code='',type='String'}) {
        this.id = id;
        this.properties =
            {
                main: [
                    {
                        code: "name",
                        type: "String",
                        value: name
                    },
                    {
                        code: "type",
                        type: "Array",
                        value: type,
                        options: ['String','Array', 'Boolean']
                    },
                    {
                        code: 'code',
                        type: "String",
                        value: code
                    },
                ],
                meta: []
            };
        Object.defineProperty(this, 'name', {
            get() {
                return this.properties.main[0].value
            }
        });
        Object.defineProperty(this, 'type', {
            get() {
                return this.properties.main[1].value
            }
        });
        Object.defineProperty(this, 'code', {
            get() {
                return this.properties.main[2].value
            }
        });
    };

    let DataObject = function ({id, name='',type=''}) {
        this.id = id;
        this.properties = {
            main: [
                {
                    code: "name",
                    type: "String",
                    value: name
                },
                {
                    code: "type",
                    type: "Array",
                    value: type,
                    options: ['ius','service', 'server', 'cluster']
                }
            ],
            meta: [],
            links: []
        };
        Object.defineProperty(this, 'name', {
            get() {
                return this.properties.main[0].value
            }
        });
        Object.defineProperty(this, 'type', {
            get() {
                return this.properties.main[1].value
            }
        })

    };

    DataObject.prototype.addProperty = function(propData) {
        this.properties[propData.type].push(propData.value)
    };

    let Data = function(type, data = {}) {
        switch (type) {
            case 'objects':
                return new DataObject(data);
            case 'properties':
                return new DataProperty(data);
            case 'users':
                break;
        }
    };

    export default {
        data(){
            return {
                filter: '',
                selectedItemId: null,
                selectedItem: null,
                tabIndex:null,
                newProp: [],
                currentTab: 0,
                properties: null
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
                if (this.selectedItemId)
                {
                    return this.selectedItem.properties
                }
                return [];
            },
            type() {
                return this.$store.state.activeEditor
            },
            tabs() {
                return this.data.hasOwnProperty('dlgData') && this.data.dlgData.tabs.length? this.data.dlgData.tabs.map(tab => {return {id: tab, title: this.$store.getters._r(tab)}}, this) : null;
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
                let newobj = Data(type, {id: this.objects.length+1});
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
                this.selectedItemId = id;
                this.selectedItem = this.$store.getters.itemById(this.selectedItemId)
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
                this.selectedItemId = null;
                this.tabIndex = 0;
                console.log('im closed');
                this.$store.getters.editorItems.forEach(el => this.$store.commit('toggleItem', {id: el.id, active: false}))
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
