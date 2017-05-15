<template>
    <div id="canvas" class="canvas-wrap d-flex flex-column"></div>
</template>

<script>

    //    TODO 1. Кластеризация (сворачивание элементов) при уменьшении масштаба с поддержкой иерархии.
    //    TODO 2. Симуляция отключения с учетом весов связей.
    //    TODO 3. Загрузка данных с backend вместо статичных массивов
    //    TODO 4. Сохранение/загрузка координат объектов в localstore
    //    TODO 5. Центрирование/увеличение масштаба viewport на выделенном объекте

        import vis from 'vis/index';

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
            if (connectedEdges.length !== 0) {                                                       // если такие связи есть, то
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

    export default {
        data() {
            return {
                datasetNodes: null,
                datasetEdges: null,
                network: null,
                highlightActive: false,
                options: {
                    interaction:{
                        navigationButtons: true,
                        hover: true,
                        multiselect: true,
                        keyboard: false,
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
//						randomSeed: 942307
//                        randomSeed: 670367
//                        hierarchical: 	{
//  		                    sortMethod: 'directed',
//                        },
                    },
                    physics: {
                        forceAtlas2Based: {
                            gravitationalConstant: -26,
                            centralGravity: 0.005,
                            springLength: 230,
                            springConstant: 0.18
                        },
                        barnesHut       : {
//                            gravitationalConstant: -1000,
//                            centralGravity: 0.4,
                            springLength: 100,
//                            springConstant: 0.18,
//                            damping: 0.09,
//                            avoidOverlap: 0.9
                        },
//                        maxVelocity: 100,
                        //solver: 'forceAtlas2Based',
                        timestep        : 0.5,
                        adaptiveTimestep: true,
                        stabilization   : {
                            enabled:true,
                            iterations:500,
//                            updateInterval:25
                        }
                    },
                    edges: {
                        smooth: true,
                        color: {inherit: 'both'},
                        arrowStrikethrough: false,
                        arrows: {middle : true }
                    },
                }
            }
        },
        methods: {
            allNodes() {
                return this.datasetNodes.get({returnType: "Object"})
            },
            highlight(nodes, color) {
                let allNodes = this.allNodes();
                this.highlightActive = true;
                for (let nodeId in allNodes) {
                    if ( allNodes.hasOwnProperty(nodeId))
                        if (color.back){
                            allNodes[nodeId].color = color.back;
                            if (allNodes[nodeId].hiddenLabel === undefined) {
                                allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
                                allNodes[nodeId].label = undefined;
                            }
                            allNodes[nodeId]['icon'] = {color: color.back};
                            if (color.back === undefined) delete allNodes[nodeId].icon
                        }
                }
                nodes.forEach(function(item){
                    allNodes[item].color = color.front;
                    if (allNodes[item].hiddenLabel !== undefined) {
                        allNodes[item].label = allNodes[item].hiddenLabel;
                        allNodes[item].hiddenLabel = undefined;
                    }
                    allNodes[item]['icon'] = {color: color.front};
                    if (color.front === undefined) delete allNodes[item].icon;
                }, this);
                let updateArray = [];
                for (let nodeId in  allNodes) {
                    if ( allNodes.hasOwnProperty(nodeId)) {
                        updateArray.push( allNodes[nodeId]);
                    }
                }
                this.datasetNodes.update(updateArray);
            },
            resetHighlight() {
                let allNodes = this.allNodes();
                if (this.highlightActive === true) {
                    // reset all nodes
                    for (let nodeId in  allNodes) {
                        if ( allNodes.hasOwnProperty(nodeId)) {
                            allNodes[nodeId].color = undefined;
                            delete allNodes[nodeId].icon;
                            if (allNodes[nodeId].hiddenLabel !== undefined) {
                                allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
                                allNodes[nodeId].hiddenLabel = undefined;
                            }
                        }
                    }
                    this.highlightActive = false;
                    let updateArray = [];
                    for (let nodeId in  allNodes) {
                        if ( allNodes.hasOwnProperty(nodeId)) {
                            updateArray.push( allNodes[nodeId]);
                        }
                    }
                    this.datasetNodes.update(updateArray);
                }
            },
            getAffectedSubtree: function (params) {
                if (params.nodes.length > 0 && params.event.type === 'press') {
                    this.resetHighlight(params);
                    let selectedNodes = params.nodes;
                    let connectedNodes = getaffected.call(this, selectedNodes,'to');

                    this.highlight(connectedNodes, {front: 'rgba(255, 0, 0, 1)', back: 'rgba(200,200,200,0.5)'});
                }
                else if (params.nodes.length === 0) this.resetHighlight()
            },
            getDependSubtree: function (params) {
                if (params.nodes.length > 0  && params.event.type === 'tap') {
                    let selectedNodes = params.nodes;
                    this.highlightActive = true;
                    let connectedNodes = getaffected.call(this, selectedNodes,'from');

                    this.highlight(connectedNodes, {back: 'rgba(200,200,200,0.5)'});
                }
                else if (params.nodes.length === 0) this.resetHighlight()
            }
        },
        mounted() {
//            this.datasetNodes = new vis.DataSet(this.$store.getters.nodes);
            this.datasetNodes = new vis.DataSet(this.$root.appData.Nodes);
            const staticPositions = window.reestriusStorage.fetch(NODE_POSITIONS_KEY);
            staticPositions && this.datasetNodes.update(this.datasetNodes.map((item,id) => Object.assign(item, staticPositions[id])));
            this.datasetEdges = new vis.DataSet(this.$root.appData.Edges);
            this.container = document.getElementById('canvas');
            let data = {
                nodes: this.datasetNodes,
                edges: this.datasetEdges
            };
            this.datasetNodes.on('update', function (event, properties, senderId) {
                window.reestriusStorage.save(properties.data, NODE_POSITIONS_KEY)
            });
//            if (window.reestriusStorage.uid !== 0) {
//                this.options.physics.stabilization = false
//            }
            this.network = new vis.Network(this.container, data, this.options);
            this.network.on("select",this.getDependSubtree);
            this.network.on("hold",this.getAffectedSubtree);
            this.network.on("stabilized", this.network.storePositions);
            this.$root.$on('query', function (query) {
                if (query){
                    let filtered = this.datasetNodes.getIds({
                        filter: function(item) {
                            let filter = item.label ? item.label : item.hiddenLabel;
                            return filter.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                        }.bind(this)
                    });
                    this.highlight(filtered, {back: 'rgba(200, 200, 200, 0.5)'});
                }
                else this.resetHighlight()
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

