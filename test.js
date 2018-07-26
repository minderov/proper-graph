const Graph = require('./proper-graph.js');
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
	
	describe('#shortestPath', function() {
		it('should return empty array if there is no possible path', function() {
			assert.equal(g.shortestPath("1", "999").length, 0);
			assert.equal(g.shortestPath("1000", "999").length, 0);
			assert.equal(g.shortestPath("1", "3").length, 0);
		});

		it('should return correct shortest path if it exists', function() {
			assert.equal(g.shortestPath("1", "2").length, 2);
			assert.equal(g.shortestPath("3", "5").length, 2);
			assert.equal(g.shortestPath("3", "7").length, 4);
		});
	});
	
});
