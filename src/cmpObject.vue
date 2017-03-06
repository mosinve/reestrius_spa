<template>
	<div class="card m-2 w-25 float-left draggable" draggable="true">
	    	<div class="card-header">
	    		<h5 class="card-title mb-0">{{object.name}}</h5>
	    	</div>
	    	<div class="card-block p-0">
		    <cmpProperty v-for="property in object.properties" :data="property" :key="property.id"></cmpProperty>
		    </div>
		    </div>
</template>

<script >
	import cmpProperty from './cmpProperty.vue'
 	export default {
	  props: ['object'],
	components: {
		cmpProperty
	},
	mounted: function(){
		    $( ".draggable" ).draggable({ containment: "#app", scroll: false });		    
	}

 }
</script>
