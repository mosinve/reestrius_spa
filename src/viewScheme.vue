<template>
	<div id="canvas" class="canvas-wrap d-flex flex-column">	
	<!-- <cmpObject v-for="object in objectsList" :object="object" :key="object.id"></cmpObject> -->		
	</div>
</template>

<script>

//    TODO 1. Кластеризация (сворачивание элементов) при уменьшении масштаба с поддержкой иерархии.
//    TODO 2. Симуляция отключения с учетом весов связей.
//    TODO 3. Загрузка данных с backend вместо статичных массивов
//    TODO 4. Сохранение/загрузка координат объектов в localstore
//    TODO 5. Центрирование/увеличение масштаба viewport на выделенном объекте

	import vis from 'vis';

	if (!String.prototype.includes) {
        String.prototype.includes = function() {
            'use strict';
            return String.prototype.indexOf.apply(this, arguments) !== -1;
        };
    }

    function getaffected (nodes, direction){
        let connectedEdges = [];
        let affectedNodes = [];
        let allaffectedNodes = [];
        nodes.forEach( function(node){                                                              // Для каждого узла
            connectedEdges = this.network.getConnectedEdges(node).filter( function(edge){           // выбираем исходящие связи
                let edgeobj = this.datasetEdges.get(edge);
                return (edgeobj[direction] !== node) && (edgeobj.weight >= 10)
            },this);
            if (connectedEdges.length != 0) {                                                       // если такие связи есть, то
                affectedNodes =connectedEdges.map(function (edge) {                                            // для каждой связи
                    return this.datasetEdges.get(edge)[direction];                                      // выбираем конечный узел
                },this);
                allaffectedNodes = allaffectedNodes.concat(affectedNodes,getaffected.call(this, affectedNodes,direction).filter(function (el) {
                    return !affectedNodes.includes(el);
                }));
            }
        }, this);
        return nodes.concat(allaffectedNodes);
    }

	export default{
  		name: 'viewScheme',
        data() {
  		    return {
                datasetNodes: null,
                datasetEdges: null,
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
  		            },
                    layout: {
  		                improvedLayout:true,
//						randomSeed: 851884
//                		randomSeed: 296570,
//						randomSeed: 942307
//                        randomSeed: 670367
//                        hierarchical: 	{
//  		                    sortMethod: 'directed',
//                        },
                    },
                    edges: {
                        smooth: true,
                        color: {inherit: 'both'},
                        arrowStrikethrough: false,
                        arrows: {middle : true }
					},
  		        },
                container: '',
                disabled: false,
                methods: {
                    highlight : function(nodes, color) {
                        this.highlightActive = true;
                        for (let nodeId in this.allNodes) {
                            if ( this.allNodes.hasOwnProperty(nodeId))
                                if (color.back){
                                this.allNodes[nodeId].color = color.back;
                                if (this.allNodes[nodeId].hiddenLabel === undefined) {
                                    this.allNodes[nodeId].hiddenLabel = this.allNodes[nodeId].label;
                                    this.allNodes[nodeId].label = undefined;
                                }
                                this.allNodes[nodeId]['icon'] = {color: color.back};
                                if (color.back === undefined) delete this.allNodes[nodeId].icon
							}
                        }

                        nodes.forEach(function(item){
                                this.allNodes[item].color = color.front;
                                if (this.allNodes[item].hiddenLabel !== undefined) {
                                    this.allNodes[item].label = this.allNodes[item].hiddenLabel;
                                    this.allNodes[item].hiddenLabel = undefined;
                                }
                                this.allNodes[item]['icon'] = {color: color.front};
                                if (color.front === undefined) delete this.allNodes[item].icon;
                        }, this);
                        let updateArray = [];
                        for (let nodeId in  this.allNodes) {
                            if ( this.allNodes.hasOwnProperty(nodeId)) {
                                updateArray.push( this.allNodes[nodeId]);
                            }
                        }
                        this.datasetNodes.update(updateArray);
					}.bind(this),
                    resethighlight : function () {
                            if (this.highlightActive === true) {
                                // reset all nodes
                                for (let nodeId in  this.allNodes) {
                                    if ( this.allNodes.hasOwnProperty(nodeId)) {
                                        this.allNodes[nodeId].color = undefined;
                                        delete this.allNodes[nodeId].icon;
                                        if (this.allNodes[nodeId].hiddenLabel !== undefined) {
                                            this.allNodes[nodeId].label = this.allNodes[nodeId].hiddenLabel;
                                            this.allNodes[nodeId].hiddenLabel = undefined;
                                        }
                                    }
                                }
                                this.highlightActive = false;
                                let updateArray = [];
                                for (let nodeId in  this.allNodes) {
                                    if ( this.allNodes.hasOwnProperty(nodeId)) {
                                        updateArray.push( this.allNodes[nodeId]);
                                    }
                                }
                                this.datasetNodes.update(updateArray);
                            }
					}.bind(this),
            	    getAffectedSubtree : function (params) {
                        if (params.nodes.length > 0 && params.event.type === 'press') {
                            this.methods.resethighlight(params);
            	            let selectedNodes = params.nodes;
                            let connectedNodes = getaffected.call(this, selectedNodes,'to');

                            this.methods.highlight(connectedNodes, {front: 'rgba(255, 0, 0, 1)'});
                        }
                        else if (params.nodes.length === 0) this.methods.resethighlight()
                    }.bind(this),
                    getDependSubtree : function (params) {
                        if (params.nodes.length > 0  && params.event.type === 'tap') {
                            let selectedNodes = params.nodes;
                            this.highlightActive = true;
                            let connectedNodes = getaffected.call(this, selectedNodes,'from');

                            this.methods.highlight(connectedNodes, {back: 'rgba(200,200,200,0.5)'});
                        }
                        else if (params.nodes.length === 0) this.methods.resethighlight()
                    }.bind(this),
            	}
            }
  		},
        mounted() {
            this.datasetNodes = new vis.DataSet(this.$root.appData.Nodes);
            this.datasetEdges = new vis.DataSet(this.$root.appData.Edges);
            this.container = document.getElementById('canvas');
            let data = {
                nodes: this.datasetNodes,
                edges: this.datasetEdges
            };
            this.network = new vis.Network(this.container, data, this.options);
			this.allNodes = this.datasetNodes.get({returnType:"Object"});
            this.network.on("select",this.methods.getDependSubtree);
            this.network.on("hold",this.methods.getAffectedSubtree);
            this.$root.$on('query', function (query) {
                if (query){
                    let filtered = this.datasetNodes.getIds({
                        filter: function(item) {
                            let filter = item.label ? item.label : item.hiddenLabel;
                            return filter.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                        }.bind(this)
                    });
                    this.methods.highlight(filtered, {back: 'rgba(200, 200, 200, 0.5)'});
				}
				else this.methods.resethighlight()
            }.bind(this));
            console.log(this.network.getSeed());
  		},

        activated(){
            this.network.redraw();
  		}
	}
</script>

<style lang="css" scoped>

</style>

