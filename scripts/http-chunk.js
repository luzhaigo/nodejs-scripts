const http = require("http");
const { createReadStream, readFileSync } = require("fs");

const server = http.createServer((req, res) => {
  const filePath = require.resolve("./http-chunk.js");
  if (req.url.includes("/stream")) {
    const rs = createReadStream(filePath);
    rs.pipe(res);
  } else if (req.url.includes("/chunk")) {
    let i = 0;
    function send() {
      setTimeout(() => {
        if (i < 3) {
          i++;
          res.write(i + "\n");
          send();
        } else {
          res.end(i + "\n");
        }
      }, 3000);
    }
    send();
  } else {
    const file = readFileSync(filePath);
    res.end(file);
  }
});

server.listen(8000);
