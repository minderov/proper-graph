const Graph = require('../src/graph.js');
const assert = require('assert');

describe('Directed Graph', function() {
	const existingEdges = [
	{
		from: "11",
		to: "22"
	},
	{
		from: "11",
		to: "33"
	},
	{
		from: "22",
		to: "33"
	},
	{
		from: "33",
		to: "44"
	},
	{
		from: "44",
		to: "55"
	},
	{
		from: "44",
		to: "99"
	},
	{
		from: "55",
		to: "66"
	},
	{
		from: "66",
		to: "77"
	},
	{
		from: "77",
		to: "88"
	},
	{
		from: "88",
		to: "99"
	},
	{
		from: "99",
		to: "11"
	},
	{
		from: "99",
		to: "44"
	},
	{
		from: "55",
		to: "777"
	}];

	let g;

	function resetGraph() {
		g = new Graph({
			directed: true
		});

		g.addNode("11");
		g.addNode("22");
		g.addNode("33");
		g.addNode("44");
		g.addNode("55");
		g.addNode("66");
		g.addNode("77");
		g.addNode("88");
		g.addNode("99");
		g.addNode("777");
		g.addNode("000");

		for (let i = 0; i < existingEdges.length; i++) {
			g.addEdge(existingEdges[i].from, existingEdges[i].to);
		}

		// g:
		// ("11")----------------->("22")
		//  /|\  \                   | 
		//   |    \                  V
		//   |     --------------->("33")     ("000")
		//   |                       | 
		//   |                       V
		// ("99")<---------------->("44") 
		//  /|\                      |
		//   |                       V
		// ("88")<-("77")<-("66")<-("55")---->("777")
	}

	before(resetGraph);

	describe('#containsEdge', function() {
		it('should return true for existing edges', function() {
			for (let i = 0; i < existingEdges.length; i++) {
				const edge = existingEdges[i];

				assert.equal(g.containsEdge(edge.from, edge.to), true);
			}
		});

		it('should return false for non-existing edges', function() {
			assert.equal(g.containsEdge("11", "44"), false);
			
			assert.equal(g.containsEdge("77", "99"), false);

			assert.equal(g.containsEdge("99", "33"), false);
		});

		it('should return false for non-existing edges that are reverse of existing ones', function() {
			assert.equal(g.containsEdge("11", "99"), false);

			assert.equal(g.containsEdge("99", "88"), false);

			assert.equal(g.containsEdge("44", "33"), false);

			assert.equal(g.containsEdge("77", "66"), false);

			assert.equal(g.containsEdge("33", "11"), false);
		});
	});

	describe('#outgoingNodes', function() {
		it('should return empty array if there are no outgoing nodes', function() {
			const nodesWithNoOutgoingNodes = ["000", "777"];

			for (let i = 0; i < nodesWithNoOutgoingNodes.length; i++) {
				assert.deepEqual(g.outgoingNodes(nodesWithNoOutgoingNodes[i]), []);
			}
		});

		it('should return correct outgoing nodes', function() {
			const correctOutgoingNodes = [
			{
				from: "22",
				nodes: ["33"]
			},
			{
				from: "11",
				nodes: ["22", "33"]
			},
			{
				from: "99",
				nodes: ["11", "44"]
			},
			{
				from: "44",
				nodes: ["55", "99"]
			}
			];

			for (let i = 0; i < correctOutgoingNodes.length; i++) {
				assert.deepEqual(g.outgoingNodes(correctOutgoingNodes[i].from), correctOutgoingNodes[i].nodes);
			}
		});
	});

	describe('#*BFS', function() {
		it('should return a correct sequence', function() {
			const correctSequenceFrom = {
				"11": ["11", "22", "33", "44", "55", "99", "66", "777", "77", "88"],
				"22": ["22", "33", "44", "55", "99", "66", "777", "11", "77", "88"],
				"55": ["55", "66", "777", "77", "88", "99", "11", "44", "22", "33"],
				"99": ["99", "11", "44", "22", "33", "55", "66", "777", "77", "88"],
				"000": ["000"],
				"777": ["777"]
			};

			for (from in correctSequenceFrom) {
				const sequence = correctSequenceFrom[from];
				let i = 0;

				for (node of g.BFS(from)) {
					assert.equal(node.value, sequence[i++]);
				}

				assert.equal(i, sequence.length, "*BFS() did not list all the nodes");
			}

		});
	});

	describe('#areConnected', function() {
		before(resetGraph);

		it('should return false if the nodes are not connected', function() {
			assert.equal(g.areConnected("33", "000"), false);
		});

		it('should return true if there is a direct path node1->node2', function() {
			assert.equal(g.areConnected("11", "777"), true);

			assert.equal(g.areConnected("99", "44"), true);

			assert.equal(g.areConnected("55", "88"), true);
		});

		it('should return true even if path node1->node2 does not exist, but node2->node1 does', function() {
			assert.equal(g.areConnected("777", "11"), true);
		});
	});

	describe('#incomingNodes', function() {
		it('should return empty array if there are no incoming nodes', function() {
			assert.deepEqual(g.incomingNodes("000"), []);
		});

		it('should return correct incoming nodes', function() {
			const correctIncomingNodes = [
			{
				to: "11",
				nodes: ["99"]
			},
			{
				to: "33",
				nodes: ["11", "22"]
			},
			{
				to: "99",
				nodes: ["44", "88"]
			},
			{
				to: "777",
				nodes: ["55"]
			},
			{
				to: "22",
				nodes: ["11"] 
			},
			{
				to: "44",
				nodes: ["33", "99"]
			},
			];

			for (let i = 0; i < correctIncomingNodes.length; i++) {
				assert.deepEqual(g.incomingNodes(correctIncomingNodes[i].to), correctIncomingNodes[i].nodes);
			}
		});
	});

	describe('#removeEdge', function() {
		beforeEach(resetGraph);

		it('should not remove the reverse of the passed edge', function() {
			g.removeEdge("22", "11");
			assert.equal(g.containsEdge("11", "22"), true);

			g.removeEdge("777", "55");
			assert.equal(g.containsEdge("55", "777"), true);

			g.removeEdge("99", "44");
			assert.equal(g.containsEdge("44", "99"), true);
		});

		it('should remove the edge', function() {
			g.removeEdge("11", "22");
			assert.equal(g.containsEdge("11", "22"), false);

			g.removeEdge("88", "99");
			assert.equal(g.containsEdge("88", "99"), false);

			g.removeEdge("11", "33");
			assert.equal(g.containsEdge("11", "33"), false);
		});
	});

	describe('#removeNode', function() {
		before(resetGraph);

		it('should remove both incoming and outcoming edges', function() {
			g.removeNode("11");

			assert.equal(g.containsEdge("11", "22"), false, 'Edge from deleted node still exists');
			assert.equal(g.containsEdge("99", "11"), false, 'Edge to deleted node still exists');

			g.removeNode("99");
			assert.equal(g.containsEdge("99", "11"), false);
			assert.equal(g.containsEdge("88", "99"), false);
			assert.equal(g.containsEdge("44", "99"), false);
			assert.equal(g.containsEdge("99", "44"), false);
		});
	});

	describe('#shortestPath', function() {
		before(resetGraph);

		it('should return object with empty array and undefined length if there is no possible path', function() {
			const emptyPaths = [
				{
					from: "777",
					to: "11"
				},
				{
					from: "777",
					to: "55"
				},
				{
					from: "777",
					to: "000"
				},
				{
					from: "000",
					to: "11"
				},
				{
					from: "11",
					to: "000",
				},
				{
					from: "55",
					to: "000"
				}
			];

			for (let i = 0; i < emptyPaths; i++) {
				const from = emptyPaths[i].from;
				const to = emptyPaths[i].to;

				const path = g.shortestPath(from, to);

				assert.deepEqual(path.nodes, []);
				assert.equal(path.length, undefined);
			}
		});

		it('should return correct shortest path if it exists', function() {
			const correctPaths = [
				{
					from: "66",
					to: "777",
					nodes: ["66", "77", "88", "99", "44", "55", "777"],
					length: 6
				},
				{
					from: "11",
					to: "22",
					nodes: ["11", "22"],
					length: 1
				},
				{
					from: "11",
					to: "99",
					nodes: ["11", "33", "44", "99"],
					length: 3
				},
				{
					from: "55",
					to: "44",
					nodes: ["55", "66", "77", "88", "99", "44"],
					length: 5
				},
				{
					from: "44",
					to: "55",
					nodes: ["44", "55"],
					length: 1
				},
				{
					from: "99",
					to: "777",
					nodes: ["99", "44", "55", "777"],
					length: 3
				},
				{
					from: "99",
					to: "44",
					nodes: ["99", "44"],
					length: 1
				},
				{
					from: "44",
					to: "99",
					nodes: ["44", "99"],
					length: 1
				},
				{
					from: "55",
					to: "33",
					nodes: ["55", "66", "77", "88", "99", "11", "33"],
					length: 6
				}
			];

			for (let i = 0; i < correctPaths.length; i++) {
				const from = correctPaths[i].from;
				const to = correctPaths[i].to;
				const nodes = correctPaths[i].nodes;
				const length = correctPaths[i].length;

				const path = g.shortestPath(from, to);

				assert.deepEqual(path.nodes, nodes, `Path ${from}->${to}`);
				assert.equal(path.length, length);
			}
		});
	});	
});
