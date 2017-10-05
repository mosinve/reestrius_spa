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

    const FRONT_COLOR = 'rgba(255, 0, 0, 1)'
    const BACK_COLOR = 'rgba(200,200,200,0.5)'
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
            allAffectedNodes = [...allAffectedNodes, ...currentLinkedNodes, ...getAffectedNodesIds(currentLinkedNodes, direction, network, srcEdges).filter(id => !currentLinkedNodes.includes(id))]
        });
        return [...targetNodesIds, ...allAffectedNodes];
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
            getNodes(ids) {
                return this.datasetNodes.get(ids)
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
                let selectedNodes = this.getNodes(nodes);
                let allNodes = this.getNodes({filter: node => !nodes.includes(node.id)});
                let back = [];
                let front = [];
                if (color.back) {
                     back = this.setBackColor(allNodes, color.back);
                }
                if (color.front) {
                    front = this.setFrontColor(selectedNodes, color.front);
                }

                this.datasetNodes.update([...front, ...back]);
                this.highlighted = true;
            },
            resetHighlight() {
                let selectedNodes = this.getNodes();
                if (this.highlighted === true) {
                    // reset all nodes
                    selectedNodes.forEach(function (node) {
                        delete node.color;
                        delete node.icon;
                        if (typeof node.hiddenLabel !== 'undefined') {
                            node.label = node.hiddenLabel;
                            delete node.hiddenLabel;
                        }
                    })
                    this.highlighted = false;
                    this.datasetNodes.update(selectedNodes);
                }
            },
            selectNodes(params) {
                let color;
                let destination;
                switch (params.event.type){
                case 'press':
                    color = {front: FRONT_COLOR, back: BACK_COLOR};
                    destination = 'to';
                    break;
                case 'tap':
                    color = {back: BACK_COLOR};
                    destination = 'from'
                    break;
                }

                if (params.nodes.length) {
                    this.resetHighlight();
                    let selectedNodes = params.nodes;
                    let connectedNodes = getAffectedNodesIds.call(this, selectedNodes, destination,this.network, this.datasetEdges);

                    this.highlight(connectedNodes, color);
                }
            },
        },
        mounted() {
//            this.datasetNodes = new vis.DataSet(this.$store.getters.nodes);
            this.datasetNodes = new vis.DataSet(this.$root.appData.Nodes);
            const staticPositions = window.reestriusStorage.fetch(window.NODE_POSITIONS_KEY);
            staticPositions && this.datasetNodes.update(this.datasetNodes.map((item, id) => ({...item, ...staticPositions[id]})));
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
            this.network.on("selectNode", this.selectNodes);
            this.network.on("deselectNode", this.resetHighlight)
            this.network.on("stabilized", this.network.storePositions);
            // eslint-disable-next-line arrow-body-style
            this.$root.$on('query', query => {
                this.resetHighlight()
                if (query) {
                    let filtered = this.datasetNodes.getIds({
                        filter: item => item.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                    });
                    this.highlight(filtered, {back: BACK_COLOR});
                }
            });
            console.log(this.network.getSeed());
        },

        activated(){
            this.network.redraw();
        }
    }
</script>
