const fs = require("fs");
const { Readable } = require("stream");

async function logChunks(readable) {
  for await (const chunk of readable) {
    console.log("chunk", chunk);
  }
}

const readable = fs.createReadStream(require.resolve("../Lorem-Ipsum.txt"), {
  encoding: "utf8",
});
logChunks(readable);

async function* generate() {
  yield "hello";
  yield "streams";
}

Readable.from(generate()).on("data", (chunk) => {
  console.log(chunk);
});
