import "./styles.css";

/**
 *
 */
class Queue {
	constructor(value) {
		this.items = [];
		this.items.push(value);
	}

	enqueue(value) {
		this.items.push(value);
	}

	dequeue() {
		if (!this.items.length) {
			return null;
		}
		return this.items.shift();
	}

	isEmpty() {
		if (this.items.length) {
			return false;
		}
		return true;
	}
}

const possibleMoves = [
	[2, 1],
	[2, -1],
	[-2, 1],
	[-2, -1],
	[1, 2],
	[-1, 2],
	[1, -2],
	[-1, -2],
];

/**
 *
 * @param visited
 * @param endValue
 */
function retracePath(visited, endValue) {
	const path = [endValue];
	let current = endValue;
	while (current !== null) {
		const parent = visited.get(current);
		path.push(parent);
		current = parent;
	}
	console.log(`=> You mad it in ${path.length - 2} moves! Here's your path:`);
	for (let i = path.length - 2; i >= 0; i--) {
		console.log(`[${path[i]}]`);
	}
}

/**
 *
 * @param start
 * @param end
 */
function knightMoves(start, end) {
	if (!start || !end) {
		return null;
	}
	const movesQueue = new Queue(start);
	const visited = new Map();
	visited.set(start.toString(), null);

	const validVisits = new Set();
	validVisits.add(start.toString());

	while (!movesQueue.isEmpty()) {
		const current = movesQueue.dequeue();
		const value = current.toString();

		if (current[0] === end[0] && current[1] === end[1]) {
			retracePath(visited, value);
			return;
		}

		possibleMoves.forEach((move) => {
			const nextMove = [current[0] + move[0], current[1] + move[1]];
			const key = nextMove.toString();

			if (
				nextMove[0] >= 0 &&
				nextMove[0] <= 7 &&
				nextMove[1] >= 0 &&
				nextMove[1] <= 7 &&
				!validVisits.has(key)
			) {
				validVisits.add(key);
				movesQueue.enqueue(nextMove);
				visited.set(key, value);
			}
		});
	}
}

knightMoves([3, 3], [4, 3]);
