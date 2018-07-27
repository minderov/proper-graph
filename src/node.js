class Node {
	constructor(value) {
		this.val = value;
		this.edgesTo = [];
	}

	get value() {
		return this.val;
	}

	addEdgeTo(to) {
		this.edgesTo.push(to);
	}

	adjacentNodes() {
		return this.edgesTo.map(n => n.deepCopy());
	}

	deepCopy() {
		const newNode = new Node(this.val);

		for (let i = 0; i < this.edgesTo.length; i++) {
			newNode.addEdgeTo(this.edgesTo[i]);
		}

		return newNode;
	}
}

module.exports = Node;
