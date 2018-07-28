const Node = require('./node.js');
const Edge = require('./edge.js');
const Edges = require('./edges.js');

class Graph {
	constructor() {
		this.edges = new Edges();
		this.nodes = new Map();
		this.shortestPaths = {};
	}

	addEdge(fromVal, toVal) {
		// TODO: check if edge already exists
		// TODO: check if nodes exist?
		const from = this.nodes.get(fromVal);
		const to = this.nodes.get(toVal);

		this.edges.add(fromVal, toVal);

		from.addEdgeTo(to);
		to.addEdgeTo(from);
	}

	addNode(value) {
		// TODO: check if node already exists

		this.nodes.set(value, new Node(value));
	}

	contains(value) {
		return this.nodes.has(value);
	}

	containsEdge(fromVal, toVal) {
		return this.edges.contains(fromVal, toVal);
	}

	getNodeByValue(value) {
		return this.nodes.get(value);
	}

	areConnected(fromVal, toVal) {
		return this.shortestPath(fromVal, toVal).length > 0;
	}

	* BFS(fromVal) {
		const from = this.nodes.get(fromVal);

		const visitedNodes = {};

		// TODO: implement a proper queue
		let queue = [from];

		while (queue.length > 0) {
			const node = queue.shift();

			if (visitedNodes[node.value]) {
				continue;
			}

			visitedNodes[node.value] = true;

			yield node;

			const adjacentNodes = node.adjacentNodes();
			adjacentNodes.map(n => n.parent = node);
			queue = queue.concat(adjacentNodes);
		}
	}

	shortestPath(fromVal, toVal) {
		// TODO: check if the nodes exist
		// TODO: check if the shortest path was already calculated

		const from = this.nodes.get(fromVal);

		const pathTo = {};
		pathTo[from.value] = [from.value];

		for (const node of this.BFS(from.value)) {
			const pathToNode = node.parent ? pathTo[node.parent.value] : [];
			pathTo[node.value] = pathToNode.concat(node.value);

			if (node.value === toVal) {
				return {
					nodes: pathTo[node.value],
					length: pathTo[node.value].length
				}
			}
		}

		return {
			nodes: [],
			length: undefined
		};
	}
}

module.exports = Graph; 
