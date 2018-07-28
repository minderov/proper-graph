const Edge = require('../src/edge.js');
const Edges = require('../src/edges.js');
const assert = require('assert');

describe('Edges', function() {
	const edges = new Edges();

	beforeEach(function() {
		edges.add("1", "2");
		edges.add("2", "3");
	});

	describe('#contains', function() {
		it('should return true if the edge exists', function() {
			assert.equal(edges.contains("1", "2"), true);

			assert.equal(edges.contains("2", "3"), true);
		});

		it('should return true if the reverse edge exists', function() {
			assert.equal(edges.contains("2", "1"), true);

			assert.equal(edges.contains("3", "2"), true);
		});

		it('should return false if the edge does not exist', function() {
			assert.equal(edges.contains("1", "3"), false);

			assert.equal(edges.contains("3", "1"), false);
		});
	});
});
