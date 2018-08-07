const Graph = require('../src/graph.js');
const assert = require('assert');

describe('Weighted Graph', function() {
	const existingEdges = [
	{
		from: "11",
		to: "22",
		weight: 1

	},
	{
		from: "11",
		to: "33",
		weight: 5

	},
	{
		from: "22",
		to: "33",
		weight: 2

	},
	{
		from: "33",
		to: "44",
		weight: -21

	},
	{
		from: "44",
		to: "55",
		weight: 2

	},
	{
		from: "44",
		to: "99",
		weight: 25

	},
	{
		from: "55",
		to: "66",
		weight: 3 

	},
	{
		from: "66",
		to: "77",
		weight: 4

	},
	{
		from: "77",
		to: "88",
		weight: 5

	},
	{
		from: "88",
		to: "99",
		weight: 6

	},
	{
		from: "99",
		to: "11",
		weight: 7

	},
	{
		from: "99",
		to: "44",
		weight: -10

	},
	{
		from: "55",
		to: "777",
		weight: 0

	}];

	let g;

	function resetGraph() {
		g = new Graph({
			weighted: true,
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
			const edge = existingEdges[i];

			g.addEdge(edge.from, edge.to, edge.weight);
		}

		// g:
		// ("11")-----------1----------->("22")
		//  /|\  \                         | 
		//   |    \                        2 
		//   |     \                       | 
		//   |      \                      V
		//   7       -------5----------->("33")     ("000")
		//   |                             | 
		//   |                            -21 
		//   |                             | 
		//   |                             V
		// ("99")<- 25 ------------ -10 ->("44") 
		//  /|\                            |
		//   |                             2
		//   6                             |
		//   |                             V
		// ("88")<-5-("77")<-4-("66")<-3-("55")--0-->("777")
	}

	describe('#addEdge', function() {
		before(resetGraph);

		it('should throw TypeError exception if passed something other than a number as a weight', function() {
			const notNumbers = [undefined, null, "", "0", "str", [], {}, function(){return 5;}, NaN];

			for (let i = 0; i < notNumbers.length; i++) {
				assert.throws(() => g.addEdge("11", "000", notNumbers[i]), TypeError);
			}
		});

		it('should not throw TypeError exception if passed a number as a weight', function() {
			const numbers = [0, 5, 0.5, -1, Infinity, -Infinity];

			for (let i = 0; i < numbers.length; i++) {
				assert.doesNotThrow(() => g.addEdge("11", "000", numbers[i]), TypeError);
			}
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
					from: "11",
					to: "33",
					nodes: ["11", "22", "33"],
					length: 3
				},
				{
					from: "99",
					to: "44",
					nodes: ["99", "11", "22", "33", "44"],
					length: -11
				},
				{
					from: "44",
					to: "99",
					nodes: ["44", "55", "66", "77", "88", "99"],
					length: 20
				},
				{
					from: "99",
					to: "33",
					nodes: ["99", "11", "22", "33"],
					length: 10
				},
				{
					from: "55",
					to: "777",
					nodes: ["55", "777"],
					length: 0
				},
				{
					from: "99",
					to: "777",
					nodes: ["99", "11", "22", "33", "44", "55", "777"],
					length: -9
				},
				{
					from: "99",
					to: "88",
					nodes: ["99", "11", "22", "33", "44", "55", "66", "77", "88"],
					length: 3
				},
				{
					from: "88",
					to: "99",
					nodes: ["88", "99"],
					length: 6
				},
				{
					from: "44",
					to: "22",
					nodes: ["44", "55", "66", "77", "88", "99", "11", "22"],
					length: 28
				},
				{
					from: "33",
					to: "44",
					nodes: ["33", "44"],
					length: -21
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
