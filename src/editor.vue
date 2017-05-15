<template>
    <b-modal ref="modal"
             id="editor"
             size="lg"
             closeTitle=""
             saveTitle="Сохранить"
             :title="title"
             :closeOnBackdrop="false"
             :fade="fade"
             @ok="modalOK"
             @cancel="modalCancel"
             @hidden="hidden">
        <div class="row">
            <div class="col">
                <div class="row my-2">
                    <div class="col">
                        <!--Фильтр списка объектов-->
                        <b-form-input v-model="filter" placeholder="Фильтр:" id="objectsFilter"></b-form-input>
                    </div>
                    <div class="col-3">
                        <b-btn @click="addItem(type)"><i class="fa fa-plus-circle" aria-hidden="true"></i></b-btn>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <b-list-group tag="div">
                            <!--Список объектов-->
                            <b-list-group-item class="btn-sm btn"
                                               @click.native="setActive(object.id)"
                                               :ref="type"
                                               tag="button"
                                               action
                                               :active="object.selected"
                                               v-for="(object, index) in objects"
                                               :key="object.code">
                                {{object.name}}
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <b-card no-block>
                    <b-tabs card small v-model="tabIndex">
                        <b-tab :title="tab.title" v-for="(tab,index) in tabs" :key="tab.id">

                            <div class="input-group mb-3" v-if="tab.id != 'main'" id="propertiesSelector">
                                <b-form-select v-model="tab.prop"
                                               :options="$store.getters.getProps(tab.id, selectedItemId)"></b-form-select>
                                <b-btn @click="selectedItem.addProperty(tab.id, tab.prop)">
                                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                                </b-btn>
                            </div>
                            <property v-for="(prop, index) in props[tab.id]" :key="prop.code" :id="prop.code">
                                {{$store.getters._r(prop.code, 'RU') || prop.name}}
                            </property>
                            <b-form-fieldset horizontal
                                             class="col "
                                             :label="$store.getters._r(prop.code, 'RU') || prop.name"
                                             :label-size="4"
                                             :key="prop.code"
                                             :id="prop.code"
                                             v-for="(prop, index) in props[tab.id]">
                                <div class="input-group">
                                    <!--Текстовое поле-->
                                    <b-form-input v-model="prop.value"
                                                  v-if="prop.type === String.name">
                                    </b-form-input>

                                    <!--Статичное текстовое поле-->
                                    <b-form-input-static :value="prop.value"
                                                         v-else-if="prop.type === 'Link'">
                                    </b-form-input-static>

                                    <!--Выпадающий список-->
                                    <b-form-select :options="prop.options"
                                                   v-model="prop.value"
                                                   v-else-if="prop.type === Array.name">
                                    </b-form-select>

                                    <!--Кнопка удаления свойства-->
                                    <span v-if="tab.id != 'main'" class="input-group-addon">
                                        <b-btn size="sm" @click="selectedItem.delProperty(tab.id, index)">
                                            <i class="fa fa-minus-circle" aria-hidden="true"></i>
                                        </b-btn>
                                    </span>
                                </div>
                            </b-form-fieldset>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
        </div>
    </b-modal>
</template>
<script>

    import property from './property.vue'

    let DataProperty = function ({id, name = '', code = '', type = 'String', value = null, options = null}, store = null) {
        const $store = store;
        this.id = id;
        this.selected = false;
        this.value = value;
        this.properties =
            {
                main: [
                    {
                        code : "name",
                        type : "String",
                        value: name
                    },
                    {
                        code   : "type",
                        type   : "Array",
                        value  : type,
                        options: ['String', 'Array', 'Boolean']
                    },
                    {
                        code : 'code',
                        type : "String",
                        value: code
                    }
                ]
            };
        Object.defineProperty(this, 'name', {
            get() {
                return this.properties.main[0].value
            },
            set(val) {
                this.properties.main[0].value = val
            }
        });
        Object.defineProperty(this, 'type', {
            get() {
                return this.properties.main[1].value
            },
            set(val) {
                this.properties.main[1].value = val
            }
        });
        Object.defineProperty(this, 'code', {
            get() {
                return this.properties.main[2].value
            },
            set(val) {
                this.properties.main[2].value = val
            }
        });
    };

    let DataObject = function ({id, name = '', type = ''}, store = null) {
        this.$store = store;
        this.id = id;
        this.selected = false;
        this.properties = {
            main : [
                {
                    code : "name",
                    type : "String",
                    value: name
                },
                {
                    code   : "type",
                    type   : "Array",
                    value  : type,
                    options: ['ius', 'service', 'server', 'cluster']
                }
            ],
            meta : [],
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
        });
        Object.defineProperty(this, 'meta', {
            get() {
                return this.properties.meta
            },
            set(propData) {
                this.properties[propData.type].push(propData.value)
            }
        })

    };

    DataObject.prototype.addProperty = function (propData) {
        propData.value.forEach(item => this.properties[propData.type].push(new DataProperty(item)));
        return this.properties[propData.type].length
    };
    DataObject.prototype.delProperty = function (type, index) {
        this.properties[type].splice(index, 1);
    };

    let LinkObject = function ({fromId, toId, linkType}, store = null) {
        this.$store = store;
        this.fromId = fromId;
        this.toId = toId;
        this.linkType = linkType;
    };

    let Data = function (type, data = {}, store = null) {
        switch (type) {
            case 'objects':
                return new DataObject(data, store);
            case 'properties':
                return new DataProperty(data, store);
            case 'users':
                break;
            case 'links' :
                return new LinkObject(data, store);
        }
    };

    export default {
        components: {property},
        data(){
            return {
                filter        : '',
                selectedItemId: null,
                selectedItem  : null,
                tabIndex      : null,
                newProp       : [],
                currentTab    : 0,
                properties    : null
            }
        },
        props     : {
            fade      : {
                type   : Boolean,
                default: true
            },
            editSingle: {
                type   : Boolean,
                default: false
            },
            data      : {
                type   : Object,
                default: () => {
                }
            },
            value     : {
                type   : Number,
                default: 0
            }
        },
        computed  : {
            props() {
                if (this.selectedItemId) {
                    return this.selectedItem.properties
                }
                return [];
            },
            type() {
                return this.$store.state.activeEditor
            },
            tabs() {
                return this.data.hasOwnProperty('dlgData') && this.data.dlgData.tabs.length ? this.data.dlgData.tabs.map(tab => {
                    return {id: tab, title: this.$store.getters._r(tab, 'RU'), prop: this.newProp[tab]}
                }, this) : null;
            },
            title() {
                return this.$store.state.lang.RU[this.type]
            },
            objects() {
                return this.$store.getters.editorItems
            }
        },
        methods   : {
            addItem(type) {
                let newobj = Data(type, {id: this.objects.length + 1}, this.$store);
                this.$store.dispatch('addItem', newobj);
                this.$nextTick(function () {
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
                this.$store.getters.editorItems.forEach(el => this.$store.commit('toggleItem', {
                    id    : el.id,
                    active: false
                }))
            }
        },
        watch     : {
            filter(value) {
                console.info(value)
            }
        }
    }
</script>

<style scoped>
</style>