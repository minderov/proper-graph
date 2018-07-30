# Proper Graph <a href="http://travis-ci.org/minderov/proper-graph"><img src="https://travis-ci.org/minderov/proper-graph.svg?branch=master" alt="Build Status"></a>
> A fast and lightweight library that aims to make graphs easy to use. It is built to be powerful on the inside and simple on the outside. 
> 
> You don't need to know any graph theory to use this library, as long as you can draw circles and arrows on a piece of paper you are good to go!
>
> Supports undirected and directed graphs.

## Install
```bash
npm install --save proper-graph
```

## Usage
```javascript
const Graph = require('proper-graph');

const g = new Graph(); // or 'new Graph({directed: true})' for a directed graph

// add nodes
g.addNode("3"); // node can be a string or a number
g.addNode("4");
g.addNode("5");
// g: ("3") ("4") ("5")

// add edges 3-4 and 4-5
g.addEdge("3", "4");
g.addEdge("4", "5");
// g: ("3")-("4")-("5")

g.shortestPath("3", "5"); // returns { nodes: ["3", "4", "5"], length: 2 }
```


## Methods
### `.addNode(node)`
Adds `node` to the graph. `node` is a string or a number that will uniquely identify the node.

Example:
```javascript
const g = new Graph();

g.addNode(1);
g.addNode("Alice");
// g: (1) ("Alice")
// note that the nodes are not connected
```


### `.addEdge(node1, node2)`
Adds an edge between the two nodes.

Example:
```javascript
const g = new Graph();

g.addNode("1");
g.addNode("2");
g.addNode("3");

g.addEdge("1", "2");
// nodes "1" and "2" are now connected
// g: ("1")-("2") ("3") 
// note that the node "3" is not connected to the rest
```

<details>
   <summary> Click to see a description for directed graph:</summary>


For directed graphs it adds an edge from `node1` to `node2`.

Example:

```javascript
const g = new Graph({
   directed: true
});

g.addNode("1");
g.addNode("2");
g.addNode("3");

// adds an edge from "1" to "2"
g.addEdge("1", "2");
// g: ("1")->("2") ("3")

// adds an edge from "2" to "1"
g.addEdge("2", "1");
// g: ("1")<->("2") ("3")

```
</details>


### `.areConnected(node1, node2)`
Returns `true` if there is a path between the nodes, and `false` otherwise.

Example:
```javascript
const g = new Graph();

g.addNode("1");
g.addNode("2");
g.addNode("3");
g.addNode("4");

g.addEdge("1", "2");
g.addEdge("2", "3");
// nodes "1", "2" and "3" are now connected, 
// g: ("1")-("2")-("3") ("4") 
// note that the node "4" is not connected to the rest

g.areConnected("1", "3"); // returns true
g.areConnected("3", "4"); // returns false
```

<details>
   <summary> Click to see a description for directed graph:</summary>


Returns `true` if there is a path either from `node1` to `node2`, or from `node2` to `node1`.

Example:

```javascript
const g = new Graph({
   directed: true
});

g.addNode("1");
g.addNode("2");
g.addNode("3");
g.addNode("4");

g.addEdge("1", "2");
g.addEdge("2", "3");
// nodes "1", "2" and "3" are now connected, 
// g: ("1")->("2")->("3") ("4") 
// note that the node "4" is not connected to the rest

g.areConnected("3", "4"); // returns false

g.areConnected("1", "3"); // returns true
g.areConnected("3", "1"); // returns true because there is a path from "1" to "3", even though there is no path from "3" to "1"

```
</details>


### `.contains(node)`
Returns `true` if the node `node` exists in the graph, and `false` otherwise.

Example:
```javascript
const g = new Graph();

g.addNode("Alice");
// g: ("Alice")

g.contains("Alice"); // returns true
g.contains("Bob");  // returns false
```


### `.removeNode(node)`
Removes the node. Returns `false` if the node does not exist, and `true` otherwise.
Also removes all the edges incident to the node.

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

// g:
// ("1")-("2")
//   |      \
//   |     ("3")
//   |      /
// ("5")-("4")

g.removeNode("1"); // returns true

// g:
//       ("2")
//          \
//         ("3")
//          /
// ("5")-("4")

g.removeNode("1"); // returns false because the node does not exist anymore

g.addNode("1");

// now after we added the node back, the edges previosly incident to the node don't exist anymore
// g:
// ("1") ("2")
//          \
//         ("3")
//          /
// ("5")-("4")
```


### `.shortestPath(node1, node2)`
Returns an object that contains the nodes that comprise the shortest path between the two nodes, and the path's length (number of edges).

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

// g:
// ("1")-("2")
//   |      \
//   |     ("3")
//   |      /
// ("5")-("4")     ("77")

let path;
path = g.shortestPath("1", "5"); 
// path: {
//     nodes: ["1", "5"],
//     length: 1
// }

path = g.shortestPath("1", "4"); 
// path: {
//     nodes: ["1", "5", "4"],
//     length: 2
// }

path = g.shortestPath("1", "3"); 
// path: {
//     nodes: ["1", "2", "3"],
//     length: 2
// }

// note that there is no path between the nodes "1" and "77"
path = g.shortestPath("1", "77");
// path: {
//     nodes: [],
//     length: undefined
// }
```

<details>
   <summary> Click to see a description for directed graph:</summary>

Example:

```javascript
const g = new Graph({
   directed: true
});

g.addNode("1");
g.addNode("2");
g.addNode("3");
g.addNode("4");
g.addNode("5");

g.addEdge("1", "2");
g.addEdge("2", "1");
g.addEdge("2", "3");
g.addEdge("3", "4");
g.addEdge("4", "5");
g.addEdge("1", "5");

// g:
// ("1")<->("2")->("3")
//   |              |
//   |              |
//   V              V
// ("5")<---------("4")

let path;
path = g.shortestPath("1", "4"); 
// path: {
//     nodes: ["1", "2", "3", "4"],
//     length: 3
// }
// note that the path is not "1", "5", "4", since there is no edge from "5" to "4"

path = g.shortestPath("2", "3"); 
// path: {
//     nodes: ["2", "3"],
//     length: 1
// }

path = g.shortestPath("3", "2"); 
// path: {
//     nodes: [],
//     length: undefined
// }
// note that there is no way to reach "2" from "3". It's a directed graph so direction matters, makes sense!
```
</details>


### `.containsEdge(node1, node2)`
Returns `true` if the graph has an edge between the two nodes, and `false` otherwise

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

// g:
// ("1")-("2")
//   |      \
//   |     ("3")
//   |      /
// ("5")-("4")

g.containsEdge("1", "2"); // returns true
g.containsEdge("2", "1"); // returns true
g.containsEdge("5", "4"); // returns true
g.containsEdge("1", "5"); // returns true

g.containsEdge("1", "3"); // returns false
g.containsEdge("3", "1"); // returns false
g.containsEdge("2", "4"); // returns false
```

<details>
   <summary> Click to see a description for directed graph:</summary>


Returns `true` if the graph has an edge from `node1` to `node2`, and `false` otherwise

Example:

```javascript
const g = new Graph({
   directed: true
});

g.addNode("1");
g.addNode("2");
g.addNode("3");
g.addNode("4");
g.addNode("5");

g.addEdge("1", "2");
g.addEdge("2", "1");
g.addEdge("2", "3");
g.addEdge("3", "4");
g.addEdge("4", "5");
g.addEdge("1", "5");

// g:
// ("1")<->("2")->("3")
//   |              |
//   |              |
//   V              V
// ("5")<---------("4")

g.containsEdge("1", "2"); // returns true
g.containsEdge("2", "1"); // returns true

g.containsEdge("2", "3"); // returns true
g.containsEdge("3", "2"); // returns false
```
</details>


### `.removeEdge(node1, node2)`
Removes the edge between the two nodes. Returns `false` if the edge does not exist, and `true` otherwise.

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

// g:
// ("1")-("2")
//   |      \
//   |     ("3")
//   |      /
// ("5")-("4")

g.removeEdge("1", "3"); // returns false because there is no such edge
g.removeEdge("2", "4"); // returns false because there is no such edge

g.removeEdge("1", "2"); // returns true
g.removeEdge("1", "5"); // returns true

// g:
// ("1") ("2")
//          \
//         ("3")
//          /
// ("5")-("4")

g.removeEdge("1", "2"); // returns false because the edge does not exist anymore, hence there is nothing to remove
```

<details>
   <summary> Click to see a description for directed graph:</summary>


Removes the edge from `node1` to `node2`. Returns `false` if the edge does not exist, and `true` otherwise.

Example:

```javascript
const g = new Graph({
   directed: true
});

g.addNode("1");
g.addNode("2");
g.addNode("3");
g.addNode("4");
g.addNode("5");

g.addEdge("1", "2");
g.addEdge("2", "1");
g.addEdge("2", "3");
g.addEdge("3", "4");
g.addEdge("4", "5");
g.addEdge("1", "5");

// g:
// ("1")<->("2")->("3")
//   |              |
//   |              |
//   V              V
// ("5")<---------("4")

g.removeEdge("1", "3"); // returns false because there is no such edge
g.removeEdge("3", "2"); // returns false because there is no such edge even though there is an edge "2"->"3"

g.removeEdge("1", "2"); // returns true
g.removeEdge("1", "5"); // returns true

// g:
// ("1")-->("2")->("3")
//                  |
//                  |
//                  V
// ("5")<---------("4")
```
</details>


### `.BFS(fromNode)`
A generator that iterates over every node that is connected to `node`

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

// g:
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

<details>
   <summary> Click to see a description for directed graph:</summary>


A generator that iterates over every node accessible from `node`

Example:

```javascript
const g = new Graph({
   directed: true
});

g.addNode("1");
g.addNode("2");
g.addNode("3");
g.addNode("4");
g.addNode("5");

g.addEdge("1", "2");
g.addEdge("2", "1");
g.addEdge("2", "3");
g.addEdge("3", "4");
g.addEdge("4", "5");
g.addEdge("1", "5");

// g:
// ("1")<->("2")->("3")
//   |              |
//   |              |
//   V              V
// ("5")<---------("4")

for (const node of g.BFS("1")) {
   console.log(`Node: ${node}`);
}

// Output:
// Node: 1
// Node: 2
// Node: 5
// Node: 3
// Node: 4


for (const node of g.BFS("3")) {
   console.log(`Node: ${node}`);
}

// Output:
// Node: 3
// Node: 4
// Node: 5

// note that "1" and "2" are not part of the output because they are not accessible from the node "3"
```
</details>
