class Node {
	constructor(value) {
		this.val = value;
		this.edgesTo = [];
		this.edgesFrom = [];
	}

	get value() {
		return this.val;
	}

	addEdgeFrom(from) {
		this.edgesFrom.push(from);
	}

	addEdgeTo(to) {
		this.edgesTo.push(to);
	}

	incomingNodes() {
		return this.edgesFrom.map(n => n.deepCopy());
	}

	outgoingNodes() {
		return this.edgesTo.map(n => n.deepCopy());
	}

	adjacentNodes() {
		const adjacentNodesWithDuplicates = this.edgesTo.concat(this.edgesFrom);

		const uniqueAdjacentNodes = Array.from(new Set(adjacentNodesWithDuplicates));

		return uniqueAdjacentNodes.map(n => n.deepCopy());
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
