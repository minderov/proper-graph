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

module.exports = Edges;
