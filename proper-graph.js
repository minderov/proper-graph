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

	shortestPath(fromVal, toVal) {
		// TODO: check if the nodes exist
		// TODO: check if the shortest path was already calculated

		const from = this.nodes[fromVal];

		// TODO: implement a proper queue		
		const visitedNodes = {};
		const pathTo = {};
		const parentOf = {};
		pathTo[from.value] = [from];
		visitedNodes[from.value] = true;

		let queue = from.adjacentNodes();

		queue.forEach(function(n) {
			parentOf[n.value] = from.value;
		});

		while (queue.length > 0) {
			const node = queue.shift();

			if (visitedNodes[node.value]) {
				continue;
			}

			visitedNodes[node.value] = true;
			
			const pathToNode = pathTo[parentOf[node.value]];
			pathTo[node.value] = pathToNode.concat(node);

			if (node.value === toVal) {
				return pathTo[node.value];
			}

			let adjacentNodes = node.adjacentNodes();
			adjacentNodes = adjacentNodes.filter(function(n) {
				return !visitedNodes[n.value];
			});

			adjacentNodes.forEach(function(n) {
				parentOf[n.value] = parentOf[n.value] ? parentOf[n.value] : node.value;
			});

			queue = queue.concat(adjacentNodes);
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
