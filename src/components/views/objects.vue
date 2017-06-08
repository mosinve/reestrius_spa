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
                            <b-list-group-item @click="select" :ref="type" tag="button" action
                                               v-for="object in data" :key="object.id">
                                {{object.name}}
                            </b-list-group-item>
                        </b-list-group>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <b-card no-block>
                <b-tabs card small>
                    <b-tab :id="tab.id" :title="tab.text" v-for="tab in tabs" :key="tab.id" v-if="tab.dialogs.includes(id)">
                        {{tab.text}}
                        <b-form-fieldset horizontal :label="key" class="col" :label-size="2" v-for="key in propkeys"
                                         :key="key">
                            <b-form-input v-model="props[key]"></b-form-input>
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
    import editor from '../editor.vue';
    export default {
        extends: editor
    }
</script>

<style scoped>
</style>