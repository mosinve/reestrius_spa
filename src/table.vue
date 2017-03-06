<template>
<table class="table table-bordered">
	<tr>
	<table-heading v-for="item in fields" :item="item"></table-heading>
	</tr>
	<tbody>
		<tr>
		</tr>
	</tbody>
</table>
</template>

<script>
let resp = {
	fields: ['name', 'server','admin','ip']
}

import headings from './headings.vue'
export default {
  name: 'table',
  components:{
  	'table-heading':headings,
  },
  data () {
    return {
    	fields: resp.fields
    };
  }
};
</script>

<style lang="css" scoped>
</style>