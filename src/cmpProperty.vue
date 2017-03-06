<template>
	<div class="card rounded-0 rounded-bottom">
			    <div class="card-header" role="tab" :id="'heading'+data.id">
			      <h6 class="mb-0">
			        <a class="" data-toggle="collapse" :href="'#collapse'+data.id" aria-expanded="false" :aria-controls="'collapse'+data.id">
			         {{data.name}}
			        </a>
			      </h6>
			    </div>
			    <div :id="'collapse'+data.id" class="collapse" role="tabpanel" :aria-labelledby="'heading'+data.id">
			      <div class="card-block p-1 text-right">
			        {{data.value}}
			      </div>
			    </div>
			  </div>
</template>

<script >
	export default{
		name: 'cmpProperty',
		props: ['data'],
	}
</script>