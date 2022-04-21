class Iterable {
  constructor(arr) {
    this.arr = arr;
    this.idx = 0;
  }

  *[Symbol.iterator]() {
    while (this.idx !== this.arr.length) {
      yield this.arr[this.idx++];
    }
    this.idx = 0;
  }
}

function spread(iterable) {
  console.log("spread", ...iterable);
}

function forOf(iterable) {
  console.log("forOf");
  for (const item of iterable) {
    console.log(item);
  }
}

const iterable = new Iterable([1, 2, 3, 4, 5]);

spread(iterable);
forOf(iterable);

function* gen() {
  yield "a";
  yield "b";
}

const wrapG = {
  [Symbol.iterator]: gen,
};

spread(wrapG);
forOf(wrapG);

const wrapG1 = {
  [Symbol.iterator]() {
    let i = -1;
    return {
      next: () => {
        i++;
        const done = i === 5;
        return { value: done ? undefined : i, done };
      },
    };
  },
};

spread(wrapG1);
forOf(wrapG1);

const map = new Map([
  ["a", 1],
  ["b", 2],
]);
const [a1, b1] = map;
console.log(a1, b1);

function* genFunc() {
  return 1;
}

const g1 = genFunc();

console.log(g1.next(), g1.next(), g1.next());
