<template>
    <div id="canvas" class="canvas-wrap d-flex flex-column"></div>
</template>

<script>
    /* eslint-disable capitalized-comments,no-warning-comments,no-extend-native,func-style,require-jsdoc,no-console */


    //    TODO 1. Кластеризация (сворачивание элементов) при уменьшении масштаба с поддержкой иерархии.
    //    TODO 2. Симуляция отключения с учетом весов связей.
    //    TODO 3. Загрузка данных с backend вместо статичных массивов
    //    TODO 5. Центрирование/увеличение масштаба viewport на выделенном объекте

    import vis from 'vis';

    if (!String.prototype.includes) {
        String.prototype.includes = function (...args) {
            return String.prototype.indexOf.apply(this, args) !== -1;
        };
    }

    const networkOptions = {
        interaction: {
            navigationButtons: true,
            hover: true,
            multiselect: true,
            keyboard: false,
        },
        groups: {
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
        nodes: {},
        layout: {
            improvedLayout: true,
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
            barnesHut: {
//                            gravitationalConstant: -1000,
//                            centralGravity: 0.4,
                springLength: 100,
//                            springConstant: 0.18,
//                            damping: 0.09,
//                            avoidOverlap: 0.9
            },
//                        maxVelocity: 100,
            //solver: 'forceAtlas2Based',
            timestep: 0.5,
            adaptiveTimestep: true,
            stabilization: {
                enabled: true,
                iterations: 500,
//                            updateInterval:25
            }
        },
        edges: {
            smooth: true,
            color: {inherit: 'both'},
            arrowStrikethrough: false,
            arrows: {middle: true}
        },
    };

    function getAffectedNodesIds (targetNodesIds, direction, network, srcEdges) {
        let currentLinkedNodes = [];
        let allAffectedNodes = [];

        targetNodesIds.forEach(function (node) {
            currentLinkedNodes = srcEdges.get().filter(edge => network.getConnectedEdges(node).includes(edge.id) && (edge[direction] !== node))
                .map(edge => edge[direction]);
            allAffectedNodes = allAffectedNodes.concat(currentLinkedNodes, getAffectedNodesIds(currentLinkedNodes, direction, network, srcEdges).filter(id => !currentLinkedNodes.includes(id)))
        });
        return targetNodesIds.concat(allAffectedNodes);
    }

    export default {
        data() {
            return {
                datasetNodes: null,
                datasetEdges: null,
                network: null,
                highlighted: false
            }
        },
        methods: {
            getNodes() {
                return this.datasetNodes.get()
            },
            setBackColor(nodes, color){
                return nodes.map(function(node){
                        node.color = color;
                        if (typeof node.hiddenLabel === 'undefined') {
                            node.hiddenLabel = node.label;
                            delete node.label;
                        }
                        node.icon = {color};
                        return node;
                });
            },
            setFrontColor(nodes, color) {
               return nodes.map(function (node) {
                    node.color = color;
                    if (typeof node.hiddenLabel !== 'undefined') {
                        node.label = node.hiddenLabel;
                        delete node.hiddenLabel;
                    }
                    node.icon = {color};
                    return node;
                });
            },
            highlight(nodes, color) {
                let allNodes = this.getNodes();
                let back = [];
                let front = [];
                if (color.back) {
                     back = this.setBackColor(allNodes.filter(node => !nodes.includes(node.id)), color.back);
                }
                if (color.front) {
                    front = this.setFrontColor(allNodes.filter(node => nodes.includes(node.id)), color.front);
                }

                this.datasetNodes.update([...front, ...back]);
                this.highlighted = true;
            },
            resetHighlight() {
                let allNodes = this.getNodes();
                if (this.highlighted === true) {
                    // reset all nodes
                    for (let nodeId in  allNodes) {
                        if (Object.prototype.hasOwnProperty.call(allNodes, nodeId)) {
                            delete allNodes[nodeId].color;
                            delete allNodes[nodeId].icon;
                            if (typeof allNodes[nodeId].hiddenLabel !== 'undefined') {
                                allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
                                delete allNodes[nodeId].hiddenLabel;
                            }
                        }
                    }
                    this.highlighted = false;
                    let updateArray = [];
                    for (let nodeId in  allNodes) {
                        if (Object.hasOwnProperty.call(allNodes, nodeId)) {
                            updateArray.push(allNodes[nodeId]);
                        }
                    }
                    this.datasetNodes.update(updateArray);
                }
            },
            getAffectedSubtree(params) {
                if (params.nodes.length > 0 && params.event.type === 'press') {
                    this.resetHighlight(params);
                    let selectedNodes = params.nodes;
                    let connectedNodes = getAffectedNodesIds.call(this, selectedNodes, 'to',this.network, this.datasetEdges);

                    this.highlight(connectedNodes, {front: 'rgba(255, 0, 0, 1)', back: 'rgba(200,200,200,0.5)'});
                }
                else if (params.nodes.length === 0) this.resetHighlight()
            },
            getDependSubtree(params) {
                if (params.nodes.length && params.event.type === 'tap') {
                    this.highlighted = true;
                    let connectedNodes = getAffectedNodesIds.call(this, params.nodes, 'from', this.network, this.datasetEdges);

                    this.highlight(connectedNodes, {back: 'rgba(200,200,200,0.5)'});
                }
                else if (params.nodes.length === 0) this.resetHighlight()
            }
        },
        mounted() {
//            this.datasetNodes = new vis.DataSet(this.$store.getters.nodes);
            this.datasetNodes = new vis.DataSet(this.$root.appData.Nodes);
            const staticPositions = window.reestriusStorage.fetch(window.NODE_POSITIONS_KEY);
            staticPositions && this.datasetNodes.update(this.datasetNodes.map((item, id) => Object.assign(item, staticPositions[id])));
            this.datasetEdges = new vis.DataSet(this.$root.appData.Edges);
            this.container = document.getElementById('canvas');
            let data = {
                nodes: this.datasetNodes,
                edges: this.datasetEdges
            };
            this.datasetNodes.on('update', function (event, properties) {
                window.reestriusStorage.save(properties.data, window.NODE_POSITIONS_KEY)
            });
            if (window.reestriusStorage.uid > 0) {
                networkOptions.physics.stabilization.onlyDynamicEdges = true
            }
            this.network = new vis.Network(this.container, data, networkOptions);
            this.network.on("select", this.getDependSubtree);
            this.network.on("hold", this.getAffectedSubtree);
            this.network.on("stabilized", this.network.storePositions);
            this.$root.$on('query', function (query) {
                if (query) {
                    let filtered = this.datasetNodes.getIds({
                        filter: function (item) {
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

