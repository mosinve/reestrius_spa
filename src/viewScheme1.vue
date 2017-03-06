<template>
	<div id="canvas" class="canvas-wrap"><!-- <cmpObject v-for="object in objectsList" :object="object" :key="object.id"></cmpObject> --></div>
</template>

<script>
	import cmpObject from './cmpObject.vue';
	//cydagre( cytoscape ); // register extension
	var objectsList = [{ name: 'ПАК "MODES-Terminal"', 
				      	id:'1',
				      	properties: [
				      		{id: '1', name: 'Основной админ', value: 'Мосин'},
				      		{id: '2', name: 'Резервный админ', value: 'Квашнин'}
				      	]
				      },
				      { name: 'Сервер modes1-odusb.odusb.so', 
				      	id:'2', 
				      	parent: '1',
				      	properties: [
				      		{id: '3', name: 'Основной админ', value: 'Квашнин'},
				      		{id: '4', name: 'Резервный админ', value: 'Мосин'}
				      	]
				      },
				      { name: 'ОИК СК-2007', 
				      	id:'3',
				      	properties: [
				      		{id: '5', name: 'Основной админ', value: 'Татарников'},
				      		{id: '6', name: 'Резервный админ', value: 'Квашнин'}
				      	]}
				    ];
	export default 
	{
  		name: 'viewScheme',
  		data (){
			return{
				objectsList: objectsList
			}
  		},
		components:
		{
			cmpObject
  		},
  		activated: function()
  		{
			// $(function()
			// {
			// 	var cy = cytoscape(
			// 		{
			// 			container: document.getElementById('canvas'),
   //        				boxSelectionEnabled: false,
   //        				autounselectify: false,
			// 			layout: 
			// 			{
			// 				name: 'cose',	
			// 				 fit: true,
			// 				 nodeRepulsion: function( node ){ return ; },
			// 				 nodeOverlap: 0.1,
			// 				 idealEdgeLength: function( edge ){ return 1; },
			// 				 nestingFactor: 100,
			// 			},
			// 			style: [
			// 			{
			// 				selector: 'node',
			// 				style: 
			// 				{
			// 					'label': 'data(name)',
			// 					'text-opacity': 0.5,
			// 					'text-valign': 'center',
			// 					'text-halign': 'center',
			// 					'background-color': '#FFF',
			// 					'shape': 'roundrectangle',
			// 					'border-color': 'blue',
			// 					'border-width': 2,
			// 					'width': 'label',
			// 					'padding': '5px'
			// 				}
			// 			},
			// 			{
			// 				selector: ':parent',
			// 				style: 
			// 				{
			// 					'label': 'data(name)',
			// 					'text-opacity': 1,
			// 					'text-valign': 'top',
			// 					'text-halign': 'center',
			// 					'text-margin-y': '-10px',
			// 					'background-color': '#FFF',
			// 					'shape': 'roundrectangle',
			// 					'border-color': 'blue',
			// 					'border-width': 2,
			// 					'width': 'label',
			// 					'compound-sizing-wrt-labels': 'include'
			// 				}
			// 			},
			// 			{
			// 				selector: 'edge',
			// 				style: 
			// 				{
			// 					'width': 2,
			// 					'target-arrow-shape': 'triangle',
			// 					'line-color': '#9dbaea',
			// 					'target-arrow-color': '#9dbaea',
			// 					'curve-style': 'bezier'
			// 				}
			// 			},
			// 		    {
			// 		    	selector: ':selected',
			// 		        style: {
			// 		        'background-color': 'white',
			// 				'line-color': 'red',
			// 		        'target-arrow-color': 'red',
			// 		        'source-arrow-color': 'red',
			// 		        'border-color': 'red',
			// 		        'text-opacity': 1
			// 		      	}
			// 		    },
			// 		    {
			// 		    	selector: '.faded',
			// 				style: {								
			// 					'opacity': 0.25,
   //  					        'text-opacity': 0
			// 		 		},
			// 		 	},
			// 		 	{
			// 		    	selector: 'node > edge',
			// 				style: {								
			// 					'opacity': 0.25,
   //  					        'text-opacity': 0,
   //  					        'line-color' : 'yellow'
			// 		 		},
			// 		 	}
			// 		],
			// 		elements: {
			// 			nodes: [
			// 				{ data: { id: 'ius0', name: 'ПАК MODES-Terminal'} },
			// 				{ data: { id: 'ius1', name: 'Host', parent: "ius0"} },
			// 				{ data: { id: 'ius2', name: 'MMC', parent: "ius0"} },
			// 				{ data: { id: 'ius3', name: 'MPPM', parent: "ius0"} },
			// 				{ data: { id: 'ius4', name: 'Transfer ZVK', parent: "ius0"} },
			// 				{ data: { id: 'ius5', name: 'SQL БД MODES', parent: "ius0"} },
			// 				{ data: { id: 'ius6', name: 'ПАК Прогноз потребления'} },
			// 				{ data: { id: 'ius7', name: 'SQL БД PROGNOZ', parent: "ius6"} },
			// 				{ data: { id: 'ius8', name: 'Supervisor', parent: "ius6"} },
			// 				{ data: { id: 'ius9', name: 'EventMessenger', parent: "ius6" } },
			// 				{ data: { id: 'ius10', name: 'ПК Заявки'} },
			// 				{ data: { id: 'ius11', name: 'SQL БД ODU_1', parent:'ius10' } },
			// 				{ data: { id: 'ius12', name: 'Сервер приложений', parent:'ius10'} },
			// 				{ data: { id: 'itactive1', name: 'Кластер MODES-ODUSB' } },
			// 				{ data: { id: 'itactive2', name: 'modes1-odusb', parent: 'itactive1' } },
			// 				{ data: { id: 'itactive3', name: 'modes2-odusb', parent: 'itactive1' } },
			// 				{ data: { id: 'itactive4', name: 'Кластер PROGNOZ-ODUSB' } },
			// 				{ data: { id: 'itactive5', name: 'prognoz1-odusb', parent: 'itactive4' } },
			// 				{ data: { id: 'itactive6', name: 'prognoz2-odusb', parent: 'itactive4' } },
			// 				{ data: { id: 'itactive7', name: 'zvkdb-odusb' } },
			// 				{ data: { id: 'itactive8', name: 'zvkapp-odusb'} },
			// 			],
			// 			edges: [
			// 				{ data: { source: 'itactive1', target: 'ius0', weight: '0.5' } },
			// 				{ data: { source: 'itactive4', target: 'ius6', weight: '0.5' } },
			// 				{ data: { source: 'itactive7', target: 'ius11', weight: '0.5'} },
			// 				{ data: { source: 'itactive8', target: 'ius12', weight: '0.5' } },
			// 				{ data: { source: 'ius5', target: 'ius1', weight: '1' } },
			// 				{ data: { source: 'ius5', target: 'ius2', weight: '1' } },
			// 				{ data: { source: 'ius5', target: 'ius3', weight: '1' } },
			// 				{ data: { source: 'ius5', target: 'ius4', weight: '1' } },
			// 			]

			// 		}
			// 	});
				/*cy.on('tap', 'node', function(e){
			  var node = e.cyTarget; 
			  //var neighborhood = node.closedNeighborhood();
			  var neighborhood = node.Neighborhood().add(node);
			  
			  cy.elements().addClass('faded');
			  neighborhood.select();
			  neighborhood.removeClass('faded');
			  cy.elements().each(function(i, ele){
			  	ele.select();
  				console.log( ele.id() + ' is ' + ( ele.selected() ? 'selectable' : 'not selectable' ) );
			});
			});

			cy.on('tap', function(e){
			  if( e.cyTarget === cy ){
			    cy.elements().removeClass('faded');
			  }
			});*/

			// var api = cy.viewUtilities({
   //                  neighbor: function(node){
   //                      return node.closedNeighborhood();
   //                  },
   //                  neighborSelectTime: 1000
   //              });


			// }); 
			  var nodes = [
    {id: 1,  label: 'Node 1', color:'orange'},
    {id: 2,  label: 'Node 2', color:'DarkViolet', font:{color:'white'}},
    {id: 3,  label: 'Node 3', color:'orange'},
    {id: 4,  label: 'Node 4', color:'DarkViolet', font:{color:'white'}},
    {id: 5,  label: 'Node 5', color:'orange'},
    {id: 6,  label: 'cid = 1', cid:1, color:'orange'},
    {id: 7,  label: 'cid = 1', cid:1, color:'DarkViolet', font:{color:'white'}},
    {id: 8,  label: 'cid = 1', cid:1, color:'lime'},
    {id: 9,  label: 'cid = 1', cid:1, color:'orange'},
    {id: 10, label: 'cid = 1', cid:1, color:'lime'}
  ];

  // create an array with edges
  var edges = [
    {from: 1, to: 2},
    {from: 1, to: 3},
    {from: 10, to: 4},
    {from: 2, to: 5},
    {from: 6, to: 2},
    {from: 7, to: 5},
    {from: 8, to: 6},
    {from: 9, to: 7},
    {from: 10, to: 9}
  ];

  // create a network
  var container = document.getElementById('canvas');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {layout:{randomSeed:8}};
  var network = new vis.Network(container, data, options);
  network.on("selectNode", function(params) {
      if (params.nodes.length == 1) {
          if (network.isCluster(params.nodes[0]) == true) {
              network.openCluster(params.nodes[0]);
          }
      }
  });

  function clusterByCid() {
      network.setData(data);
      var clusterOptionsByData = {
          joinCondition:function(childOptions) {
              return childOptions.cid == 1;
          },
          clusterNodeProperties: {id:'cidCluster', borderWidth:3, shape:'database'}
      };
      network.cluster(clusterOptionsByData);
  }
  function clusterByColor() {
      network.setData(data);
      var colors = ['orange','lime','DarkViolet'];
      var clusterOptionsByData;
      for (var i = 0; i < colors.length; i++) {
          var color = colors[i];
          clusterOptionsByData = {
              joinCondition: function (childOptions) {
                  return childOptions.color.background == color; // the color is fully defined in the node.
              },
              processProperties: function (clusterOptions, childNodes, childEdges) {
                  var totalMass = 0;
                  for (var i = 0; i < childNodes.length; i++) {
                      totalMass += childNodes[i].mass;
                  }
                  clusterOptions.mass = totalMass;
                  return clusterOptions;
              },
              clusterNodeProperties: {id: 'cluster:' + color, borderWidth: 3, shape: 'database', color:color, label:'color:' + color}
          };
          network.cluster(clusterOptionsByData);
      }
  }
  function clusterByConnection() {
      network.setData(data);
      network.clusterByConnection(1)
  }
  function clusterOutliers() {
      network.setData(data);
      network.clusterOutliers();
  }
  function clusterByHubsize() {
      network.setData(data);
      var clusterOptionsByData = {
          processProperties: function(clusterOptions, childNodes) {
            clusterOptions.label = "[" + childNodes.length + "]";
            return clusterOptions;
          },
          clusterNodeProperties: {borderWidth:3, shape:'box', font:{size:30}}
      };
      network.clusterByHubsize(undefined, clusterOptionsByData);
  }

  		}  
	};
</script>

<style lang="css" scoped>
.canvas-wrap { flex: 1}
.canvas-wrap div { position:absolute; top:0; left:0; z-index:0 }

</style>