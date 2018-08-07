const Edge = require('./edge.js');

class Edges {
	constructor(params) {
		this.directed = params.directed;
		this.weighted = params.weighted;
		this.edges = {};
	}
	
	add(fromVal, toVal, weight) {
		const edge = new Edge(fromVal, toVal, weight);

		if (!this.edges[edge.hash]) {
			this.edges[edge.hash] = [];
		}

		this.edges[edge.hash].push(edge);
	}

	getAll() {
		let allEdges = [];

		for (const hash in this.edges) {
			allEdges = allEdges.concat(this.edges[hash]);
		}

		return allEdges;
	}

	getPossibleHashes(fromVal, toVal) {
		let possibleHashes = [
		{
			hash: (new Edge(fromVal, toVal)).hash,
			from: fromVal,
			to: toVal
		}];

		// if not directed, add the reverse edge
		if (!this.directed) {
			possibleHashes.push({
				hash: (new Edge(toVal, fromVal)).hash,
				from: toVal,
				to: fromVal
			});
		}

		return possibleHashes;
	}

	// removes an edge, return false if the edge didn't exist, and true otherwise
	remove(fromVal, toVal) {
		let found = false;

		const possibleHashes = this.getPossibleHashes(fromVal, toVal);

		for (let i = 0; i < possibleHashes.length; i++) {
			const hash = possibleHashes[i].hash;
			const from = possibleHashes[i].from;
			const to = possibleHashes[i].to;

			if (!this.edges[hash]) {
				continue;
			}

			for (let k = 0; k < this.edges[hash].length; k++) {
				const edge = this.edges[hash][k];

				if (edge.from === from && edge.to === to) {
					found = true;

					// remove the edge
					this.edges[hash].splice(k, 1);
				}
			}
		}

		return found;
	}

	contains(fromVal, toVal) {
		const possibleHashes = this.getPossibleHashes(fromVal, toVal);

		for (let i = 0; i < possibleHashes.length; i++) {
			const hash = possibleHashes[i].hash;
			const from = possibleHashes[i].from;
			const to = possibleHashes[i].to;

			if (!this.edges[hash]) {
				continue;
			}

			for (let k = 0; k < this.edges[hash].length; k++) {
				const edge = this.edges[hash][k];

				if (edge.from === from && edge.to === to) {
					return true;
				}
			}
		}

		return false;
	}
}

module.exports = Edges;
