const Node = require('./node.js');
const Edge = require('./edge.js');
const Edges = require('./edges.js');

class Graph {
	constructor({directed = false, weighted = false} = {}) {
		this.directed = directed;
		this.weighted = weighted;

		this.edges = new Edges({
			directed: this.directed,
			weighted: this.weighted
		});
		this.nodes = new Map();
		this.shortestPaths = {};

	}

	addEdge(fromVal, toVal, weight) {
		if (this.weighted && (typeof weight !== 'number' || isNaN(weight))) {
			throw new TypeError(`Edge weight must be a number, you provided ${weight}, which is of type '${typeof weight}'`);
		}

		// TODO: check if edge already exists
		// TODO: check if nodes exist?
		const from = this.nodes.get(fromVal);
		const to = this.nodes.get(toVal);

		this.edges.add(fromVal, toVal, weight);

		from.addEdgeTo(to);
		to.addEdgeFrom(from);

		if (!this.directed) {
			to.addEdgeTo(from);
			from.addEdgeFrom(to);
		}
	}

	removeEdge(fromVal, toVal) {
		return this.edges.remove(fromVal, toVal);
	}

	removeNode(value) {
		if (!this.contains(value)) {
			return false;
		}

		const node = this.nodes.get(value);

		const adjacentNodes = node.adjacentNodes();

		for (let i = 0; i < adjacentNodes.length; i++) {
			this.removeEdge(adjacentNodes[i].value, node.value);

			if (this.directed) {
				this.removeEdge(node.value, adjacentNodes[i].value);
			}
		}

		this.nodes.delete(value);

		return true;
	}

	addNode(value) {
		// TODO: check if node already exists

		this.nodes.set(value, new Node(value));
	}

	incomingNodes(value) {
		// TODO: check if node exists

		return this.nodes.get(value).incomingNodes().map(n => n.value);
	}

	outgoingNodes(value) {
		// TODO: check if node exists

		return this.nodes.get(value).outgoingNodes().map(n => n.value);
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
		const directedPathExists = this.shortestPath(fromVal, toVal).length !== undefined;

		if (!directedPathExists && this.directed) {
			const reverseDirectedPathExists = this.shortestPath(toVal, fromVal).length !== undefined;

			return reverseDirectedPathExists;
		}

		return directedPathExists;
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

			const outgoingNodes = node.outgoingNodes();
			outgoingNodes.map(n => n.parent = node);
			queue = queue.concat(outgoingNodes);
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
					length: pathTo[node.value].length - 1
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
