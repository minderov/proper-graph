class Graph {
	constructor() {
		this.edges = new Edges();
		this.nodes = {};
		this.shortestPaths = {};
	}

	addEdge(fromVal, toVal) {
		// TODO: check if edge already exists
		// TODO: check if nodes exist?
		const from = this.nodes[fromVal];
		const to = this.nodes[toVal];

		this.edges.add(new Edge(from, to));

		from.addEdgeTo(to);
		to.addEdgeTo(from);
	}

	addNode(value) {
		// TODO: check if node already exists

		this.nodes[value] = new Node(value);
	}

	contains(value) {
		return !!this.nodes[value];
	}

	getNodeByValue(value) {
		return this.nodes[value];
	}

	areConnected(fromVal, toVal) {
		return this.shortestPath(fromVal, toVal).length > 0;
	}

	* BFS(fromVal) {
		const from = this.nodes[fromVal];

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

		const from = this.nodes[fromVal];

		const pathTo = {};
		pathTo[from.value] = [from.value];

		for (const node of this.BFS(from.value)) {
			const pathToNode = node.parent ? pathTo[node.parent.value] : [];
			pathTo[node.value] = pathToNode.concat(node.value);

			if (node.value === toVal) {
				return pathTo[node.value];
			}
		}

		return [];
	}
}

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

class Edges {
	constructor() {
		this.edges = {};
	}
	
	add(edge) {
		if (!this.edges[edge.hash]) {
			this.edges[edge.hash] = [];
		}

		this.edges[edge.hash].push(edge);
	}
}

class Edge {
	constructor(from, to) {
		this.from = from;
		this.to = to;
	}

	get hash() {
		return this.from + this.to;
	}
}

module.exports = Graph; 
