const Edge = require('./edge.js');

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

	contains(fromVal, toVal) {
		const possibleHashes = [
		{
			hash: (new Edge(fromVal, toVal)).hash,
			from: fromVal,
			to: toVal
		},
		{
			hash: (new Edge(toVal, fromVal)).hash,
			from: toVal,
			to: fromVal
		}];

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
