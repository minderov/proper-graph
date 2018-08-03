class Edge {
	constructor(from, to, weight) {
		this.from = from;
		this.to = to;
		this.weight = weight;
	}

	get hash() {
		return this.from + this.to;
	}
}

module.exports = Edge;
