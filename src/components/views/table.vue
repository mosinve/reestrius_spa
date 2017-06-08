<template>
    <div id="people">
        <v-client-table :data="tableData" :columns="columns" :options="options" ref="table"
                        name="dataTable"></v-client-table>
    </div>
</template>

<script>
    /* eslint-disable capitalized-comments,no-warning-comments */

    //    TODO 1. Добавить русскую локализацию в таблицу
    //    TODO 2. Загрузка данных с backend вместо статичных массивов

    export default {
        name: 'viewTable',
        data() {
            return {
                columns: this.$root.appData.appSettings.tablecolumns,
                tableData: this.$root.appData.tableData,
                options: {
                    group: true,
                    sortable: '',
                    orderBy: {column: this.$root.appData.appSettings.groupby, ascending: true},
                    perPage: 10,
                    perPageValues: [10, 20, 50],
                }
            }
        },
        mounted() {
            this.$root.$on('query', function (query) {
//                console.log(query);
                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                this.$refs.table.setFilter(query);
            }.bind(this))
        }
    };
</script>

<style lang="css" scoped>
</style>