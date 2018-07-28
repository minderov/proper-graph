const Graph = require('../src/graph.js');
const assert = require('assert');

describe('Graph', function() {
	let g;

	beforeEach(function() {
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
		it('should return empty array if there is no possible path', function() {
			const tests = function() {
				assert.equal(g.shortestPath("1", "999").length, 0);
				assert.equal(g.shortestPath("1000", "999").length, 0);
				assert.equal(g.shortestPath("1", "3").length, 0);
			};

			tests();
			tests();
		});

		it('should return correct shortest path if it exists', function() {
			const correctPaths = [
				{
					from: "1",
					to: "2",
					path: ["1", "2"]
				},
				{
					from: "3",
					to: "5",
					path: ["3", "5"]
				},
				{
					from: "3",
					to: "7",
					path: ["3", "5", "6", "7"]
				},

			];

			for (let i = 0; i < correctPaths.length; i++) {
				const from = correctPaths[i].from;
				const to = correctPaths[i].to;
				const path = correctPaths[i].path;

				assert.deepEqual(g.shortestPath(from, to), path);
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
});
