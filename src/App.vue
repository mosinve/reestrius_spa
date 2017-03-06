<template>
  <div id="app" class="bg-faded d-flex flex-column">
<form class="form-inline justify-content-end">
  <label class="mr-sm-2" for="viewSelector">Вид:</label>
  <select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="viewSelector" v-model="currentView">
    <option value="viewScheme">Схема</option>
    <option value="viewTable">Таблица</option>
  </select>
</form>   
    <transition name="fade" mode="out-in">
      <keep-alive>     
        <component v-bind:is="currentView"></component>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import viewScheme from './viewScheme.vue';
import viewTable from './viewTable.vue';

export default {
  name: 'App',
  components:{
    viewScheme, viewTable
  },
  data () {
    return {
      currentView: 'viewScheme',
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
