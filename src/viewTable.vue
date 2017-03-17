<template>
<div id="people">
  <v-client-table :data="tableData" :columns="columns" :options="options" ref="table"></v-client-table>
</div>
</template>

<script>
//    TODO 1. Добавить русскую локализацию в таблицу
//    TODO 2. Загрузка данных с backend вместо статичных массивов
const tableData = 	[
						{id:'1', ius:'MODES-Terminal', service:'Host', server: 'modes-sql-odusb',admin: 'Мосин', ip: 'xxx'},
				      	{id:'2', ius:'MODES-Terminal', service:'MPPM', server: 'modes-sql-odusb',admin: 'Мосин', ip: 'xxx'},
				      	{id:'3', ius:'MODES-Terminal', service:'MMC', server: 'modes-sql-odusb',admin: 'Мосин', ip: 'xxx'},
				      	{id:'4', ius:'MODES-Terminal', service:'Transfer ZVK', server: 'modes-sql-odusb',admin: 'Мосин', ip: 'xxx'},
				      	{id:'5', ius:'Прогноз Потребления', service:'App Server', server: 'prognoz-odusb',admin: 'Мосин', ip: 'xxx'},
			       		{id:'6', ius:'Прогноз Потребления', service:'SQL Server', server: 'prognoz-odusb',admin: 'Мосин', ip: 'xxx'},
				       	{id:'7', ius:'ОИК СК-2007', service:'Основная группа', server: 'condor1',admin: 'Татарников', ip: 'xxx'},
				       	{id:'8', ius:'ОИК СК-2007', service:'Основная группа', server: 'condor2',admin: 'Татарников', ip: 'xxx'},
				       	{id:'9', ius:'ОИК СК-2007', service:'Резервная группа', server: 'condor3',admin: 'Татарников', ip: 'xxx'},
						{id:'10', ius:'MODES-Terminal', service:'Host', server: 'modes-sql-odusb',admin: 'Мосин', ip: 'xxx'},
				      	{id:'11', ius:'MODES-Terminal', service:'MPPM', server: 'modes-sql-odusb',admin: 'Мосин', ip: 'xxx'},
				      	{id:'12', ius:'MODES-Terminal', service:'MMC', server: 'modes-sql-odusb',admin: 'Мосин', ip: 'xxx'},
				      	{id:'13', ius:'MODES-Terminal', service:'Transfer ZVK', server: 'modes-sql-odusb',admin: 'Мосин', ip: 'xxx'},
				      	{id:'14', ius:'Прогноз Потребления', service:'App Server', server: 'prognoz-odusb',admin: 'Мосин', ip: 'xxx'},
			       		{id:'15', ius:'Прогноз Потребления', service:'SQL Server', server: 'prognoz-odusb',admin: 'Мосин', ip: 'xxx'},
				       	{id:'16', ius:'ОИК СК-2007', service:'Основная группа', server: 'condor1',admin: 'Татарников', ip: 'xxx'},
				       	{id:'17', ius:'ОИК СК-2007', service:'Основная группа', server: 'condor2',admin: 'Татарников', ip: 'xxx'},
				       	{id:'18', ius:'ОИК СК-2007', service:'Резервная группа', server: 'condor3',admin: 'Татарников', ip: 'xxx'},
					];

let columns = ['id','ius','service','server', 'admin','ip'];
export default {
	name: 'viewTable',
  	data() {
  		return {
     		columns:columns,
    		tableData: 	tableData,
      		options: {
      			group:true,
      			sortable:'',
      			orderBy:{column:'ius', ascending: true },
      			perPage:10,
      			perPageValues:[10, 20, 50],
			}
  		}
  	},
    mounted() {
        this.$root.$on('query', function (query) {
            console.log(query);
            //noinspection JSUnresolvedVariable,JSUnresolvedFunction
            this.$refs.table.setFilter(query);
    }.bind(this))
    }
};
</script>

<style lang="css" scoped>
</style>