const fs = require("fs");
const path = require("path");

let lockedPromise;

// https://github.com/vercel/next.js/blob/v11.1.2/packages/next/server/image-optimizer.ts#L178

async function dedupe(idx) {
  if (lockedPromise) {
    console.log(`blocked: ${idx}`);
    await lockedPromise;
  }
  let res;
  lockedPromise = new Promise((_res) => {
    res = _res;
  });
  console.log(`execute: ${idx}`);

  const txt = await fs.promises.readFile(
    path.resolve(__dirname, "../hello-world.txt")
  );
  console.log(`txt: ${txt}`);

  setTimeout(() => {
    console.log(`finished: ${idx}`);
    res();
  }, 1000);
}

[...new Array(10)].forEach((_, idx) => dedupe(idx));
