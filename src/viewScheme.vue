<template>
	<div id="canvas" class="canvas-wrap d-flex flex-column">	
	<!-- <cmpObject v-for="object in objectsList" :object="object" :key="object.id"></cmpObject> -->		
	</div>
</template>

<script>

	import vis from 'vis';

	const Nodes = [
                    { id: 0, label: 'MODES-Terminal', group:'ius'},
                    { id: 1, label: 'Прогноз Потребления', group:'ius'},
                    { id: 2, label: 'ПК Заявки', group:'ius'}, 
                    { id: 3, label: 'ОИК СК-2007', group:'ius'},
                    { id: 4, label: 'КИТС', group:'ius'},
                    { id: 5, label: 'Сервер БД MODES', group:'service'},
                    { id: 6, label: 'MODES Host', group:'service'},
                    { id: 7, label: 'MODES MMC', group:'service'},
                    { id: 8, label: 'MODES MPPM', group:'service'},
                    { id: 9, label: 'MODES ZVK Transfer', group:'service'},
					{ id: 10, label: 'Кластер MODES-SQL', group:'cluster'},
                    { id: 11, label: 'modes1-odusb', group:'server'},
                    { id: 12, label: 'modes2-odusb', group:'server'},
					{ id: 13, label: 'Сервер БД PROGNOZ', group:'service'},	
                    { id: 14, label: 'PROGNOZ CFRAS Supervisor', group:'service'},
                    { id: 15, label: 'PROGNOZ EventMess', group:'service'},
					{ id: 16, label: 'Кластер PROGNOZ-SQL', group:'cluster'},
                    { id: 17, label: 'prognoz1-odusb', group:'server'},
                    { id: 18, label: 'prognoz2-odusb', group:'server'},
					{ id: 19, label: 'Сервер БД ODU_1', group:'service'},	
                    { id: 20, label: 'Сервер приложений', group:'service'},
                    { id: 21, label: 'zvkapp-odusb', group:'server'},
                    { id: 22, label: 'zvkdb-odusb', group:'server'},
                    { id: 23, label: 'ПК ДЭБ', group:'ius'},
					{ id: 24, label: 'Сервер БД DebDB', group:'service'},	
                    { id: 25, label: 'Web сервер', group:'service'},
                    { id: 26, label: 'deb-odusb', group:'server'},
					{ id: 27, label: 'condor1', group:'server'},
                    { id: 28, label: 'condor2', group:'server'},
                    { id: 29, label: 'condor3', group:'server'},
                    { id: 30, label: 'Основная группа CKMAIN', group:'cluster'},
                    { id: 31, label: 'Запасная группа CKZAPAS', group:'cluster'},
                    { id: 32, label: 'ЦОД', group:'ius'},
                    { id: 33, label: 'ПАК СРТ/СРПГ', group:'ius'},
                ];
	
	const Edges = [
                	{from:4, to: 0},
                	{from:2, to: 9},
					{from:3, to: 1},                	
                	{from:2, to: 3},
                	{from:4, to: 1},
                	{from:4, to: 33},
                	{from:5, to: 6},
                	{from:5, to: 7},
                	{from:5, to: 8},
                	{from:5, to: 9},
                	{from:6, to: 0},
                	{from:7, to: 0},
                	{from:8, to: 0},
                	{from:9, to: 0},
                	{from:10, to: 5},
                	{from:11, to: 10},
                	{from:12, to: 10},
                	{from:13, to: 14},
                	{from:13, to: 15},
                	{from:13, to: 1},
                	{from:14, to: 1},
                	{from:15, to: 1},
                	{from:16, to: 13},
                	{from:17, to: 16},
                	{from:18, to: 16},
                	{from:19, to: 2},
                	{from:20, to: 2},
                	{from:21, to: 20},
                	{from:22, to: 19},
                	{from:4, to: 23},
                	{from:26, to: 24},
                	{from:26, to: 25},
                	{from:24, to: 23},
                	{from:25, to: 23},
                	{from:27, to: 30},
                	{from:28, to: 30},
                	{from:29, to: 31},
                	{from:30, to: 3},
                	{from:31, to: 3},
                	{from:32, to: 17},
                	{from:32, to: 18},
                	{from:32, to: 21},
                	{from:32, to: 22},
                	{from:32, to: 4},
					{from:33, to: 0},
                	{from:3, to: 33},

                ];
	export default 
	{
  		name: 'viewScheme',
  		computed : {
                datasetNodes: function (){
                	return new vis.DataSet(Nodes); 
                },
                datasetEdges: function (){
                	return new vis.DataSet(Edges); 
                },
            },
	  	data() {
            return {
            	allNodes: null,
                network: null,                
                highlightActive: false,
                options: {
                	interaction:{
    					navigationButtons: true,
    					hover: true,
    					multiselect: true,
    					keyboard: true,
  					},
                	groups:{
                		ius: {
 								shape: 'icon',
 								mass: 1,
					            icon: {
					              face: 'FontAwesome',
					              code: '\uf1b2',
					              size: 50,
					              color: '#000'
					            },
					            color: '#000'
                		},
                		service: {
 								shape: 'icon',
 								mass: 5,
					            icon: {
					              face: 'FontAwesome',
					              code: '\uf1c0',
					              size: 50,
					              color: '#0E3EB8'
					            },
					            color: '#0E3EB8'
                		},
                		cluster: {
 								shape: 'icon',
 								mass: 1,
					            icon: {
					              face: 'FontAwesome',
					              code: '\uf1b3',
					              size: 50,
					              color: '#80551D'
					            },
					            color: '#80551D'
                		},
                		server: {
 								shape: 'icon',
 								mass: 5,
					            icon: {
					              face: 'FontAwesome',
					              code: '\uf233',
					              size: 50,
					              color: '#57169a'
					            },
					            color: '#57169a'
                		}
                	},
                	nodes: {
                		chosen : {
                			node :  function(values, id, selected, hovering) {
    									values.size = 75;
  							}
                		}                		
                	},
                	layout: {
                		improvedLayout:true,
                		//randomSeed: 296570,
          				// hierarchical: 	{
            		// 			 //sortMethod: 'directed',
          				// 				},
        					},
    				edges: {
      						smooth: true,
      						color: {inherit: 'from'},
      						arrowStrikethrough: true,
      						arrows: {middle : true }
					},
					// physics:{
					// 	solver: 'forceAtlas2Based',
					// }
				},
                container: '',
                disabled: false,
                methods: {
					neighbourhoodHighlight : function(params) {
                		 if (params.nodes.length > 0) {
			      let degrees = 10;
			      this.highlightActive = true;
			      let i,j;
			      let selectedNode = params.nodes[0];
			      

			      // mark all nodes as hard to read.
			      for (var nodeId in this.allNodes) {
			         this.allNodes[nodeId].color = 'rgba(200,200,200,0.5)';
			        if ( this.allNodes[nodeId].hiddenLabel === undefined) {
			           this.allNodes[nodeId].hiddenLabel =  this.allNodes[nodeId].label;
			           this.allNodes[nodeId].label = undefined;
			           this.allNodes[nodeId]['icon'] = {color : 'rgba(200,200,200,0.5)'};
			        }
			      }
			      let connectedNodes = this.network.getConnectedNodes(selectedNode);
			      let allConnectedNodes = [];

			      // get the second degree nodes
			      for (i = 1; i < degrees; i++) {
			        for (j = 0; j < connectedNodes.length; j++) {
			          allConnectedNodes = allConnectedNodes.concat(this.network.getConnectedNodes(connectedNodes[j]));
			        }
			      }

			      // all second degree nodes get a different color and their label back
			      for (i = 0; i < allConnectedNodes.length; i++) {
			         this.allNodes[allConnectedNodes[i]].color = 'rgba(150,150,150,0.75)';
			        if ( this.allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
			           this.allNodes[allConnectedNodes[i]].label =  this.allNodes[allConnectedNodes[i]].hiddenLabel;
			           this.allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
			           delete this.allNodes[allConnectedNodes[i]].icon;
			        }
			      }

			      // all first degree nodes get their own color and their label back
			      for (i = 0; i < connectedNodes.length; i++) {
			         this.allNodes[connectedNodes[i]].color = undefined;
			        if ( this.allNodes[connectedNodes[i]].hiddenLabel !== undefined) {
			           this.allNodes[connectedNodes[i]].label =  this.allNodes[connectedNodes[i]].hiddenLabel;
			           this.allNodes[connectedNodes[i]].hiddenLabel = undefined;
			           delete this.allNodes[connectedNodes[i]].icon;
			        }
			      }

			      // the main node gets its own color and its label back.
			       this.allNodes[selectedNode].color = undefined;
			      if ( this.allNodes[selectedNode].hiddenLabel !== undefined) {
			         this.allNodes[selectedNode].label =  this.allNodes[selectedNode].hiddenLabel;
			         this.allNodes[selectedNode].hiddenLabel = undefined;
			         delete this.allNodes[selectedNode].icon.color;
			      }
			    }
			    else if (this.highlightActive === true) {
			      // reset all nodes
			      for (var nodeId in  this.allNodes) {
			         this.allNodes[nodeId].color = undefined;
			        if ( this.allNodes[nodeId].hiddenLabel !== undefined) {
			           this.allNodes[nodeId].label =  this.allNodes[nodeId].hiddenLabel;
			           this.allNodes[nodeId].hiddenLabel = undefined;
			           delete this.allNodes[nodeId].icon;
			        }
			      }
			      this.highlightActive = false
			    }

			    // transform the object into an array
			    let updateArray = [];
			    for (var nodeId in  this.allNodes) {
			      if ( this.allNodes.hasOwnProperty(nodeId)) {
			        updateArray.push( this.allNodes[nodeId]);
			      }
			    }
			    this.datasetNodes.update(updateArray);
            	}.bind(this)
                }

            }
        },

        mounted() {
        	// let that = this;
            this.container = document.getElementById('canvas');
            // let datasetNodes = new vis.DataSet(Nodes);
            // let datasetEdges = new vis.DataSet(Edges);
            let data = {
                nodes: this.datasetNodes,
                edges: this.datasetEdges
            };
             
            this.network = new vis.Network(this.container, data, this.options); 
			this.allNodes = this.datasetNodes.get({returnType:"Object"});
            this.network.on("select",this.methods.neighbourhoodHighlight);
      			//this.network.cluster(this.clusterOptionsByData);
      			console.log(this.network.getSeed());
        	},
        	activated(){
        		this.network.redraw();
        	},
        deactivated() {
        	// this.network.destroy();
        }
  	}
</script>

<style lang="css" scoped>

</style>