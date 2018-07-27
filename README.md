# Proper Graph
> A library that aims to make graphs easy to use

## Install
```bash
npm install --save proper-graph
```

## Usage
```javascript
const Graph = require('proper-graph');

const g = new Graph();

// add nodes
g.addNode("3"); // node can be a string or a number
g.addNode("4");
g.addNode("5");

// add edges 3-4 and 4-5
g.addEdge("3", "4");
g.addEdge("4", "5");

g.shortestPath("3", "5"); // returns an array of size 3 with nodes "3", "4", "5"
```

## Methods
### `.addNode(tag)`
Adds the node `tag` to the graph. `tag` is a string or a number that will uniquely identify the node.

Example:
```javascript
const g = new Graph();

g.addNode(1);
g.addNode("Alice");
// the graph now looks like (1) ("Alice") where the nodes are not connected
```


### `.addEdge(tag1, tag2)`
Adds an edge between the two tags

Example:
```javascript
const g = new Graph();

g.addNode("1");
g.addNode("2");
g.addNode("3");

g.addEdge("1", "2");
```


### `.areConnected(tag1, tag2)`
Returns `true` if there is a path between the nodes, and false otherwise.

Example:
```javascript
const g = new Graph();

g.addNode("1");
g.addNode("2");
g.addNode("3");

g.addEdge("1", "2");
// nodes "1" and "2" are now connected, 
// so the graph looks like ("1")-("2") ("3") where node "3" is not connected to the rest

g.areConnected("1", "2"); // returns true
g.areConnected("2", "3"); // returns false
```


### `.contains(tag)`
Returns `true` if there is a node with tag `tag`, and false otherwise.

Example:
```javascript
const g = new Graph();

g.addNode("Alice");

g.contains("Alice"); // returns true
g.contains("Bob");  // returns false
```


### `.shortestPath(tag1, tag2)`
Returns an array that contains the nodes that comprise the shortest path between the two nodes.

Example:
```javascript
const g = new Graph();

g.addNode("1");
g.addNode("2");
g.addNode("3");
g.addNode("4");
g.addNode("5");

g.addEdge("1", "2");
g.addEdge("2", "3");
g.addEdge("3", "4");
g.addEdge("4", "5");
g.addEdge("1", "5");

// The graph looks like:
// ("1")-("2")
//   |      \
//   |     ("3")
//   |      /
// ("5")-("4")
//    
   
g.shortestPath("1", "5"); // returns ["1", "5"]
g.shortestPath("1", "4"); // returns ["1", "5", "4"]
g.shortestPath("1", "3"); // returns ["1", "2", "3"]
```

### `.BFS(fromTag)`
A generator that iterates over every node that is connected to node with tag `fromTag`

Example:
```javascript
const g = new Graph();

g.addNode("1");
g.addNode("2");
g.addNode("3");
g.addNode("4");
g.addNode("5");
g.addNode("77");

g.addEdge("1", "2");
g.addEdge("2", "3");
g.addEdge("3", "4");
g.addEdge("4", "5");
g.addEdge("1", "5");

// The graph looks like:
// ("1")-("2")
//   |      \
//   |     ("3")
//   |      /
// ("5")-("4")      ("77")
   
for (const node of g.BFS("1")) {
  console.log(`Node: ${node}`);
}

// Output:
// Node: 1
// Node: 2
// Node: 5
// Node: 3
// Node: 4

// Note that the node "77" is not part of the output, 
// because it is not connected to the node "1", (see the graph above)
```