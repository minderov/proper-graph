const Node = require('../src/node.js');
const assert = require('assert');

describe('Node', function() {
	let n1, n2, n3, n4;

	beforeEach(function() {
		n1 = new Node("n1");
		n2 = new Node("n2");
		n3 = new Node("n3");
		n4 = new Node("n4");
		
	});

	describe('#value', function() {
		it('should return correct node value', function() {
			assert.equal(n1.value, "n1");
		
			assert.equal(n2.value, "n2");
		
			assert.equal(n3.value, "n3");
		
			assert.equal(n4.value, "n4");
		});
	});

	describe('#adjacentNodes', function() {
		beforeEach(function() {
			n1.addEdgeTo(n2);
			n2.addEdgeTo(n1);

			n2.addEdgeTo(n3);
			n3.addEdgeTo(n2);
		});

		it('should return correct nodes', function() {
			const correctAdjacentNodes = [
				{
					from: n1,
					nodes: [n2]
				},
				{
					from: n2,
					nodes: [n1, n3]
				},
				{
					from: n3,
					nodes: [n2]
				}
			];

			for (let i = 0; i < correctAdjacentNodes.length; i++) {
				const from = correctAdjacentNodes[i].from;
				const nodes = correctAdjacentNodes[i].nodes;

				assert.deepEqual(from.adjacentNodes(), nodes);
			}
		});
	});
	
	describe('#deepCopy', function() {
		const INITIAL_NODE_VALUE = "node_val";
		const NEW_NODE_VALUE = "new_node_val";
		const EXTRA_NODE_FIELD = "extraField";

		const node = new Node(INITIAL_NODE_VALUE);

		// copy and modify
		const newNode = node.deepCopy();
		newNode[EXTRA_NODE_FIELD] = EXTRA_NODE_FIELD;
		newNode.val = NEW_NODE_VALUE;

		it('original node should not be modified when we modified its deepCopy', function() {
			assert.equal(node.value, INITIAL_NODE_VALUE);
			assert.equal(node[EXTRA_NODE_FIELD], undefined);
		});

		it('deepCopy should be modifiable', function() {
			assert.equal(newNode.value, NEW_NODE_VALUE);
			assert.equal(newNode[EXTRA_NODE_FIELD], EXTRA_NODE_FIELD);
		});
	});
});
