const http = require("http");

let tick = 0;
const LIMIT = 20;
const DELAY = 1000;

function run(res) {
  if (++tick < LIMIT) {
    res.write(`tick: ${tick}\n`);
    setTimeout(() => run(res), DELAY);
  } else {
    res.end(`tick: ${tick}`);
    tick = 0;
  }
}

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");
  run(res);
});

server.listen(8000);
