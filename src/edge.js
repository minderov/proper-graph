class Edge {
	constructor(from, to) {
		this.from = from;
		this.to = to;
	}

	get hash() {
		return this.from + this.to;
	}
}

module.exports = Edge;
