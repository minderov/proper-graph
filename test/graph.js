const Graph = require('../src/graph.js');
const assert = require('assert');

describe('Graph', function() {
	let g;

	function resetGraph() {
		g = new Graph();
		
		g.addNode("1");
		g.addNode("2");
		g.addEdge("1", "2");

		g.addNode("3");
		g.addNode("4");
		g.addNode("5");
		g.addNode("6");
		g.addNode("7");
		g.addNode("8");
		g.addEdge("3", "4");
		g.addEdge("4", "5");
		g.addEdge("3", "5");
		g.addEdge("5", "6");
		g.addEdge("6", "7");
		g.addEdge("7", "8");

		g.addNode("999");
		g.addNode("1000");

	}

	before(function() {
		resetGraph();
	});

	describe('#getNodeByValue', function() {
		describe('#adjacentNodes', function() {
			it('should return correct number of nodes', function() {
				assert.equal(g.getNodeByValue("1").adjacentNodes().length, 1);
			
				assert.equal(g.getNodeByValue("2").adjacentNodes().length, 1);

				assert.equal(g.getNodeByValue("999").adjacentNodes().length, 0);

				assert.equal(g.getNodeByValue("4").adjacentNodes().length, 2);

				assert.equal(g.getNodeByValue("5").adjacentNodes().length, 3);

				assert.equal(g.getNodeByValue("8").adjacentNodes().length, 1);
			});
		});
	});

	describe('#contains', function() {
		it('should return true if the node exists', function() {
			const existingNodes = ["1", "2", "3", "4", "5", "6", "7", "8", "999", "1000"];

			for (let i = 0; i < existingNodes.length; i++) {
				assert.equal(g.contains(existingNodes[i]), true);
			}
		});

		it('should return false if the node exists', function() {
			const notExistingNodes = ["0", "33", "50", 1, 5, 999, ""];

			for (let i = 0; i < notExistingNodes.length; i++) {
				assert.equal(g.contains(notExistingNodes[i]), false);
			}
		});
	});
	
	describe('#shortestPath', function() {
		it('should return object with empty array and undefined length if there is no possible path', function() {
			const emptyPaths = [
				{
					from: "1",
					to: "999"
				},
				{
					from: "1000",
					to: "999",
				},
				{
					from: "1",
					to: "3"
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
					from: "1",
					to: "2",
					nodes: ["1", "2"],
					length: 1
				},
				{
					from: "3",
					to: "5",
					nodes: ["3", "5"],
					length: 1
				},
				{
					from: "3",
					to: "7",
					nodes: ["3", "5", "6", "7"],
					length: 3
				},

			];

			for (let i = 0; i < correctPaths.length; i++) {
				const from = correctPaths[i].from;
				const to = correctPaths[i].to;
				const nodes = correctPaths[i].nodes;
				const length = correctPaths[i].length;

				const path = g.shortestPath(from, to);

				assert.deepEqual(path.nodes, nodes);
				assert.equal(path.length, length);
			}
		});
	});

	describe('#*BFS', function() {
		it('should return a correct sequence', function() {
			const correctSequenceFrom = {
				"1": ["1", "2"],
				"2": ["2", "1"],
				"3": ["3", "4", "5", "6", "7", "8"],
				"4": ["4", "3", "5", "6", "7", "8"],
				"5": ["5", "4", "3", "6", "7", "8"],
				"6": ["6", "5", "7", "4", "3", "8"]
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

	describe('#containsEdge', function() {
		it('should return true if the edge exists', function() {
                        assert.equal(g.containsEdge("1", "2"), true);

                        assert.equal(g.containsEdge("3", "4"), true);

                        assert.equal(g.containsEdge("3", "5"), true);

                        assert.equal(g.containsEdge("4", "5"), true);

                        assert.equal(g.containsEdge("6", "7"), true);

                        assert.equal(g.containsEdge("7", "8"), true);
                });

                it('should return true if the reverse edge exists', function() {
                        assert.equal(g.containsEdge("2", "1"), true);

                        assert.equal(g.containsEdge("4", "3"), true);

                        assert.equal(g.containsEdge("5", "3"), true);

                        assert.equal(g.containsEdge("5", "4"), true);

                        assert.equal(g.containsEdge("7", "6"), true);

                        assert.equal(g.containsEdge("8", "7"), true);
                });

                it('should return false if the edge does not exist', function() {
                        assert.equal(g.containsEdge("1", "3"), false);
                        assert.equal(g.containsEdge("3", "1"), false);

                        assert.equal(g.containsEdge("3", "6"), false);
                        assert.equal(g.containsEdge("6", "3"), false);

                        assert.equal(g.containsEdge("5", "8"), false);
                        assert.equal(g.containsEdge("8", "5"), false);

                        assert.equal(g.containsEdge("5", "999"), false);
                        assert.equal(g.containsEdge("999", "5"), false);

                        assert.equal(g.containsEdge("1000", "999"), false);
                        assert.equal(g.containsEdge("999", "1000"), false);
                });
	});

	describe('#areConnected', function() {
		it('should return false when nodes are not connected', function() {
			const notConnectedPairs = [
				["1", "3"],
				["1", "8"],
				["2", "8"],
				["999", "8"],
				["999", "1000"],
				["2", "5"],
				["5", "2"],
				["7", "1"]
			];

			for (let i = 0; i < notConnectedPairs.length; i++) {
				const pair = notConnectedPairs[i];

				assert.equal(g.areConnected(pair[0], pair[1]), false);
			}
		});

		it('should return true when nodes are connected', function() {
			const connectedPairs = [
				["1", "2"],
				["5", "8"],
				["3", "8"],
				["5", "7"],
				["2", "1"],
				["5", "3"],
				["3", "5"]
			];

			for (let i = 0; i < connectedPairs.length; i++) {
				const pair = connectedPairs[i];

				assert.equal(g.areConnected(pair[0], pair[1]), true);
			}
		});
	});

	describe('#removeNode', function() {
		const existingNodesToRemove = ["1", "3", "5", "8", "999"];

		before(function() {
			resetGraph();
		});

		it('should return false if the node did not exist', function() {
			const nonExistentNodes = ["0", "nonExistent", 1, 999];

			for (let i = 0; i < nonExistentNodes.length; i++) {
				assert.equal(g.removeNode(nonExistentNodes[i]), false);
			}
		});

		it('should return true if the node did exist', function() {
			for (let i = 0; i < existingNodesToRemove.length; i++) {
				assert.equal(g.removeNode(existingNodesToRemove[i]), true);
			}
		});

		it('graph should not contain deleted nodes', function() {
			for (let i = 0; i < existingNodesToRemove.length; i++) {
				assert.equal(g.contains(existingNodesToRemove[i]), false);
			}
		});

		it('should return false for freshly deleted nodes', function() {
			for (let i = 0; i < existingNodesToRemove.length; i++) {
				assert.equal(g.removeNode(existingNodesToRemove[i]), false);
			}
		});

		it('graph should still contain other nodes', function() {
			const leftoverNodes = ["2", "4", "6", "7", "1000"];

			for (let i = 0; i < leftoverNodes.length; i++) {
				assert.equal(g.contains(leftoverNodes[i]), true);
			}
		});

		it('graph should not contains edges with deleted nodes', function() {
			assert.equal(g.containsEdge("1", "2"), false);
			assert.equal(g.containsEdge("3", "5"), false);
			assert.equal(g.containsEdge("4", "5"), false);
			assert.equal(g.containsEdge("7", "8"), false);
		});

		it('graph should still contain other edges', function() {
			assert.equal(g.containsEdge("6", "7"), true);
		});

		it('even after we insert the nodes back, graph should not contain edges with deleted nodes', function() {
			assert.equal(g.containsEdge("1", "2"), false);
			assert.equal(g.containsEdge("3", "5"), false);
			assert.equal(g.containsEdge("4", "5"), false);
			assert.equal(g.containsEdge("7", "8"), false);
		});
	});

	describe('#removeEdge', function() {
		const existingEdgesToRemove = [
			{
				from: "1",
				to: "2",
			},
			{
				from: "3",
				to: "4",
			},
			{
				from: "8",
				to: "7",
			},
			{
				from: "3",
				to: "5",
			},
			{
				from: "5",
				to: "6",
			},
		];

		before(function() {
			resetGraph();
		});

		it('should return false if the edge did not exist', function() {
                        assert.equal(g.removeEdge("1", "3"), false);

                        assert.equal(g.removeEdge("3", "1"), false);

                        assert.equal(g.removeEdge("3", "6"), false);

                        assert.equal(g.removeEdge("5", "8"), false);

                        assert.equal(g.removeEdge("999", "1000"), false);

                        assert.equal(g.removeEdge("1", "nonExistent"), false);

                        assert.equal(g.removeEdge("nonExistent1", "nonExistent2"), false);

                        assert.equal(g.removeEdge("1", "1"), false);
                });

                it('should return true if the edge did exist', function() {
			for (let i = 0; i < existingEdgesToRemove.length; i++) {
				const edge = existingEdgesToRemove[i];

				assert.equal(g.removeEdge(edge.from, edge.to), true);
			}
                });

                it('edge should not exist after its removal', function() {
			for (let i = 0; i < existingEdgesToRemove.length; i++) {
				const edge = existingEdgesToRemove[i];

				assert.equal(g.containsEdge(edge.from, edge.to), false);
			}
                });

                it('should return false for freshly removed edges', function() {
			for (let i = 0; i < existingEdgesToRemove.length; i++) {
				const edge = existingEdgesToRemove[i];

				assert.equal(g.removeEdge(edge.from, edge.to), false);
			}
                });
	});
});
