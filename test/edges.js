const Edge = require('../src/edge.js');
const Edges = require('../src/edges.js');
const assert = require('assert');

describe('Edges', function() {
	const edges = new Edges({
		directed: false
	});

	before('Add edges', function() {
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

	describe('#remove', function() {
		it('should return false if the edge did not exist', function() {
			assert.equal(edges.remove("1", "3"), false);

			assert.equal(edges.remove("3", "1"), false);

			assert.equal(edges.remove("1", "nonExistent"), false);

			assert.equal(edges.remove("nonExistent1", "nonExistent2"), false);

			assert.equal(edges.remove("1", "1"), false);
		});

		it('should return true if the edge did exist', function() {
			assert.equal(edges.remove("1", "2"), true);

			assert.equal(edges.remove("3", "2"), true);
		});

		it('edge should not exist after its removal', function() {
			assert.equal(edges.contains("1", "2"), false);

			assert.equal(edges.contains("2", "3"), false);
		});

		it('should return false for freshly removed edges', function() {
			assert.equal(edges.remove("1", "2"), false);

			assert.equal(edges.remove("2", "3"), false);
		});
	});
});
