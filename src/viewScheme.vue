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
        {from:4, to: 0, weight: 10},
        {from:2, to: 9, weight: 10},
        {from:3, to: 1, weight: 10},
        {from:2, to: 3, weight: 1},
        {from:4, to: 1, weight: 10},
        {from:4, to: 33, weight: 10},
        {from:5, to: 6, weight: 10},
        {from:5, to: 7, weight: 10},
        {from:5, to: 8, weight: 10},
        {from:5, to: 9, weight: 10},
        {from:6, to: 0, weight: 10},
        {from:7, to: 0, weight: 10},
        {from:8, to: 0, weight: 10},
        {from:9, to: 0, weight: 10},
        {from:10, to: 5, weight: 10},
        {from:11, to: 10, weight: 10},
        {from:12, to: 10, weight: 10},
        {from:13, to: 14, weight: 10},
        {from:13, to: 15, weight: 10},
        {from:13, to: 1, weight: 10},
        {from:14, to: 1, weight: 10},
        {from:15, to: 1, weight: 10},
        {from:16, to: 13, weight: 10},
        {from:17, to: 16, weight: 10},
        {from:18, to: 16, weight: 10},
        {from:19, to: 2, weight: 10},
        {from:20, to: 2, weight: 10},
        {from:21, to: 20, weight: 10},
        {from:22, to: 19, weight: 10},
        {from:4, to: 23, weight: 10},
        {from:26, to: 24, weight: 10},
        {from:26, to: 25, weight: 10},
        {from:24, to: 23, weight: 10},
        {from:25, to: 23, weight: 10},
        {from:27, to: 30, weight: 10},
        {from:28, to: 30, weight: 10},
        {from:29, to: 31, weight: 10},
        {from:30, to: 3, weight: 10},
        {from:31, to: 3, weight: 10},
        {from:32, to: 17, weight: 10},
        {from:32, to: 18, weight: 10},
        {from:32, to: 21, weight: 10},
        {from:32, to: 22, weight: 10},
        {from:32, to: 4, weight: 10},
        {from:33, to: 0, weight: 10},
        {from:3, to: 33, weight: 10},
    ];
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
						randomSeed: 851884
//                		randomSeed: 296570,
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
            this.datasetNodes = new vis.DataSet(Nodes);
            this.datasetEdges = new vis.DataSet(Edges);
            this.container = document.getElementById('canvas');
            let data = {
                nodes: this.datasetNodes,
                edges: this.datasetEdges
            };
            this.network = new vis.Network(this.container, data, this.options);
			this.allNodes = this.datasetNodes.get({returnType:"Object"});
            this.network.on("select",this.methods.getDependSubtree);
            this.network.on("hold",this.methods.getAffectedSubtree);
            Event.$on('query', function (query) {
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

