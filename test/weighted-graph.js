const Graph = require('../src/graph.js');
const assert = require('assert');

describe('Weighted Graph', function() {
	let g;

	function resetGraph() {
		g = new Graph({
			weighted: true
		});

		g.addNode("1");
		g.addNode("2");
		
		g.addNode("999");
	}

	before(resetGraph);

	describe('#addEdge', function() {
		it('should throw TypeError exception if passed something other than a number as a weight', function() {
			const notNumbers = [undefined, null, "", "0", "str", [], {}, function(){return 5;}, NaN];

			for (let i = 0; i < notNumbers.length; i++) {
				assert.throws(() => g.addEdge("1", "999", notNumbers[i]), TypeError);
			}
		});

		it('should not throw TypeError exception if passed a number as a weight', function() {
			const numbers = [0, 5, 0.5, -1, Infinity, -Infinity];

			for (let i = 0; i < numbers.length; i++) {
				assert.doesNotThrow(() => g.addEdge("1", "999", numbers[i]), TypeError);
			}
		});
	});
});
