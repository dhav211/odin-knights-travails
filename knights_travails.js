class MoveNode {
  constructor(space, predecessor) {
    this.space = space;
    this.predecessor = predecessor;
  }
}

const adjacencyList = {};

for (let x = 0; x < 8; x++) {
  for (let y = 0; y < 8; y++) {
    adjacencyList[[x, y]] = [];

    if (x - 1 >= 0 && y - 2 >= 0) adjacencyList[[x, y]].push([x - 1, y - 2]);
    if (x - 2 >= 0 && y - 1 >= 0) adjacencyList[[x, y]].push([x - 2, y - 1]);
    if (x + 1 < 8 && y - 2 >= 0) adjacencyList[[x, y]].push([x + 1, y - 2]);
    if (x + 2 < 8 && y - 1 >= 0) adjacencyList[[x, y]].push([x + 2, y - 1]);
    if (x - 1 >= 0 && y + 2 < 8) adjacencyList[[x, y]].push([x - 1, y + 2]);
    if (x - 2 >= 0 && y + 1 < 8) adjacencyList[[x, y]].push([x - 2, y + 1]);
    if (x + 1 < 8 && y + 2 < 8) adjacencyList[[x, y]].push([x + 1, y + 2]);
    if (x + 2 < 8 && y + 1 < 8) adjacencyList[[x, y]].push([x + 2, y + 1]);
  }
}

function knightMoves(start, end) {
  if (start[0] < 0 || start[1] > 7 || end[0] < 0 || end[1] > 7) return;

  const moveQueue = [new MoveNode(start, null, [])];
  let completedNode;
  let isEndFound = false;

  while (!isEndFound) {
    const currentMoveNode = moveQueue.shift();

    if (currentMoveNode.space[0] === end[0] && currentMoveNode.space[1] === end[1]) {
      completedNode = currentMoveNode;
      isEndFound = true;
    } else {
      adjacencyList[currentMoveNode.space].forEach((moveToSpace) => {
        moveQueue.push(new MoveNode(moveToSpace, currentMoveNode));
      });
    }
  }

  const path = [];
  let currentNode = completedNode;

  while (currentNode !== null) {
    path.push(currentNode.space);
    currentNode = currentNode.predecessor;
  }

  console.log(`=> You made it in ${path.length - 1} moves!  Here's your path:`);
  path.forEach((space) => console.log(`[${space[0]},${space[1]}]`));
}

knightMoves([0, 0], [5, 2]);
